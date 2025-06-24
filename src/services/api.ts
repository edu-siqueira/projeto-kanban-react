import type { Task } from "../entities/Task";

export const taskService = {
    async getTasks(): Promise<Task[]> {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);
        const data: Task[] = await response.json();
        return data;
    },

    async createTask(attributes: Omit<Task, 'id'>): Promise<Task> {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(attributes),
        });
        const newTask: Task = await response.json();
        return newTask;
    }
}