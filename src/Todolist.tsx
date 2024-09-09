import React from 'react';

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
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>

        </div>
    );
};

