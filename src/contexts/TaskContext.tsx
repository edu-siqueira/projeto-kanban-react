import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Task } from "../entities/Task";
import { taskService } from "../services/api";

export interface TasksContextData {
    tasks: Task[],
    createTask: (attributes: Omit<Task, 'id'>) => Promise<void>,
    updateTask: (id: number, attributes: Partial<Omit<Task, 'id'>>) => Promise<void>,
    deleteTask: (id: number) => Promise<void>
}

export const TaskContext = createContext({} as TasksContextData);

interface TasksContextsProvideProps{
    children: ReactNode;
}

export const TaskProvider: React.FC<TasksContextsProvideProps> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        taskService.getTasks().then((data) => setTasks(data))
    }, [])

    const createTask = async (attributes: Omit<Task, 'id'>) => {
        const newTask = await taskService.createTask(attributes);
        setTasks((currentState) => {
            const updatedTasks = [...currentState, newTask];
            return updatedTasks;
        })
    }

    const updateTask = async (id: number, attributes: Partial<Omit<Task, 'id'>>) => {
        // Implementation for updating a task
    }

    const deleteTask = async (id: number) => {
        // Implementation for deleting a task
    }

    return (
        <TaskContext.Provider value={{tasks, createTask, updateTask, deleteTask}}>
            {children}
        </TaskContext.Provider>
    )
}