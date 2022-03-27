import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  TextField,
  FormControl,
  FormLabel,
  Select,
  DialogActions,
  Button,
} from "@material-ui/core";
import { observer } from 'mobx-react-lite'; 
import useStore from '../../hooks/useStore';
import { useCallback, useState } from "react";

const NewTaskDialog = ({ open, handleClose = () => {}, activeSection }) => {
  const {users, boards} = useStore();
  const [formState, setFormState] = useState();

  const updateFormState = useCallback(
    (event) => {
      const { value, name } = event.target;

      setFormState((prevState) => ({
        ...prevState,
        [name]: value ? value.trim() : "",
      }));
    },
    [setFormState]
  );

  const addNewTask = useCallback(event => {
    event.preventDefault();

    boards.active.addTask(activeSection, formState);
    handleClose();
  }, [formState, boards, activeSection])

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Creating a new task:</DialogTitle>
      <form onSubmit={addNewTask}>
        <DialogContent style={{ minWidth: 500 }}>
          <Box p={1}>
            <TextField
              fullWidth
              required
              name="title"
              type="text"
              label="Title"
              onChange={updateFormState}
              value={formState?.title || ""}
            />
          </Box>
          <Box p={1}>
            <TextField
              fullWidth
              required
              name="description"
              type="text"
              label="Description"
              onChange={updateFormState}
              value={formState?.description || ""}
            />
          </Box>
          <Box p={1}>
            <FormControl fullWidth>
              <FormLabel shrink="true">Assigne</FormLabel>
              <Select
                native
                name="assigne"
                value={formState?.assigne || ""}
                onChange={updateFormState}
              >
                <option value="" disabled>
                  -
                </option>
                {users?.list?.map(user => {
                  return (
                    <option key={user.id} value={user.id}>
                      {user?.name}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="secondary">Close</Button>
            <Button type="submit" color="primary">Create</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default observer(NewTaskDialog);
