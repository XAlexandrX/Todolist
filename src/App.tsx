import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValuesType = "All" | "Active" | "Completed";


function App() {
    //BLL
    let [tasks, setTasks] = useState<TasksType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false}

    ])

    const addTask = (title: string) => {
        const newTask =
            {id: v1(), title: title, isDone: false,};
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    const changeStatus = (taskId: string,isDone: boolean) => {
       let task = tasks.find(t  => t.id === taskId)
        if (task) {
            task.isDone = isDone;
        }
        // let copy=[...tasks]
        // setTasks(copy);
        setTasks([...tasks]);
    }

    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }


    const [filter, setFilter] = useState<FilterValuesType>('All')

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    let tasksForTodolist = tasks
    if (filter === 'Active') {
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }

    if (filter === 'Completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === true)
    }
    //GUI
    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={filter}

            />
        </div>
    );
}

export default App;
