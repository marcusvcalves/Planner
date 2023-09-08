import './planner.css';
import './../../css/global.css';
import Button from '@mui/material/Button';
import { TaskList } from '../task_list/task_list';
import { TaskHeader } from '../task_header/task_header';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';


export default function Planner() {

    const [tasks, setTasks ] = useState(null);
    const [tasksUpdated, setTasksUpdated] = useState(false);
    const { user, authTokens } = useContext(AuthContext);

    const GetTasks = () => {
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
    }

    const CreateTask = () => {     
        const taskData = {
            user: user.user_id, 
          };

        fetch('http://127.0.0.1:8000/api/task/create/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${String(authTokens.access)}`,
          },
          body: JSON.stringify(taskData)
        })
        .then(() => setTasksUpdated(true));
      }

    useEffect(() => {
        GetTasks();

        return () => setTasksUpdated(false);
    }, [authTokens, tasksUpdated]);
    
return (
        <section className='planner-container'>
            <div className='buttons'>
                <Button variant='contained' className='task-button' onClick={CreateTask}>Nova Tarefa</Button>
                <Button variant='contained' className='task-button'>Limpar Tarefas</Button>
            </div>
            <div className='planner'>
                <div>
                    <TaskHeader />
                </div>
                <div>
                    {tasks && <TaskList tasks={tasks} />}
                </div>
            </div>
        </section>
    )
    
}