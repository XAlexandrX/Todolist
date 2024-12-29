import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Box, Container, CssBaseline, Grid2, IconButton, Paper, Switch, Toolbar,} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
import {MenuButton} from "./MenuButton";
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {indigo, lightBlue} from "@mui/material/colors";


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


    let todolistId_1 = v1()
    let todolistId_2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>(
        [
        {id: todolistId_1, title: "What to learn", filter: "All"},
        {id: todolistId_2, title: "What to buy", filter: "All"},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
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
        //
        const filteredTasks = tasks[todolistId].filter(t => t.id !==taskId)
        setTasks({...tasks, [todolistId]: filteredTasks})
    }


    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        const changedTask: Array<TaskType> = tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: taskStatus} : t)
        setTasks({...tasks, [todolistId]: changedTask})
    }

    const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
        const changedTask: Array<TaskType> = tasks[todolistId].map(t => t.id === taskId ? {...t, title:title} : t)
        setTasks({...tasks, [todolistId]: changedTask})
    }




    // const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
    //     const nextState: TasksStateType = {
    //         ...tasks,
    //         [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)
    //     }
    //     setTasks(nextState)
    // }



 //Todolist
    const changeTodolistFilter = (filter: FilterValuesType, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl))

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

    const changeTodolistTitle = (title: string, todolistId: string) => {
        setTodolists(todolists.map(tl=>tl.id === todolistId ? {...tl, title} : tl)
        )}



    const todolistsComponents = todolists.map(tl => {

        let tasksForTodolist = tasks[tl.id]
        if (tl.filter === 'Active') {
            tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
        }
        if (tl.filter === 'Completed') {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
        }

        return (
            <Paper elevation={8} sx={{p: "15px"}}>
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
                    changeTodolistTitle={changeTodolistTitle}
                    changeTaskTitle={changeTaskTitle }

                />
            </Paper>

        )
    })


    //GUI
    const [isDark, setIsDark] = useState(false)
    const theme = createTheme({  palette: {
            primary: lightBlue,
            secondary: indigo,
            mode: isDark ? "dark" : "light"
        },
    })

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
        <div className="App">

            <AppBar position="static">
                <Toolbar sx={{justifyContent: "space-between"}}>
                    <IconButton color="inherit">
                        <MenuIcon />
                    </IconButton>
                    <Box>
                        <MenuButton color="inherit" variant="outlined">Login</MenuButton>
                        <MenuButton color="inherit" variant="outlined">Logout</MenuButton>
                        <MenuButton color="inherit" variant="outlined" background={"#0330fc"}>FAQ</MenuButton>
                        <Switch onChange={()=> setIsDark(!isDark)}/>
                    </Box>

                </Toolbar>
            </AppBar>

            <Container fixed>

                <Grid2 container sx={{p: "15px 0"}}>
                    <AddItemForm addItem={addTodolist} />
                </Grid2>

                <Grid2 container spacing={4}>
                        {todolistsComponents}
                </Grid2>

            </Container>


        </div>
        </ThemeProvider>
    );

}

export default App;
