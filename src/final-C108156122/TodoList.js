import React, { useState } from "react";
import { Link, Switch, Route, withRouter } from 'react-router-dom';
import { datas } from "./datas";
import CompletedList from "./CompletedList";
import "antd/dist/antd.min.css"
import { Badge, Breadcrumb, Layout, Menu, Result, Button, notification } from 'antd';
import { AiFillHome } from "react-icons/ai";
import { RiTodoFill, RiBearSmileFill } from "react-icons/ri";
import Home from "./Home";
const { Header, Content, Footer } = Layout;

const TodoList = (props) => {
    const [todos, setTodos] = useState(datas);

    const unfinish = todos.some(todo => !todo.completed);

    const changeCompleted = (id) => {
        console.log("change id", id);
        const finishchange = todos.map((todo) => {
            return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
        })
        //console.log("finishchange", finishchange)
        setTodos(finishchange)
    }
    const deletedItem = (id) => {
        console.log("delete id", id)
        const deleteitem = todos.filter((todo) => todo.id !== id)

        //console.log("deleteitem", deleteitem)
        setTodos(deleteitem)
        notification.success({
            message: "刪除通知",
            description: "刪除成功",
            duration: 3,
            placemen: 'bottomLeft',
        });
    }
    const updateItem = (item) => {
        console.log("update id", item.id)
        const updatetodo = todos.map((todo) => {
            return todo.id === item.id ? {
                ...todo, title: item.title,
                description: item.description,
                completed: item.completed,
                expiredDate: item.expiredDate
            } : todo;
        });
        //console.log("updatetodo:", updatetodo)
        setTodos(updatetodo)
        notification.success({
            message: "修改通知",
            description: "修改成功",
            duration: 3,
            placemen: 'bottomLeft',
        });
    }
    const addNew = (todo) => {
        console.log("new todo:", todo)
        const newtodos = [...todos, {
            id: todos[todos.length - 1].id + 1,
            ...todo,
        }]
        setTodos(newtodos)
        //console.log("all:", newtodos)
        notification.success({
            message: "新增通知",
            description: "新增成功",
            duration: 3,
            placemen: 'bottomLeft',
        });

    }
    const items = [
        {
            key: "/",
            label: <Link to="/"><AiFillHome />Home</Link>
        },
        {
            key: "/todos",
            label: (
                <>
                    <Link to="/todos"><RiTodoFill />Xuan代辦</Link>
                    <Badge dot={unfinish} offset={[6, 0]} />
                </>
            )
        }
    ]
    const getBreadcrumbItem = () => {
        switch (props.location.pathname) {
            case "/":
                return <Breadcrumb.Item><AiFillHome />Home</Breadcrumb.Item>;
            case "/todos":
                return <Breadcrumb.Item><RiTodoFill />Xuan's Todos</Breadcrumb.Item>;
            default:
                return null;
        }
    };
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <h1 style={{ float: "left", color: "white" }}><RiBearSmileFill /> Xuan's Todo System</h1>
                <Menu theme="dark" mode="horizontal" style={{ float: "right" }}
                    items={items} selectedKeys={[props.location.pathname]} />
            </Header>
            <Content style={{ padding: '0 50px', marginTop: 64, backgroundColor: "#f2ece4" }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/"><AiFillHome /></Link></Breadcrumb.Item>
                    {getBreadcrumbItem()}
                </Breadcrumb>
                <div style={{ padding: 5, background: "#c9d7f2" }}>
                    <Switch>
                        <Route exact path="/">
                            <Home todos={todos} />
                        </Route>
                        <Route path="/todos">
                            <CompletedList
                                todos={todos}
                                changeCompleted={changeCompleted}
                                deletedItem={deletedItem}
                                updateItem={updateItem}
                                onAdd={addNew}
                            />
                        </Route>
                        <Route render={() => {
                            return (
                                <Result
                                    status="404"
                                    title="404"
                                    subTitle="Sorry, the page you visited does not exist."
                                    extra={<Button type="primary"><Link to="/">Back Home</Link></Button>}
                                />
                            )
                        }} />
                    </Switch>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center', backgroundColor: "#f2ece4" }}>
                Copyright ©2022 C108156122王薈宣 All rights reserved
            </Footer>
        </Layout>
    )
}

export default withRouter(TodoList);