import React, {ChangeEvent,} from "react";
import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";




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
    changeTodolistTitle:(title:string, todolistId: string) => void
    changeTaskTitle:(taskId: string, title: string, todolistId: string) => void


};

export const Todolist = (props: TodolistPropsType) => {
    const {title, tasks, filter, todolistId, removeTask,addTask, changeTaskStatus, changeTodolistFilter, removeTodolist, changeTodolistTitle, changeTaskTitle} = props;


    const addTaskHandler = (taskTitle: string) => {
            addTask(taskTitle, todolistId);
    }

    const changeTodolistTitleHandler = (title:string) => {
        changeTodolistTitle(title, todolistId);
    }

    const onAllClickHandler =() => changeTodolistFilter("All", todolistId)
    const onActiveClickHandler =() => changeTodolistFilter("Active", todolistId)
    const onCompletedClickHandler =() => changeTodolistFilter("Completed",todolistId)


    return (
        <div>
            <div className={"todolist-title-container"}>
                <h3><EditableSpan title={title} changeTitle={changeTodolistTitleHandler}/></h3>
                <Button title="x" onClick={() => removeTodolist(todolistId)}/>
            </div>



            <AddItemForm addItem={addTaskHandler}/>


            {
                <ul>

                    {tasks.map((t) => {
                        const removeTaskHandler = () => removeTask(t.id,props.todolistId)
                        const changeTaskTitleHandler = (title: string) => {
                            changeTaskTitle(t.id, title, todolistId )
                        }
                        const changeTaskStatusHandler =(e: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(t.id, e.currentTarget.checked, todolistId);
                        }

                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={changeTaskStatusHandler}/>
                            <EditableSpan  title={t.title} changeTitle={changeTaskTitleHandler} />
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
