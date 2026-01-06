import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  icon: LucideIcon;
  color?: "primary" | "secondary" | "accent" | "blue";
}

export function StatCard({ title, value, trend, trendUp, icon: Icon, color = "primary" }: StatCardProps) {
  const colorStyles = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    accent: "bg-accent/10 text-accent",
    blue: "bg-blue-500/10 text-blue-500",
  };

  return (
    <div className="glass-card p-6 relative overflow-hidden group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl font-bold font-display tracking-tight text-foreground">{value}</h3>
        </div>
        <div className={cn("p-3 rounded-xl transition-colors", colorStyles[color])}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      
      {trend && (
        <div className="mt-4 flex items-center text-xs font-medium">
          <span className={cn(
            "flex items-center gap-1 px-2 py-0.5 rounded-full",
            trendUp ? "text-green-600 bg-green-500/10" : "text-red-600 bg-red-500/10"
          )}>
            {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trend}
          </span>
          <span className="text-muted-foreground ml-2">vs last month</span>
        </div>
      )}

      {/* Decorative gradient blob */}
      <div className={cn(
        "absolute -bottom-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500",
        color === "primary" && "bg-primary",
        color === "secondary" && "bg-secondary",
        color === "accent" && "bg-accent",
        color === "blue" && "bg-blue-500"
      )} />
    </div>
  );
}
