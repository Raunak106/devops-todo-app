import { useState, useEffect, useCallback } from "react";
import { Task, Priority, TaskFilters, TaskStats } from "@/types/task";
import { getStoredTasks, saveTasks, generateTaskId, formatDate, isToday } from "@/lib/tasks";
import { useAuth } from "@/contexts/AuthContext";

export const useTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<TaskFilters>({
    status: "all",
    priority: "all",
    search: "",
  });

  useEffect(() => {
    if (user) {
      const storedTasks = getStoredTasks(user.id);
      setTasks(storedTasks);
    }
  }, [user]);

  const saveAndUpdate = useCallback(
    (newTasks: Task[]) => {
      setTasks(newTasks);
      saveTasks(newTasks);
    },
    []
  );

  const addTask = useCallback(
    (title: string, priority: Priority, dueDate: string | null) => {
      if (!user) return;
      const newTask: Task = {
        id: generateTaskId(),
        title,
        completed: false,
        priority,
        dueDate,
        createdAt: formatDate(new Date()),
        completedAt: null,
        userId: user.id,
      };
      saveAndUpdate([...tasks, newTask]);
    },
    [user, tasks, saveAndUpdate]
  );

  const updateTask = useCallback(
    (id: string, updates: Partial<Pick<Task, "title" | "priority" | "dueDate">>) => {
      const updated = tasks.map((t) => (t.id === id ? { ...t, ...updates } : t));
      saveAndUpdate(updated);
    },
    [tasks, saveAndUpdate]
  );

  const deleteTask = useCallback(
    (id: string) => {
      const filtered = tasks.filter((t) => t.id !== id);
      saveAndUpdate(filtered);
    },
    [tasks, saveAndUpdate]
  );

  const toggleComplete = useCallback(
    (id: string) => {
      const updated = tasks.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            completed: !t.completed,
            completedAt: !t.completed ? formatDate(new Date()) : null,
          };
        }
        return t;
      });
      saveAndUpdate(updated);
    },
    [tasks, saveAndUpdate]
  );

  const clearCompleted = useCallback(() => {
    const filtered = tasks.filter((t) => !t.completed);
    saveAndUpdate(filtered);
  }, [tasks, saveAndUpdate]);

  const filteredTasks = tasks.filter((task) => {
    // Status filter
    if (filters.status === "completed" && !task.completed) return false;
    if (filters.status === "pending" && task.completed) return false;

    // Priority filter
    if (filters.priority !== "all" && task.priority !== filters.priority) return false;

    // Search filter
    if (filters.search && !task.title.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }

    return true;
  });

  const stats: TaskStats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
    completedToday: tasks.filter((t) => t.completed && t.completedAt && isToday(t.completedAt)).length,
    pendingToday: tasks.filter((t) => !t.completed && t.dueDate && isToday(t.dueDate)).length,
    progressPercent: tasks.length > 0 ? Math.round((tasks.filter((t) => t.completed).length / tasks.length) * 100) : 0,
  };

  const groupedTasks = {
    completedToday: tasks.filter((t) => t.completed && t.completedAt && isToday(t.completedAt)),
    completedEarlier: tasks.filter((t) => t.completed && t.completedAt && !isToday(t.completedAt)),
    pending: tasks.filter((t) => !t.completed),
  };

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    filters,
    setFilters,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    clearCompleted,
    stats,
    groupedTasks,
  };
};
