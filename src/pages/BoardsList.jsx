import React from 'react'
import { Card } from 'antd'
import { useNavigate } from 'react-router-dom'
import BoardCard from '../components/BoardCard'


const BOARDS = [
    { id: '1', name: 'Personal Tasks', desc: 'Your private todos and errands' },
    { id: '2', name: 'Team Board', desc: 'Team sprint tasks and progress' },
]


export default function BoardsList() {
    const navigate = useNavigate()


return (
    <div>
    <h2>Boards</h2>
        <div className="boards-grid">
            {BOARDS.map(b => (
                <BoardCard key={b.id} board={b} onOpen={() => navigate(`/boards/${b.id}`)} />
            ))}
        </div>
    </div>
    )
}