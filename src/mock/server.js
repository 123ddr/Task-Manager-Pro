const STORAGE_KEY = 'taskly_mock_db_v1'


const seed = {
    boards: [
        {
            id: '1',
            name: 'Personal Tasks',
            lists: [
                { id:'todo', name:'To Do', tasks: [ { id:'t1', title:'Buy milk', description:'2 liters', favorite:false, listId:'todo' } ] },
                { id:'inprogress', name:'In Progress', tasks: [ { id:'t2', title:'Build sample app', description:'Start with Vite', favorite:true, listId:'inprogress' } ] },
                { id:'done', name:'Done', tasks: [] }
            ]
        },
        {
            id: '2',
            name: 'Team Board',
            lists: [
                { id:'todo', name:'To Do', tasks: [ { id:'t3', title:'Write spec', description:'Draft API', favorite:false, listId:'todo' } ] },
                { id:'inprogress', name:'In Progress', tasks: [] },
                { id:'done', name:'Done', tasks: [] }
            ]
        }
    ]
}

function readDb(){
    const raw = localStorage.getItem(STORAGE_KEY)
    if(!raw){
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seed))
        return JSON.parse(JSON.stringify(seed))
    }
    return JSON.parse(raw)
}

function writeDb(db){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db))
}


function delay(ms=300){
    return new Promise(res=>setTimeout(res, ms))
}

export async function getBoard(boardId){
    await delay()
    const db = readDb()
    const board = db.boards.find(b=>b.id===boardId)
    if(!board) throw new Error('Board not found')
   
    return JSON.parse(JSON.stringify(board))
}

export async function addTask(boardId, listId, task){
    await delay()
    const db = readDb()
    const board = db.boards.find(b=>b.id===boardId)
    if(!board) throw new Error('Board not found')
    const id = 't' + Math.random().toString(36).slice(2,9)
    const newTask = { id, title: task.title||'Untitled', description: task.description||'', favorite: false, listId }
    const list = board.lists.find(l=>l.id===listId)
    if(!list) throw new Error('List not found')
    list.tasks.push(newTask)
    writeDb(db)
    return JSON.parse(JSON.stringify(newTask))
}

export async function updateTask(boardId, taskId, patch){
    await delay()
    const db = readDb()
    const board = db.boards.find(b=>b.id===boardId)
    if(!board) throw new Error('Board not found')
    let found = null
    for(const l of board.lists){
        const t = l.tasks.find(x=>x.id===taskId)
        if(t){ Object.assign(t, patch); found = t; break }
    }
    if(!found) throw new Error('Task not found')
    writeDb(db)
    return JSON.parse(JSON.stringify(found))
}

export async function deleteTask(boardId, taskId){
await delay()
const db = readDb()
const board = db.boards.find(b=>b.id===boardId)
if(!board) throw new Error('Board not found')
for(const l of board.lists){
    const idx = l.tasks.findIndex(x=>x.id===taskId)
    if(idx>=0){ l.tasks.splice(idx,1); writeDb(db); return true }
}
throw new Error('Task not found')
}