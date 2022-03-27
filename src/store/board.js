import { types as t, flow, getParent, onSnapshot } from "mobx-state-tree";
import ApiCall from "../api/index";
import { User } from "./users";

const Task = t.model("Task", {
  id: t.string,
  title: t.string,
  description: t.string,
  assignee: t.safeReference(User),
});

const BoardSection = t
  .model("BoardSection", {
    id: t.identifier,
    title: t.string,
    tasks: t.array(Task),
  })
  .actions((self) => ({
    load: flow(function* () {
      const { id: boardID } = getParent(self, 2);
      const { id: status } = self;

      const { tasks } = yield ApiCall.get(`boards/${boardID}/tasks/${status}`);
      self.tasks = tasks;

      onSnapshot(self, self.save)
    }),
    save: flow(function* ({tasks}) {
        const { id: boardID } = getParent(self, 2);
        const { id: status } = self;
  
        yield ApiCall.put(`boards/${boardID}/tasks/${status}`, {tasks});

    }),
    afterCreate() {
      self.load();
    },
  }));

const Board = t
  .model("Board", {
    id: t.identifier,
    title: t.string,
    sections: t.array(BoardSection),
  })
  .actions((self) => {
    return {
      moveTask(id, source, destination) {
        const fromSection = self.sections.find((section) => section.id === source.droppableId);
        const toSection = self.sections.find((section) => section.id === destination.droppableId);

        const taskToMoveIndex = fromSection.tasks.findIndex((task) => task.id === id);
        const [task] = fromSection.tasks.splice(taskToMoveIndex, 1);

        toSection.tasks.splice(destination.index, 0, task.toJSON());
      },
      addTask(sectionId, payload){
        const section = self.sections.find((section) => section.id === sectionId);

        section.tasks.push({
            ...payload,
            id: (Math.random() * 10).toFixed(),
        })
      },
    };
  });

const BoardStore = t
  .model("BoardStore", {
    boards: t.optional(t.array(Board), []),
    active: t.safeReference(Board),
  })
  .actions((self) => {
    return {
      selectBoard(id){
        self.active = id;
      },
      load: flow(function* () {
        self.boards = yield ApiCall.get("boards");
        // self.active = "MAIN";
      }),
      afterCreate() {
        self.load();
      },
    };
  })
  .views((self) => ({
    get list() {
      return self.boards.map(({ id, title }) => ({ id, title }));
    },
  }));

export default BoardStore;
