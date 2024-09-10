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

    let tasksList = props.tasks.length === 0
        ? <div>ВАш список дел пуст</div>
        : <ul>
            {
                props.tasks.map((t: TasksType) => {
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                        </li>
                    )
                })}
        </ul>

                return (
                <div className="todolist">
                <h3>{props.title}</h3>
    <div>
        <input/>
        <button title={'+'} />
    </div>
    <ul>
        {tasksList}
    </ul>
    <div>
        <Button title={'All'}/>
        <Button title={'Active'}/>
        <Button title={'Completed'}/>
    </div>

</div>
)
    ;
};

