import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";




type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    todolistId: string
    removeTask: (TaskId: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string,taskStatus: boolean, todolistId: string) => void
    changeTodolistFilter:(filter: FilterValuesType, todolistId: string) => void
    removeTodolist: (todolistId: string) => void

}

export const Todolist = (props: TodolistPropsType) => {
    // const {title, tasks, filter, todolistId, removeTask, changeTaskStatus, changeTodolistFilter, removeTodolist} = props

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            props.addTask(props.title, props.todolistId );
            setNewTaskTitle("")
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== ""){
            props.addTask(newTaskTitle.trim(), props.todolistId);
            setNewTaskTitle("");
        } else {
            setError("Field is required");
        }

    }
    const onAllClickHandler =() => props.changeTodolistFilter("All",props.todolistId)
    const onActiveClickHandler =() => props.changeTodolistFilter("Active", props.todolistId)
    const onCompletedClickHandler =() => props.changeTodolistFilter("Completed", props.todolistId)


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyUp={onKeyUpHandler}
                       className= {error ? "error" : ""}
                />

                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}

            </div>

            <ul>
                {
                    props.tasks.map(t => {
                        const removeTaskHandler =() => props.removeTask(t.id,props.todolistId)
                        const changeTaskStatusHandler =(e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked,props.todolistId);
                        }

                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={changeTaskStatusHandler}/>
                            <span>{t.title}</span>
                            <button onClick={removeTaskHandler}>x</button>
                        </li>
                    })
                }

            </ul>

            <div>
                <button className={props.filter === "All" ? "active-filter" : ""}
                        onClick={onAllClickHandler}>All</button>
                <button className={props.filter === "Active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "Completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}
