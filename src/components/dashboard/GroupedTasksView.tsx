import { Task } from "@/types/task";
import TaskList from "./TaskList";
import { CheckCircle2, Clock, History } from "lucide-react";

interface GroupedTasksViewProps {
  groupedTasks: {
    completedToday: Task[];
    completedEarlier: Task[];
    pending: Task[];
  };
  onToggle: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Pick<Task, "title" | "priority" | "dueDate">>) => void;
  onDelete: (id: string) => void;
}

const GroupedTasksView = ({
  groupedTasks,
  onToggle,
  onUpdate,
  onDelete,
}: GroupedTasksViewProps) => {
  return (
    <div className="space-y-6 animate-slide-up">
      {/* Pending Tasks */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Clock className="h-5 w-5 text-warning" />
          <h3 className="font-semibold text-foreground">
            Pending Tasks ({groupedTasks.pending.length})
          </h3>
        </div>
        <TaskList
          tasks={groupedTasks.pending}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
          emptyMessage="No pending tasks. Great job!"
        />
      </section>

      {/* Completed Today */}
      {groupedTasks.completedToday.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="h-5 w-5 text-success" />
            <h3 className="font-semibold text-foreground">
              Completed Today ({groupedTasks.completedToday.length})
            </h3>
          </div>
          <TaskList
            tasks={groupedTasks.completedToday}
            onToggle={onToggle}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        </section>
      )}

      {/* Completed Earlier */}
      {groupedTasks.completedEarlier.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <History className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold text-foreground">
              Completed Earlier ({groupedTasks.completedEarlier.length})
            </h3>
          </div>
          <TaskList
            tasks={groupedTasks.completedEarlier}
            onToggle={onToggle}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        </section>
      )}
    </div>
  );
};

export default GroupedTasksView;
