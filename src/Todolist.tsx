import React, {ChangeEvent,} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import Button from '@mui/material/Button'
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';


type TodolistPropsType = {
    title: string;
    tasks: Array<TaskType>;
    filter: FilterValuesType;
    todolistId: string;
    removeTask: (TaskId: string, todolistId: string) => void;
    addTask: (title: string, todolistId: string) => void;
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void;
    changeTodolistFilter: (filter: FilterValuesType, todolistId: string) => void;
    removeTodolist: (todolistId: string) => void;
    changeTodolistTitle: (title: string, todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void


};

export const Todolist = (props: TodolistPropsType) => {
    const {
        title,
        tasks,
        filter,
        todolistId,
        removeTask,
        addTask,
        changeTaskStatus,
        changeTodolistFilter,
        removeTodolist,
        changeTodolistTitle,
        changeTaskTitle
    } = props;


    const addTaskHandler = (taskTitle: string) => {
        addTask(taskTitle, todolistId);
    }

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(title, todolistId);
    }

    const onAllClickHandler = () => changeTodolistFilter("All", todolistId)
    const onActiveClickHandler = () => changeTodolistFilter("Active", todolistId)
    const onCompletedClickHandler = () => changeTodolistFilter("Completed", todolistId)


    return (
        <div>
            <div className={"todolist-title-container"}>
                <h3><EditableSpan title={title} changeTitle={changeTodolistTitleHandler}/></h3>
                <Button title="x" onClick={() => removeTodolist(todolistId)}/>
            </div>


            <AddItemForm addItem={addTaskHandler}/>


            {
                <List>

                    {tasks.map((t) => {
                        const removeTaskHandler = () => removeTask(t.id, props.todolistId)
                        const changeTaskTitleHandler = (title: string) => {
                            changeTaskTitle(t.id, title, todolistId)
                        }
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(t.id, e.currentTarget.checked, todolistId);
                        }

                        return <ListItem disablePadding key={t.id} className={t.isDone ? "is-done" : ""}>

                            <Checkbox
                                size="small"
                                checked={t.isDone}
                                onChange={changeTaskStatusHandler}/>

                            <EditableSpan title={t.title}
                                          changeTitle={changeTaskTitleHandler}/>

                            <IconButton aria-label="delete"
                                        onClick={removeTaskHandler}>
                                <DeleteIcon/>
                            </IconButton>

                        </ListItem>
                    })}
                </List>
            }
            <div>
                <Button
                    size="small"
                    variant="contained"
                    color={filter === "All" ? "secondary" : "primary"}
                    onClick={onAllClickHandler}
                >All
                </Button>

                <Button
                    size="small"
                    variant="contained"
                    color={filter === "Active" ? "secondary" : "primary"}
                    onClick={onActiveClickHandler}
                >Active
                </Button>

                <Button
                    size="small"
                    variant="contained"
                    color={filter === "Completed" ? "secondary" : "primary"}
                    onClick={onCompletedClickHandler}
                >Completed
                </Button>
            </div>
        </div>
    )
}
//The End