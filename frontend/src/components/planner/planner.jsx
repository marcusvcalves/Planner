import './planner.css';
import './../../css/global.css';
import Button from '@mui/material/Button';
import { TaskList } from '../task_list/task_list';
import { TaskHeader } from '../task_header/task_header';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

import axios from '../../api/axios'

export default function Planner() {

    const url = 'localhost';

    const [tasks, setTasks ] = useState(null);
    const [tasksUpdated, setTasksUpdated] = useState(false);
    const { user, authTokens } = useContext(AuthContext);

    const GetTasks = async () => {
        if (authTokens && authTokens.access) {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${String(authTokens.access)}`
            };
    
            try {
                const response = await axios.get(`/api/tasks/`, {
                    headers: headers
                });
    
                const data = response.data;
    
                setTasks(data.tasks);
            } catch (error) {
                console.error('Erro na requisição:', error);
            }
        } 
    };

    const CreateTask = async () => {
        const taskData = {
            user: user.user_id,
        };
    
        try {
            await axios.post(`/api/tasks/`, taskData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${String(authTokens.access)}`,
                },
            });
    
            setTasksUpdated(true);
        } catch (error) {
            console.error('Erro na requisição:', error);
            // Lide com o erro conforme necessário
        }
    };

    const UpdateTask = async (taskId, updatedData, userId) => {
        const body = { ...updatedData, user: userId };
    
        try {
            const response = await axios.put(`/api/task/update/${taskId}/`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${String(authTokens.access)}`,
                },
            });
    
            setTasksUpdated(true);
            return response.data;
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };
    const DeleteTask = async (taskId) => {
        try {
            await axios.delete(`/api/task/delete/${taskId}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${String(authTokens.access)}`,
                },
            });
    
            setTasksUpdated(true);
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    useEffect(() => {
        GetTasks();

        return () => setTasksUpdated(false);
    }, [authTokens, tasksUpdated]);
    
return (
        <section className='planner-container'>
            <div className='buttons'>
                {user && <Button variant='contained' className='task-button' onClick={CreateTask}>Novo Horário</Button>}
            </div>
            <div className='planner'>
                <div>
                    <TaskHeader />
                </div>
                <div>
                    {tasks && <TaskList tasks={tasks} UpdateTask={UpdateTask} DeleteTask={DeleteTask}/>}
                </div>
            </div>
        </section>
    )
    
}