import { observer } from "mobx-react-lite";
import { toJS } from 'mobx';
import useStore from "../../hooks/useStore";
import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "./Column";
import { useCallback, useState } from "react";
import NewTaskDialog from "./NewTaskDialog";

const Dashboard = () => {
  const [newTaskToSection, setNewTaskToSection] = useState(null);
  const { boards } = useStore();
  console.log(toJS(boards));

  const getListStyle = (isDraggingOver) => ({
    backgroundColor: isDraggingOver ? "lightblue" : "lightgray",
    padding: 8,
    minHeight: 500,
  });

  const onDragEnd = useCallback((event) => {
    const { source, destination, droggableId: taskId} = event;

    boards.active.moveTask(taskId, source, destination);
  }, [boards])

  const closeDialog = useCallback(() => {
    setNewTaskToSection(null)
  }, [setNewTaskToSection])

  return (
    <Box p={2}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={3}>
          {boards.active?.sections?.map(section => {
            return (
              <Grid item key={section.id} xs>
                <Paper>
                  <Box
                    p={1}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography component={'span'} variant="h5">{section?.title}</Typography>
                    <Button variant="outlined" color="primary" onClick={() => {
                      setNewTaskToSection(section.id)
                    }}>
                        Add
                    </Button>
                  </Box>
                  <Droppable droppableId={section.id}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={getListStyle(snapshot.isDraggingOver)}
                        >
                          <Column section={section} />
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </DragDropContext>
      <NewTaskDialog 
        open={!!newTaskToSection}
        handleClose={closeDialog}
        activeSection={newTaskToSection}
      />
    </Box>
  );
};

export default observer(Dashboard);
