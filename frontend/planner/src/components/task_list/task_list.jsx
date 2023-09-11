import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

export const TaskList = ({ tasks, UpdateTask }) => {
    const [editableTaskId, setEditableTaskId] = useState(null);
    const user = useContext(AuthContext);
  
    const handleTaskClick = (taskId) => {
      setEditableTaskId(taskId);
    };
  
    const handleTaskBlur = (taskId, field, newValue) => {
        setEditableTaskId(null);
        const updatedData = { [field]: newValue };
        UpdateTask(taskId, updatedData, user.user.user_id)
      };
  
    return (
      <div className="task-list">
        {tasks.map(task => (
          <div className="columns" key={task.id}>
            <p  
                className={`purple ${editableTaskId === task.id ? 'editable' : ''}`}
                onClick={() => handleTaskClick(task.id)}
                onBlur={(e) => handleTaskBlur(task.id, 'time', e.target.textContent)}
                contentEditable={editableTaskId === task.id}
                suppressContentEditableWarning={true}
            >
              {task.time.split(':').slice(0, 2).join(':')}
            </p>
            <p
                className={`${editableTaskId === task.id ? 'editable' : ''}`}
                onClick={() => handleTaskClick(task.id)}
                onBlur={(e) => handleTaskBlur(task.id, 'monday_task', e.target.textContent)}
                contentEditable={editableTaskId === task.id}
                suppressContentEditableWarning={true}
                >
                {task.monday_task}
            </p>
            <p
                className={`${editableTaskId === task.id ? 'editable' : ''}`}
                onClick={() => handleTaskClick(task.id)}
                onBlur={(e) => handleTaskBlur(task.id, 'tuesday_task', e.target.textContent)}
                contentEditable={editableTaskId === task.id}
                suppressContentEditableWarning={true}
                >
                {task.tuesday_task}
            </p>
            <p
                className={`${editableTaskId === task.id ? 'editable' : ''}`}
                onClick={() => handleTaskClick(task.id)}
                onBlur={(e) => handleTaskBlur(task.id, 'wednesday_task', e.target.textContent)}
                contentEditable={editableTaskId === task.id}
                suppressContentEditableWarning={true}
                >
                {task.wednesday_task}
            </p>
            <p
                className={`${editableTaskId === task.id ? 'editable' : ''}`}
                onClick={() => handleTaskClick(task.id)}
                onBlur={(e) => handleTaskBlur(task.id, 'thursday_task', e.target.textContent)}
                contentEditable={editableTaskId === task.id}
                suppressContentEditableWarning={true}
                >
                {task.thursday_task}
            </p>
            <p
                className={`${editableTaskId === task.id ? 'editable' : ''}`}
                onClick={() => handleTaskClick(task.id)}
                onBlur={(e) => handleTaskBlur(task.id, 'friday_task', e.target.textContent)}
                contentEditable={editableTaskId === task.id}
                suppressContentEditableWarning={true}
                >
                {task.friday_task}
            </p>
            <p
                className={`${editableTaskId === task.id ? 'editable' : ''}`}
                onClick={() => handleTaskClick(task.id)}
                onBlur={(e) => handleTaskBlur(task.id, 'saturday_task', e.target.textContent)}
                contentEditable={editableTaskId === task.id}
                suppressContentEditableWarning={true}
                >
                {task.saturday_task}
            </p>
            <p
                className={`${editableTaskId === task.id ? 'editable' : ''}`}
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
  