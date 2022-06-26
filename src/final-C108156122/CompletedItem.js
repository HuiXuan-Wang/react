import React from 'react'
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Card, CardContent, Button } from '@mui/material';
import { FcEmptyTrash } from "react-icons/fc";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { BsCalendarWeek } from "react-icons/bs";
import UpdateTodo from './UpdateTodo';
import moment from "moment";

export const CompletedItem = (props) => {
    const { todo, changeCompleted, deletedItem, updateItem } = props;
    const { id, title, description, completed, expiredDate } = todo;

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => { setOpen(true) };
    const handleClose = () => { setOpen(false) };

    const handleUpdateTodo = item => {
        //console.log("item", item)
        updateItem(item);
        setOpen(false);
        return item;
    };
    return (
        <div>
            <UpdateTodo
                visible={open}
                updateItem={handleUpdateTodo}
                onCancel={handleClose}
                item={todo}
            />
            <Card sx={{ width: 330, height: "auto" }} style={completed ? { backgroundColor: "#F0F0F0" } : { backgroundColor: "#fff394" }}>
                <CardActions style={{ float: "right" }}>
                    <Button variant="outlined" size="small"
                        color={completed ? "error" : "success"}
                        onClick={() => changeCompleted(id)}>
                        {completed ? "uncompleted" : "completed"}
                    </Button>
                </CardActions>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div"
                            style={completed ? { textDecorationLine: "line-through" } : null}>
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary"
                            style={completed ? { textDecorationLine: "line-through" } : null}>
                            {description}
                        </Typography>
                    </CardContent>
                    <div>
                        <BsCalendarWeek style={{ float: "inline-end", marginLeft: 10, marginRight: 5 }} />
                        {moment(expiredDate).format("YYYY-MM-DD hh:mm")}
                    </div>
                </CardActionArea>

                <CardActions style={{ float: "right" }}>
                    <FcEmptyTrash onClick={() => deletedItem(id)} fontSize="large" />
                    <MdDriveFileRenameOutline onClick={handleClickOpen} fontSize="large" />
                </CardActions>
            </Card>
        </div>
    )
}
