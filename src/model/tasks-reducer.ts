import {TasksStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodolistAT} from "./todolists-reducer";

type AddTaskAT = ReturnType<typeof AddTaskAC>
type RemoveTaskAT = ReturnType<typeof  RemoveTaskAC>
type ChangeTaskStatusAT = ReturnType<typeof ChangeTaskStatusAC>
type ChangeTaskTitleAT = ReturnType<typeof ChangeTaskTitleAC>

type ActionType = AddTaskAT | RemoveTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT | AddTodolistAT

export const tasksReducer = (tasks:TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {


        // case "ADD-TASK":
        //     const newTask:TaskType = {
        //             id: v1(),
        //             title: action.payload.title,
        //             isDone: false,
        //         }
        //     return {...tasks, [action.payload.todolistId]: [newTask, ...tasks[action.payload.todolistId]]}
        //
        // default:
        //     return tasks


        case "ADD-TASK": {
            const {title, todolistId} = action.payload
            const newTask: TaskType = {
                id: v1(),
                title: title,
                isDone: false,
            }
            return {...tasks, [todolistId]: [newTask, ...tasks[todolistId]]}
        }

        case "REMOVE-TASK": {
            const {id, todolistId} = action.payload
            const filteredTasks = tasks[todolistId].filter(t => t.id !== id)
            return {...tasks, [todolistId]: filteredTasks}
        }

        case "CHANGE-TASK-STATUS": {
            const {id, isDone, todolistId} = action.payload
            const changedTask: Array<TaskType> = tasks[todolistId].map(t => t.id === id ? {...t, isDone} : t)
            return {...tasks, [todolistId]: changedTask}
            }

        case "CHANGE-TASK-TITLE": {
            const {id, title, todolistId} = action.payload
            const changedTask: Array<TaskType> = tasks[todolistId].map(t => t.id === id ? {...t, title} : t)
            return {...tasks, [todolistId]: changedTask}
        }

        case "ADD-TODOLIST": {
            const {id} = action.payload
            return {...tasks, [id]: []}
        }

        default:
            return tasks


    }
}
                               //AC Action Create
// export const AddTaskAC = (title:string, todolistId:string) => {
//     return ({
//         type: "ADD-TASK",
//         payload:{
//             title,
//             todolistId,
//         }
//     }as const)
// }


export const AddTaskAC = (payload: {title:string, todolistId:string}) => {
    return ({
        type: "ADD-TASK",
        payload: payload
    }as const)
}




export const RemoveTaskAC = (payload: {id: string, todolistId: string}) => {
    return({
        type: "REMOVE-TASK",
        payload,
    }as const)
}


export const ChangeTaskStatusAC = (payload: {id: string, isDone: boolean, todolistId: string}) => {
    return({
        type: "CHANGE-TASK-STATUS",
        payload,
    }as const)
}

export const ChangeTaskTitleAC = (payload:{ id: string, title : string, todolistId: string}) => {
    return({
        type: "CHANGE-TASK-TITLE",
        payload,
    }as const)
}

