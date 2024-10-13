import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string,isDone: boolean) => void
    filter: FilterValuesType
}

export const Todolist = (props: TodolistPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            props.addTask(newTaskTitle);
            setNewTaskTitle("")
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== ""){
            props.addTask(newTaskTitle.trim());
            setNewTaskTitle("");
        } else {
            setError("Field is required");
        }

    }
    const onAllClickHandler =() => props.changeFilter("All")
    const onActiveClickHandler =() => props.changeFilter("Active")
    const onCompletedClickHandler =() => props.changeFilter("Completed")


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
                        const onClickHandler =() => props.removeTask(t.id)
                        const onChangeHandler =(e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked);
                        }

                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={onChangeHandler}/>
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}>x</button>
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
