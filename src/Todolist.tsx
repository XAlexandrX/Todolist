import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";
import {AddItemForm} from "./AddItemForm";




type TodolistPropsType = {
    title: string;
    tasks: Array<TaskType>;
    filter: FilterValuesType;
    todolistId: string;
    removeTask: (TaskId: string, todolistId: string) => void;
    addTask: (title: string, todolistId: string) => void;
    changeTaskStatus: (taskId: string,taskStatus: boolean, todolistId: string) => void;
    changeTodolistFilter:(filter: FilterValuesType, todolistId: string) => void;
    removeTodolist: (todolistId: string) => void;

};

export const Todolist = (props: TodolistPropsType) => {
    const {title, tasks, filter, todolistId, removeTask,addTask, changeTaskStatus, changeTodolistFilter, removeTodolist} = props;

    // const [newTaskTitle, setNewTaskTitle] = useState("");
    // const [error, setError] = useState<string | null>(null);

    // const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setNewTaskTitle(e.currentTarget.value)
    //}
    // const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null);
    //     if (e.key === 'Enter') {
    //         addTask(title, todolistId );
    //         setNewTaskTitle("")
    //     }
    // }
    const addTaskHandler = (taskTitle: string) => {
            addTask(taskTitle, todolistId);
    }

    const onAllClickHandler =() => changeTodolistFilter("All", todolistId)
    const onActiveClickHandler =() => changeTodolistFilter("Active", todolistId)
    const onCompletedClickHandler =() => changeTodolistFilter("Completed",todolistId)


    return (
        <div>
            <h3>
                {title}
                <Button title="x" onClick={()=> removeTodolist(todolistId)}/>
            </h3>

            <AddItemForm addItem = {addTaskHandler}/>


            {
                <ul>

                    {tasks.map((t) => {
                        const removeTaskHandler =() => removeTask(t.id,props.todolistId)
                        const changeTaskStatusHandler =(e: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(t.id, e.currentTarget.checked, todolistId);
                        }

                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={changeTaskStatusHandler}/>
                            <span>{t.title}</span>
                            <Button onClick={removeTaskHandler} title="X"/>
                        </li>
                    })}
                </ul>
            }
            <div>
                <Button className={filter === "All" ? "active-filter" : ""}
                        onClick={onAllClickHandler}
                        title="All"/>

                <Button className={filter === "Active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}
                        title="Active"/>

                <Button className={filter === "Completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}
                        title="Completed"/>
            </div>
        </div>
    )
}
