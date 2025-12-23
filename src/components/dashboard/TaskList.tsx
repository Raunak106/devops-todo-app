import { Task } from "@/types/task";
import TaskItem from "./TaskItem";
import { ListTodo } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Pick<Task, "title" | "priority" | "dueDate">>) => void;
  onDelete: (id: string) => void;
  emptyMessage?: string;
}

const TaskList = ({ tasks, onToggle, onUpdate, onDelete, emptyMessage = "No tasks found" }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <ListTodo className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task, index) => (
        <div
          key={task.id}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <TaskItem
            task={task}
            onToggle={onToggle}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
