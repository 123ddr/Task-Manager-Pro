import React from 'react'
import { Card, Button } from 'antd'


export default function BoardCard({ board, onOpen }) {
    return (
        <Card hoverable title={board.name} size="small">
            <p>{board.desc}</p>
            <Button type="primary" onClick={onOpen}>Open</Button>
        </Card>
    )
}