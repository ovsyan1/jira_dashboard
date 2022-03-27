import { CardContent, Typography } from "@material-ui/core";
import User from "../common/User";

const Task = ({task}) => {
    return(
        <CardContent>
            <Typography color="textPrimary" gutterBottom style={{ fontSize: 18}}>
                {task?.title}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
                {task?.description}
                <User user={task.assigne} />
            </Typography>
        </CardContent>
    )
}

export default Task;