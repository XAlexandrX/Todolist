import {TasksStateType} from "../App";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./tasks-reducer";
import {AddTodolistAC} from "./todolists-reducer";


test('correct task should be added to correct array', () => {
    const startState: TasksStateType = {
        todolistId1: [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false },
        ],
        todolistId2: [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false },
        ],
    }

    const endState = tasksReducer(startState, AddTaskAC ({title: "juice",todolistId: "todolistId2"}))


    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe("juice")
    expect(endState['todolistId2'][0].isDone).toBe(false)
})



test('correct task should be deleted from correct array', () => {
    const startState: TasksStateType = {
        todolistId1: [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false },
        ],
        todolistId2: [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false },
        ],
    }

    const endState = tasksReducer(startState, RemoveTaskAC({id:"2",todolistId: "todolistId2"}))

    expect(endState).toEqual({
        todolistId1: [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false },
        ],
        todolistId2: [
            { id: "1", title: "bread", isDone: false },
            { id: "3", title: "tea", isDone: false },
        ],
    })
})


test('status of specified task should be changed', () => {
    const startState: TasksStateType = {
        todolistId1: [
            { id: '1', title: 'CSS', isDone: false },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'React', isDone: false },
        ],
        todolistId2: [
            { id: '1', title: 'bread', isDone: false },
            { id: '2', title: 'milk', isDone: true },
            { id: '3', title: 'tea', isDone: false },
        ],
    }

    const endState = tasksReducer(
        startState,
        ChangeTaskStatusAC({
            id: '2',
            isDone: false,
            todolistId: "todolistId2",
        })
    )

    expect(endState["todolistId2"][1].isDone).toBe(false)
    expect(endState["todolistId1"][1].isDone).toBe(true)

})


test('update title in task', () => {
    const startState: TasksStateType = {
        todolistId1: [
            { id: '1', title: 'CSS', isDone: false },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'React', isDone: false },
        ],
        todolistId2: [
            { id: '1', title: 'bread', isDone: false },
            { id: '2', title: 'milk', isDone: true },
            { id: '3', title: 'tea', isDone: false },
        ],
    }

    const endState = tasksReducer(
        startState,
        ChangeTaskTitleAC({
            id: '2',
            title: 'cookie',
            todolistId: 'todolistId2',
        })
    )

    expect(endState['todolistId1'][1].title).toBe('JS')
    expect(endState['todolistId2'][1].title).toBe('cookie')
})


test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        todolistId1: [
            { id: '1', title: 'CSS', isDone: false },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'React', isDone: false },
        ],
        todolistId2: [
            { id: '1', title: 'bread', isDone: false },
            { id: '2', title: 'milk', isDone: true },
            { id: '3', title: 'tea', isDone: false },
        ],
    }

    const endState = tasksReducer(startState, AddTodolistAC('new todolist'))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})