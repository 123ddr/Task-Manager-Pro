import { useCallback } from 'react'
import * as server from '../mock/server'


export default function useBoardApi(){
    
    const fetchBoard = useCallback(async (boardId) => {
        return await server.getBoard(boardId)
    }, [])


    const addTaskApi = useCallback(async (boardId, listId, task) => {
        return await server.addTask(boardId, listId, task)
    }, [])


    const patchTaskApi = useCallback(async (boardId, taskId, patch) => {
        return await server.updateTask(boardId, taskId, patch)
    }, [])


    const deleteTaskApi = useCallback(async (boardId, taskId) => {
        return await server.deleteTask(boardId, taskId)
    }, [])


    return { fetchBoard, addTaskApi, patchTaskApi, deleteTaskApi }
}