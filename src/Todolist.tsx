import React from 'react';
import {Button} from "./Button";

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}


type TodolistPropsType = {
    title: string
    tasks: Array<TasksType>
    date?: string
}

export const Todolist = (props: TodolistPropsType) => {
    const tasksList: Array<JSX.Element> = props.tasks.map((t: TasksType) => {
        return (
            <li>
                <input type="checkbox" checked={t.isDone} />
                <span>{t.title}</span>
            </li>
        )
    })

    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <Button title="All"/>
                <Button title="Active"/>
                <Button title="Completed" />
            </div>

        </div>
    );
};

