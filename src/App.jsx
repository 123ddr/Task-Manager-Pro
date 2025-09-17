import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from 'antd'
import BoardsList from './pages/BoardsList'
import Board from './pages/Board'


const { Header, Content } = Layout


export default function App() {
  return (
    <Layout className="app-layout">
        <Header className="app-header">Task Manager Pro</Header>
          <Content className="app-content">
            <Routes>
              <Route path="/" element={<Navigate to="/boards" replace />} />
              <Route path="/boards" element={<BoardsList />} />
              <Route path="/boards/:id" element={<Board />} />
              <Route path="*" element={<div>Not Found</div>} />
            </Routes>
          </Content>
    </Layout>
  )
}