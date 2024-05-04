import './styles.css';
import './../../css/global.css';
import Button from '@mui/material/Button';
import { TaskList } from '../task_list';
import { TaskHeader } from '../task_header';
import { useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import { TaskContext } from '../../contexts/TaskContext';

export default function Planner() {

    const { user } = useContext(AuthContext);
    const { tasks, createTask, updateTask, deleteTask } = useContext(TaskContext);

    return (
        <section className='planner-container'>
            <div className='buttons'>
                {user && <Button variant='contained' className='task-button' onClick={createTask}>Novo Horário</Button>}
            </div>
            <div className='planner'>
                <div>
                    <TaskHeader />
                </div>
                <div>
                    {tasks && <TaskList tasks={tasks} UpdateTask={updateTask} DeleteTask={deleteTask} />}
                </div>
            </div>
        </section>
    )

}