import React, { useContext } from 'react';
import { TaskContext } from '../../contexts/TaskContext';
import CloseIcon from '@mui/icons-material/Close';

export const TaskList = () => {
  const { tasks, deleteTask, editableTaskId, handleTaskClick, handleTaskBlur } = useContext(TaskContext);

  return (
    <div className="task-list">
      {tasks.map(task => (
        <div className="columns" key={task.id}>
          <p
            className={`purple task-item ${editableTaskId === task.id ? 'editable' : ''}`}
            onClick={() => handleTaskClick(task.id)}
            onBlur={(e) => handleTaskBlur(task.id, 'time', e.target.textContent)}
            contentEditable={editableTaskId === task.id}
            suppressContentEditableWarning={true}
          >
            {task.time.split(':').slice(0, 2).join(':')}
            <CloseIcon style={{ fontSize: "0.9em" }} onClick={() => deleteTask(task.id)}></CloseIcon>
          </p>
          <p
            className={`task-item ${editableTaskId === task.id ? 'editable' : ''}`}
            onClick={() => handleTaskClick(task.id)}
            onBlur={(e) => handleTaskBlur(task.id, 'monday_task', e.target.textContent)}
            contentEditable={editableTaskId === task.id}
            suppressContentEditableWarning={true}
          >
            {task.monday_task}
          </p>
          <p
            className={`task-item ${editableTaskId === task.id ? 'editable' : ''}`}
            onClick={() => handleTaskClick(task.id)}
            onBlur={(e) => handleTaskBlur(task.id, 'tuesday_task', e.target.textContent)}
            contentEditable={editableTaskId === task.id}
            suppressContentEditableWarning={true}
          >
            {task.tuesday_task}
          </p>
          <p
            className={`task-item ${editableTaskId === task.id ? 'editable' : ''}`}
            onClick={() => handleTaskClick(task.id)}
            onBlur={(e) => handleTaskBlur(task.id, 'wednesday_task', e.target.textContent)}
            contentEditable={editableTaskId === task.id}
            suppressContentEditableWarning={true}
          >
            {task.wednesday_task}
          </p>
          <p
            className={`task-item ${editableTaskId === task.id ? 'editable' : ''}`}
            onClick={() => handleTaskClick(task.id)}
            onBlur={(e) => handleTaskBlur(task.id, 'thursday_task', e.target.textContent)}
            contentEditable={editableTaskId === task.id}
            suppressContentEditableWarning={true}
          >
            {task.thursday_task}
          </p>
          <p
            className={`task-item ${editableTaskId === task.id ? 'editable' : ''}`}
            onClick={() => handleTaskClick(task.id)}
            onBlur={(e) => handleTaskBlur(task.id, 'friday_task', e.target.textContent)}
            contentEditable={editableTaskId === task.id}
            suppressContentEditableWarning={true}
          >
            {task.friday_task}
          </p>
          <p
            className={`task-item ${editableTaskId === task.id ? 'editable' : ''}`}
            onClick={() => handleTaskClick(task.id)}
            onBlur={(e) => handleTaskBlur(task.id, 'saturday_task', e.target.textContent)}
            contentEditable={editableTaskId === task.id}
            suppressContentEditableWarning={true}
          >
            {task.saturday_task}
          </p>
          <p
            className={`task-item ${editableTaskId === task.id ? 'editable' : ''}`}
            onClick={() => handleTaskClick(task.id)}
            onBlur={(e) => handleTaskBlur(task.id, 'sunday_task', e.target.textContent)}
            contentEditable={editableTaskId === task.id}
            suppressContentEditableWarning={true}
          >
            {task.sunday_task}
          </p>
        </div>
      ))}
    </div>
  );
};
