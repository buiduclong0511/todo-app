import { Button, Input, List, notification, Radio, Typography } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import TodoItem from "./components/TodoItem";
import { addTodo, deleteTodo, updateContent, updateStatus } from "./redux/slices";

const DONE = "DONE";
const DOING = "DOING";
const ALL = "ALL";

function App() {
    const todo = useSelector((state) => state.todo);
    const dispatch = useDispatch();

    const [value, setValue] = useState("");
    const [selectedOption, setSelectedOption] = useState(ALL);

    let todoList = todo.list;

    if (selectedOption !== ALL) {
        todoList = todoList.filter((todo) => {
            return selectedOption === DONE ? todo.done : !todo.done;
        });
    }

    const handleChangeValue = (event) => {
        setValue(event.target.value);
    };

    const handleAddTodo = () => {
        if (value.trim()) {
            const newTodo = {
                content: value.trim(),
                done: false,
            };
            dispatch(addTodo(newTodo));
            setValue("");

            if (selectedOption === DONE) {
                setSelectedOption(ALL);
            }
        }
    };

    const handleChangeContent = (id, newContent) => {
        if (newContent.trim()) {
            dispatch(
                updateContent({
                    id,
                    newContent,
                })
            );
        }
    };

    const handleChangeStatus = (todo) => {
        dispatch(updateStatus(todo.id));
        notification.info({
            message: `${todo.content} ${todo.done ? "is doing" : "is done"}.`,
        });
    };

    const handleDelete = (todo) => {
        dispatch(deleteTodo(todo.id));
        notification.info({
            message: `${todo.content} deleted.`,
        });
    };

    const filterOptions = [
        {
            label: "Done",
            value: DONE,
        },
        {
            label: "Doing",
            value: DOING,
        },
        {
            label: "All",
            value: ALL,
        },
    ];

    const handleChangeFilter = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <Container>
            <StyledHeader>Todo App</StyledHeader>
            <StyledFilter>
                Filter:{" "}
                <StyledRadioGroup
                    options={filterOptions}
                    value={selectedOption}
                    onChange={handleChangeFilter}
                />
            </StyledFilter>
            {!!todoList.length ? (
                <StyledList
                    dataSource={todoList}
                    renderItem={(todo) => (
                        <TodoItem
                            done={todo.done}
                            onChange={(value) => handleChangeContent(todo.id, value)}
                            onClickStatus={() => handleChangeStatus(todo)}
                            onDelete={() => handleDelete(todo)}
                        >
                            {todo.content}
                        </TodoItem>
                    )}
                />
            ) : (
                <Typography.Paragraph>Empty!!!</Typography.Paragraph>
            )}
            <div className="input-wrapper">
                <Input placeholder="Enter new todo..." value={value} onChange={handleChangeValue} />
                <Button className="add-btn" onClick={handleAddTodo}>
                    Add
                </Button>
            </div>
        </Container>
    );
}

const Container = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 100px;

    .input-wrapper {
        width: 70%;
        display: flex;
        padding-top: 16px;
    }

    .add-btn {
        margin-left: 16px;
    }
`;

const StyledList = styled(List)`
    width: 70%;
`;

const StyledHeader = styled.h2`
    text-align: center;
`;

const StyledFilter = styled(Typography.Paragraph)`
    text-align: left;
    width: 70%;
`;

const StyledRadioGroup = styled(Radio.Group)`
    margin-left: 16px;
`;

export default App;
