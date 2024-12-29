// create new state

import {FilterValuesType, TodolistType} from "../App";


export type RemoveTodolistAT = {
    type: "REMOVE-TODOLIST"
        payload: {
        id: string
    }
}

export type AddTodolistAT = {
    type: "ADD-TODOLIST"
    payload: {
        id: string
        title: string

    }
}

export type ChangeTodolistTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    payload:{
        id: string,
        title: string,
    }

}


export type ChangeTodolistFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    payload: {
        id: string,
        filter: FilterValuesType,
    }
}

type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT

export const todolistsReducer = (todolists: Array<TodolistType>, action:ActionType, ):Array<TodolistType> => {

    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.payload.id)


        case "ADD-TODOLIST":
            const newTodolist: TodolistType = {
                id: action.payload.id,
                title: action.payload.title,
                filter: "All"
            }
            return [...todolists, newTodolist]

        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(tl=>tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)

        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(tl=>tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)



        default:
            return todolists
    }

}

export const RemoveTodolistAC = (id:string):RemoveTodolistAT => {
    return ({
            type: "REMOVE-TODOLIST",
            payload: {
                id,
            },
        })
}

export const AddTodolistAC = (id: string, title: string): AddTodolistAT => {
    return ({
        type: "ADD-TODOLIST",
        payload: {
            id,
            title,
        },
    })
}

export const ChangeTodolistTitleAC = (id: string, title: string):ChangeTodolistTitleAT => {
    return({
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            id: id,
            title: title,
        }
    })
}

export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType):ChangeTodolistFilterAT => {
    return({
        type: "CHANGE-TODOLIST-FILTER" ,
        payload: {
            id,
            filter,
        },
    })

}