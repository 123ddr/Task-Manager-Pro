import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Modal, Input, Badge } from 'antd'
import ListColumn from '../components/ListColumn'
import useBoardApi from '../hooks/useBoardApi'
import useBoardReducer from '../hooks/useBoardReducer'

export default function Board(){
    const { id } = useParams()
    const { fetchBoard, addTaskApi, patchTaskApi, deleteTaskApi } = useBoardApi()
    const [state, dispatch] = useBoardReducer()
    const [loading,setLoading] = useState(false)
    const [editModal, setEditModal] = useState({open:false, task:null, listId:null})


useEffect(()=>{
    setLoading(true)
    fetchBoard(id).then(board => {
    dispatch({type:'init', payload:board})
    }).finally(()=>setLoading(false))
},[id])

const onAddTask = async (listId, title)=>{
    const newTask = await addTaskApi(id, listId, { title, description: '' })
    dispatch({type:'add', payload:{listId, task:newTask}})
}

const onEditTask = async (taskUpdate)=>{
    const updated = await patchTaskApi(id, taskUpdate.id, taskUpdate)
    dispatch({type:'update', payload:updated})
    setEditModal({open:false,task:null})
}

const onDelete = async (taskId, listId)=>{
    await deleteTaskApi(id, taskId)
    dispatch({type:'delete', payload:{taskId, listId}})
}

const onMove = (taskId, fromList, toList)=>{
    dispatch({type:'move', payload:{taskId, fromList, toList}})
}

const onToggleFavorite = async (taskId)=>{
    const task = state.lists.flatMap(l=>l.tasks).find(t=>t.id===taskId)
    const updated = await patchTaskApi(id, taskId, { ...task, favorite: !task.favorite })
    dispatch({type:'update', payload:updated})
}

const favoritesCount = state.lists.reduce((s,l)=> s + l.tasks.filter(t=>t.favorite).length, 0)

return (
        <div className="board-page">
            <div className="board-header">
            <h2>{state.name || 'Board'}</h2>
            <div>
                <span>Favorites</span><br/>
                <Badge count={favoritesCount} showZero />
            </div>
        </div>


    {loading ? <div>Loading...</div> : (
        <div className="lists-row">
            {state.lists.map(list => (
                <ListColumn key={list.id}
                    list={list}
                    onAddTask={(title)=>onAddTask(list.id, title)}
                    onEdit={(task)=>setEditModal({open:true,task, listId:list.id})}
                    onDelete={onDelete}
                    onMove={onMove}
                    onToggleFavorite={onToggleFavorite}
                />
            ))}
        </div>
    )}


        <Modal
            open={editModal.open}
            title="Edit Task"
            onCancel={()=>setEditModal({open:false,task:null})}
            onOk={() => onEditTask({ ...editModal.task })}
        >
            {editModal.task && (
                <div>
                    <Input
                    value={editModal.task.title}
                    onChange={e=>setEditModal(s=>({...s, task:{...s.task, title: e.target.value}}))}
                    placeholder="Title"
                    style={{marginBottom:8}}
                    />
                    <Input.TextArea
                    value={editModal.task.description}
                    onChange={e=>setEditModal(s=>({...s, task:{...s.task, description: e.target.value}}))}
                    rows={4}
                    />
                </div>
            )}
        </Modal>
    </div>
  )
}