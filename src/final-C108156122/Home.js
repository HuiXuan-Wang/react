import { Calendar, Badge } from 'antd'
import React from 'react'

const Home = (props) => {
    const { todos } = props;

    const monthCellRender = value => {
        const monthTodos = todos.filter(todo =>
            todo.expiredDate.isSame(value, "year") &&
            todo.expiredDate.isSame(value, "month"))

        return renderTodoItem(monthTodos);
    };

    const dateCellRender = value => {
        const dayTodos = todos.filter(todo =>
            todo.expiredDate.isSame(value, "day"))

        return renderTodoItem(dayTodos);
    };

    const renderTodoItem = todos => {
        return (
            <ul style={{ listStyle: "none" }}>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <Badge color={todo.completed ? "#87d068" : "pink"}
                            text={todo.title}
                            style={todo.completed ? { textDecorationLine: "line-through" } : null} />
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} style={{ background: "#c9d7f2" }} />
    )
}

export default Home