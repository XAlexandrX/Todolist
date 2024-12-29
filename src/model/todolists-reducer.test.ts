import {v1} from 'uuid'
import {TodolistType} from "../App";
import {todolistsReducer} from "./todolists-reducer";


test('correct todolist should be deleted', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    // 1. Стартовый state
    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ]

    // 2. Действие\Инструкция.(action)
    const action = {                        //RemoveTodolistAT
        type: "REMOVE-TODOLIST"   as const ,
        payload: {
            id: todolistId1,
        },
    }                                                          //as const

    const endState = todolistsReducer(startState, action)

    // 3. Проверка, что действие измененило state соответствующим образом
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, не любой
    expect(endState[0].id).toBe(todolistId2)
})



test('correct todolist should be created', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ]

    const action = {
        type: "ADD-TODOLIST" as const,
        payload: {
            id: v1(),
            title: "New Todolist",
        },
    }

    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(action.payload.title)
})



test('correct todolist should change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'All' },
        { id: todolistId2, title: 'What to buy', filter: 'All' },
    ]

    const action = {
        type: "CHANGE-TODOLIST-TITLE" as const,
        payload: {
            id: todolistId2,
            title: "New Todolist",
        }
    }

    const endState = todolistsReducer(startState,action )

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(action.payload.title)
})



test('correct filter of todolist should be change ', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'All' },
        { id: todolistId2, title: 'What to buy', filter: 'All' },
    ]

    const action = {
        type: "CHANGE-TODOLIST-FILTER" ,
        payload: {
            id: todolistId2,
            filter: "Completed",
        }
    }as const

    const endState = todolistsReducer(startState, action )

    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe(action.payload.filter)
})