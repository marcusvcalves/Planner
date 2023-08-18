import './planner.css'
import './../../css/global.css'
import Button from '@mui/material/Button';

export default function Planner() {
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
            </div>
        </section>
    )
    
}