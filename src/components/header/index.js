import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";
import User from "../common/User";
import {
  AppBar,
  Grid,
  Typography,
  Select,
  Box,
  FormControl,
} from "@material-ui/core";

const Header = () => {
  const { boards, users } = useStore();

  return (
    <AppBar position="static">
      <Grid containter={{ justify: "space-between", alignItems: "center" }}>
        <Grid item>
          <Typography variant="h6">Dashboard</Typography>
        </Grid>
        <Grid item>
          <Box display="flex" alignItems="center">
            <FormControl variant="outlined">
              <Select
                style={{
                  backgoundColor: "#ffffff",
                  marginLeft: 10,
                }}
                native
                value={boards?.active?.id || ""}
                onChange={(event) => {
                    const {value} = event.target;

                    boards.selectBoard(value)
                }}
              >
                <option value="" disabled>
                  -
                </option>
                {boards.list.map((b) => {
                  return (
                    <option key={b.id} value={b.id}>
                      {b.title}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <Grid item>
            <User user={users?.me} />
          </Grid>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default observer(Header);
