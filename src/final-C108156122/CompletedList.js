import React, { useState } from 'react'
import { CompletedItem } from './CompletedItem';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import AddTodo from './AddTodo';
import { GrAdd } from "react-icons/gr";
import { Button } from "antd";


const CompletedList = ((props) => {
    const { todos, changeCompleted, deletedItem, updateItem, onAdd } = props;
    //console.log(props)
    const [queryType, setQueryType] = useState("all");

    const handleChange = e => {
        setQueryType(e.target.value);
    };

    const getTodos = () => {
        switch (queryType) {
            case "completed":
                return todos.filter(todo => todo.completed);
            case "uncompleted":
                return todos.filter(todo => !todo.completed);
            case "all":
            default:
                return todos;
        }
    };

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => { setOpen(true) };
    const handleClose = () => { setOpen(false) };

    const handleAddTodo = todo => {
        onAdd(todo);
        setOpen(false);
    };

    return (
        <div style={{ backgroundColor: "#c9d7f2" }}>
            <div style={{ margin: "10px 0px", display: "flex" }}>
                <AddTodo
                    visible={open}
                    onAddTodo={handleAddTodo}
                    onCancel={handleClose}
                />
                <ToggleButtonGroup
                    color="primary"
                    value={queryType}
                    exclusive
                    onChange={handleChange}
                    style={{ backgroundColor: "#FFF", marginLeft: 10 }}
                >
                    <ToggleButton size="small" value="all">all</ToggleButton>
                    <ToggleButton size="small" value="uncompleted">uncompleted</ToggleButton>
                    <ToggleButton size="small" value="completed">completed</ToggleButton>
                </ToggleButtonGroup>
            </div>
            {
                getTodos().map((todo) => {
                    return (
                        <div key={todo.id} style={{ marginLeft: 10, marginRight: 10, display: "inline-block" }}>
                            <CompletedItem todo={todo}
                                changeCompleted={changeCompleted}
                                deletedItem={deletedItem}
                                updateItem={updateItem}
                                onAddTodo={onAdd} />
                        </div>
                    )
                })
            }
            <Button
                type="link"
                icon={<GrAdd />}
                style={{ display: "flex-end" }}
                size="large"
                onClick={handleClickOpen}>
            </Button>
        </div>
    )
})
export default CompletedList;


