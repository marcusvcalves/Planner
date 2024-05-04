import axios from '../api/axios';
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from './AuthContext';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {

  const [tasks, setTasks] = useState(null);
  const [tasksUpdated, setTasksUpdated] = useState(false);
  const [editableTaskId, setEditableTaskId] = useState(null);
  const { user, authTokens } = useContext(AuthContext);

  const createTask = async () => {
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
    }
  };

  const updateTask = async (taskId, updatedData, userId) => {
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

  const deleteTask = async (taskId) => {
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

  const handleTaskClick = (taskId) => {
    setEditableTaskId(taskId);
  };

  const handleTaskBlur = (taskId, field, newValue) => {
    setEditableTaskId(null);
    const updatedData = { [field]: newValue };
    updateTask(taskId, updatedData, user.user_id)
  };

  useEffect(() => {
    const fetchTasks = async () => {
      if (authTokens && authTokens.access) {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${String(authTokens.access)}`
        };

        try {
          const response = await axios.get(`/api/taskss/`, {
            headers: headers
          });

          const data = response.data;

          setTasks(data.tasks);
        } catch (error) {
          console.error('Erro na requisição:', error);
        }
      }
    };

    fetchTasks();

    return () => setTasksUpdated(false);
  }, [authTokens, tasksUpdated]);

  const contextData = {
    tasks,
    createTask,
    updateTask,
    deleteTask,
    editableTaskId,
    handleTaskClick,
    handleTaskBlur
  }

  return <TaskContext.Provider value={contextData}>
    {children}
  </TaskContext.Provider>
}

export const useTasks = () => {
  return useContext(TaskContext);
}