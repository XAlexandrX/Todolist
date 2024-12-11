import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "All" | "Active" | "Completed";

export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
}

export type TasksStateType = {
    [todolistId: string]: TaskType[]
}

//BLL
function App() {


    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>(
        [
        {id: todolistId_1, title: "What to learn", filter: "All"},
        {id: todolistId_2, title: "What to buy", filter: "All"},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false}
        ],
        [todolistId_2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Water', isDone: false},
        ]
    })

//Tasks
    const addTask = (title: string, todolistId: string) => {
        const newTask =
            {
                id: v1(),
                title: title,
                isDone: false,
            }
        const addedTasks = [newTask, ...tasks[todolistId]]
        setTasks({...tasks, [todolistId]: addedTasks})
    }

    const removeTask = (taskId: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }


    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        const nextState: TasksStateType = {
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: taskStatus} : t)
        }
        setTasks(nextState)
    }



 //Todolist
    const changeTodolistFilter = (filter: FilterValuesType, todolistId: string) => {
        const nextState: Array<TodolistType> = todolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl)
        setTodolists(nextState)
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId] //!!!
        // const copyTasks = {...tasks}
        // delete copyTasks[todolistId]
        // setTasks(copyTasks)

    };

    const addTodolist = (title: string) => {
        const todolistId = v1()
        const newTodolist: TodolistType = {
            id: todolistId,
            title: title,
            filter: "All"
        }
    setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [todolistId]: []})
    }


    const todolistsComponents = todolists.map(tl => {

        let tasksForTodolist = tasks[tl.id]
        if (tl.filter === 'Active') {
            tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
        }
        if (tl.filter === 'Completed') {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
        }

        return (
            <Todolist
                key={tl.id}
                title={tl.title}
                filter={tl.filter}
                tasks={tasksForTodolist}
                todolistId={tl.id}
                removeTask={removeTask}
                changeTodolistFilter={changeTodolistFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                removeTodolist={removeTodolist}

            />
        )
    })


    //GUI

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist} />
            {todolistsComponents}
        </div>
    );

}

export default App;
