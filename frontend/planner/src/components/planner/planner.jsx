import './planner.css';
import './../../css/global.css';
import Button from '@mui/material/Button';
import { TaskList } from '../task_list/task_list';
import { useEffect, useState } from 'react';



export default function Planner() {

    const [tasks, setTasks ] = useState(null);

    useEffect(() => {
        const authTokens = JSON.parse(localStorage.getItem('authTokens'));

        if (authTokens && authTokens.access) {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${String(authTokens.access)}`
            };
    
            fetch("http://127.0.0.1:8000/api/tasks/", {
                method: 'GET',
                headers: headers
            })
            .then(res => res.json())
            .then(data => {
                setTasks(data.tasks);
            })
        } 
    }, []);
    
return (
        <section className='planner-container'>
            <div className='buttons'>
                <Button variant='contained' className='task-button'>Nova Tarefa</Button>
                <Button variant='contained' className='task-button'>Limpar Tarefas</Button>
            </div>
            <div className='planner'>
                <div className='columns'>
                    <p className='purple'>Horários</p>
                    <p>Segunda</p>
                    <p>Terça</p>
                    <p>Quarta</p>
                    <p>Quinta</p>
                    <p>Sexta</p>
                    <p>Sábado</p>
                    <p>Domingo</p>
                </div>
                <div>
                    {tasks && <TaskList tasks={tasks} />}
                </div>
            </div>
        </section>
    )
    
}