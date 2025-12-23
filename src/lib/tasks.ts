import { Task } from "@/types/task";

const TASKS_KEY = "todo_tasks";

export const getStoredTasks = (userId: string): Task[] => {
  const tasks = localStorage.getItem(TASKS_KEY);
  if (!tasks) return [];
  const allTasks: Task[] = JSON.parse(tasks);
  return allTasks.filter((t) => t.userId === userId);
};

export const saveTasks = (tasks: Task[]): void => {
  const allTasks = localStorage.getItem(TASKS_KEY);
  const existing: Task[] = allTasks ? JSON.parse(allTasks) : [];
  
  // Get unique user IDs from new tasks
  const userIds = [...new Set(tasks.map((t) => t.userId))];
  
  // Remove old tasks for these users and add new ones
  const filtered = existing.filter((t) => !userIds.includes(t.userId));
  const merged = [...filtered, ...tasks];
  
  localStorage.setItem(TASKS_KEY, JSON.stringify(merged));
};

export const generateTaskId = (): string => {
  return "task_" + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
};

export const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

export const isToday = (dateString: string): boolean => {
  const today = formatDate(new Date());
  return dateString === today;
};

export const getDateFromString = (dateString: string): Date => {
  return new Date(dateString + "T00:00:00");
};

export const formatDisplayDate = (dateString: string): string => {
  const date = getDateFromString(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

export const getTimeGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
};

export const getCurrentDateTime = (): { date: string; time: string } => {
  const now = new Date();
  const date = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return { date, time };
};
