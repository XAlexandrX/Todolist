import React from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";



function App() {
        //BLL:
        const todolistTitle_1 = "What to learn"
        const todolistTitle_2 = "Song"

        const tasks1: Array<TasksType> = [
                {id: 1, title: 'HTML&CSS', isDone: true },
                {id: 2, title: 'JS', isDone: true },
                {id: 3, title: 'RectJS', isDone: false },
                {id: 4, title: 'Redux', isDone: false},
            ]

        const tasks2: Array<TasksType> = [
            {id: 1, title: 'Hello world', isDone: true },
            {id: 2, title: 'I am Happy', isDone: false },
            {id: 3, title: 'Yo', isDone: false },
            {id: 4, title: 'Redux', isDone: false},
        ]


        //GUI:
        return(
        <div className="App">
            <Todolist
                title = {todolistTitle_1}
                tasks = {tasks1}
            />
            <Todolist title = {todolistTitle_2} tasks={tasks2}/>
        </div>
    );
}





export default App;
