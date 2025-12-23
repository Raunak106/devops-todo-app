import { TaskStats } from "@/types/task";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  Clock,
  ListTodo,
  TrendingUp,
  Calendar,
  Target,
} from "lucide-react";

interface StatsCardsProps {
  stats: TaskStats;
}

const StatsCards = ({ stats }: StatsCardsProps) => {
  const cards = [
    {
      title: "Total Tasks",
      value: stats.total,
      icon: ListTodo,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: CheckCircle2,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: Clock,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      title: "Done Today",
      value: stats.completedToday,
      icon: Target,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
  ];

  return (
    <div className="space-y-4 animate-slide-up">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div
            key={card.title}
            className="glass-card p-4 transition-transform hover:scale-105"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${card.bgColor}`}>
                <card.icon className={`h-5 w-5 ${card.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{card.value}</p>
                <p className="text-xs text-muted-foreground">{card.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span className="font-medium text-foreground">Overall Progress</span>
          </div>
          <span className="text-lg font-bold text-primary">{stats.progressPercent}%</span>
        </div>
        <Progress value={stats.progressPercent} className="h-3" />
      </div>

      {stats.pendingToday > 0 && (
        <div className="glass-card p-4 border-l-4 border-l-warning">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-warning" />
            <span className="text-foreground">
              <strong>{stats.pendingToday}</strong> task{stats.pendingToday > 1 ? "s" : ""} due today
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsCards;
