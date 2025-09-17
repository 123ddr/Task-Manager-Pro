import React from 'react'
import { Card, Button } from 'antd'


export default function TaskCard({ task, onEdit, onDelete, onMove, onToggleFavorite }){
    return (
        <Card size="small" className="task-card">
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div>
                <strong>{task.title}</strong>
                    <div style={{fontSize:12}}>{task.description}</div>
                    </div>
                    <div style={{display:'flex', flexDirection:'column', gap:6}}>
                        <Button size="small" onClick={onToggleFavorite}>{task.favorite ? '★' : '☆'}</Button>
                        <Button size="small" onClick={onEdit}>Edit</Button>
                        <Button size="small" danger onClick={onDelete}>Del</Button>
                    <div style={{display:'flex', gap:4, marginTop:6}}>
                        <Button size="small" onClick={()=>onMove(task.id, task.listId, 'todo')}>To Do</Button>
                        <Button size="small" onClick={()=>onMove(task.id, task.listId, 'inprogress')}>In Prog</Button>
                        <Button size="small" onClick={()=>onMove(task.id, task.listId, 'done')}>Done</Button>
                    </div>
                </div>
            </div>
        </Card>
    )
}