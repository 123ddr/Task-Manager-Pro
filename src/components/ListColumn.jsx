import React, { useState } from 'react'
import { Card, Button, Input, Popconfirm } from 'antd'
import TaskCard from './TaskCard'


export default function ListColumn({ list, onAddTask, onEdit, onDelete, onMove, onToggleFavorite }){
    const [newTitle, setNewTitle] = useState('')


        return (
            <div className="list-column">
                <h3>{list.name}</h3>
                {list.tasks.map(task => (
                    <TaskCard key={task.id} task={task} onEdit={()=>onEdit(task)} onDelete={()=>onDelete(task.id, list.id)} onMove={onMove} onToggleFavorite={()=>onToggleFavorite(task.id)} />
                ))}


                <Input
                    placeholder="New task title"
                    value={newTitle}
                    onChange={e=>setNewTitle(e.target.value)}
                    onPressEnter={() => { if(newTitle.trim()){ onAddTask(newTitle.trim()); setNewTitle('') } }}
                />
                <Button style={{marginTop:8}} onClick={()=>{ if(newTitle.trim()){ onAddTask(newTitle.trim()); setNewTitle('') } }}>Add</Button>
            </div>
        )
}