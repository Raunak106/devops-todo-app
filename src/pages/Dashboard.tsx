import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTasks } from "@/hooks/useTasks";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCards from "@/components/dashboard/StatsCards";
import AddTaskForm from "@/components/dashboard/AddTaskForm";
import TaskFiltersBar from "@/components/dashboard/TaskFiltersBar";
import TaskList from "@/components/dashboard/TaskList";
import GroupedTasksView from "@/components/dashboard/GroupedTasksView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const {
    tasks,
    filters,
    setFilters,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    clearCompleted,
    stats,
    groupedTasks,
  } = useTasks();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen animated-gradient-bg">
      <div className="container max-w-5xl py-6 px-4">
        <DashboardHeader />
        <StatsCards stats={stats} />
        
        <div className="mt-6">
          <AddTaskForm onAdd={addTask} />
        </div>

        <div className="mt-6">
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList className="glass">
              <TabsTrigger value="all">All Tasks</TabsTrigger>
              <TabsTrigger value="grouped">Daily View</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <TaskFiltersBar
                filters={filters}
                onFilterChange={setFilters}
                onClearCompleted={clearCompleted}
                hasCompleted={stats.completed > 0}
              />
              <TaskList
                tasks={tasks}
                onToggle={toggleComplete}
                onUpdate={updateTask}
                onDelete={deleteTask}
              />
            </TabsContent>

            <TabsContent value="grouped">
              <GroupedTasksView
                groupedTasks={groupedTasks}
                onToggle={toggleComplete}
                onUpdate={updateTask}
                onDelete={deleteTask}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
