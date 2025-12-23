import { TaskFilters, Priority } from "@/types/task";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Trash2 } from "lucide-react";

interface TaskFiltersBarProps {
  filters: TaskFilters;
  onFilterChange: (filters: TaskFilters) => void;
  onClearCompleted: () => void;
  hasCompleted: boolean;
}

const TaskFiltersBar = ({
  filters,
  onFilterChange,
  onClearCompleted,
  hasCompleted,
}: TaskFiltersBarProps) => {
  return (
    <div className="glass-card p-4 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Select
            value={filters.status}
            onValueChange={(v) =>
              onFilterChange({ ...filters, status: v as TaskFilters["status"] })
            }
          >
            <SelectTrigger className="w-32">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.priority}
            onValueChange={(v) =>
              onFilterChange({ ...filters, priority: v as TaskFilters["priority"] })
            }
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          {hasCompleted && (
            <Button variant="outline" onClick={onClearCompleted} className="gap-2">
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline">Clear Completed</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskFiltersBar;
