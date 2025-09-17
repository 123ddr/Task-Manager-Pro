import { useReducer } from 'react'


function reducer(state, action){
    switch(action.type){
        case 'init':
            return action.payload
        case 'add': {
            const { listId, task } = action.payload
            return {
                ...state,
                lists: state.lists.map(l => l.id === listId ? { ...l, tasks: [...l.tasks, task] } : l)
                }
            }
        case 'update': {
            const updated = action.payload
        return {
            ...state,
                lists: state.lists.map(l => ({
                ...l,
                tasks: l.tasks.map(t => t.id === updated.id ? { ...t, ...updated } : t)
            }))
        }
    }
        case 'delete': {
            const { taskId, listId } = action.payload
        return {
            ...state,
            lists: state.lists.map(l => l.id === listId ? { ...l, tasks: l.tasks.filter(t=>t.id!==taskId) } : l)
            }
        }
        case 'move': {
            const { taskId, fromList, toList } = action.payload
            let movedTask = null
            const lists = state.lists.map(l => {
                if(l.id === fromList){
                    const remaining = l.tasks.filter(t=>{
                        if(t.id === taskId){ movedTask = { ...t, listId: toList }; return false }
                        return true
                })
                    return { ...l, tasks: remaining }
                }
                        return l
                }).map(l => l.id === toList && movedTask ? { ...l, tasks: [...l.tasks, movedTask] } : l)

                return { ...state, lists }
            }
                default:
                    return state
        }
}


export default function useBoardReducer(){
    const initial = { id:'', name:'', lists:[] }
    return useReducer(reducer, initial)
}