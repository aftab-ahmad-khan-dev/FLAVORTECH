import { Layout } from "@/components/Layout";
import { StatCard } from "@/components/StatCard";
import { DollarSign, ShoppingBag, Users, Clock, ArrowUpRight, TrendingUp, Calendar, ArrowRight, ChefHat } from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar 
} from "recharts";
import { useStatsOverview } from "@/hooks/use-stats";
import { useOrders } from "@/hooks/use-orders";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data for charts
const revenueData = [
  { name: '10 AM', value: 400 },
  { name: '11 AM', value: 800 },
  { name: '12 PM', value: 2400 },
  { name: '1 PM', value: 3200 },
  { name: '2 PM', value: 1800 },
  { name: '3 PM', value: 1200 },
  { name: '4 PM', value: 1600 },
  { name: '5 PM', value: 3800 },
  { name: '6 PM', value: 4200 },
];

const hourlyOrders = [
  { name: 'Mon', value: 45 },
  { name: 'Tue', value: 52 },
  { name: 'Wed', value: 48 },
  { name: 'Thu', value: 61 },
  { name: 'Fri', value: 85 },
  { name: 'Sat', value: 95 },
  { name: 'Sun', value: 75 },
];

const recentActivities = [
  { id: 1, type: 'order', title: 'New Order #8421', time: '2 mins ago', amount: '$42.50', status: 'pending' },
  { id: 2, type: 'menu', title: 'Menu Item "Truffle Pasta" updated', time: '15 mins ago', user: 'Chef Mario' },
  { id: 3, type: 'staff', title: 'Rider "Alex" checked in', time: '24 mins ago', status: 'active' },
  { id: 4, type: 'order', title: 'Order #8418 delivered', time: '45 mins ago', amount: '$128.00', status: 'completed' },
];

export default function Overview() {
  const { data: stats } = useStatsOverview();
  const { data: orders } = useOrders();

  const activeOrders = stats?.activeOrders ?? 12;
  const totalRevenue = stats?.totalRevenue ? `$${(stats.totalRevenue / 100).toLocaleString()}` : "$12,450";
  const customers = stats?.totalCustomers ?? 843;
  
  return (
    <Layout title="Dashboard Overview">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-white">System Status: <span className="text-teal-500">OPTIMAL</span></h2>
          <p className="text-slate-500 text-sm font-medium">Monitoring 3 outlets in real-time</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 border-white/10 bg-white/5 hover:bg-white/10 text-white">
            <Calendar className="w-4 h-4" /> Download Report
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 shadow-xl shadow-orange-500/20 border-none font-bold">
            <TrendingUp className="w-4 h-4" /> Live Insights
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Revenue" 
          value={totalRevenue} 
          icon={DollarSign} 
          trend="12.5%" 
          trendUp={true} 
          color="primary"
        />
        <StatCard 
          title="Active Orders" 
          value={String(activeOrders)} 
          icon={ShoppingBag} 
          trend="5%" 
          trendUp={true} 
          color="secondary"
        />
        <StatCard 
          title="Total Customers" 
          value={String(customers)} 
          icon={Users} 
          trend="2.4%" 
          trendUp={false} 
          color="accent"
        />
        <StatCard 
          title="Avg. Prep Time" 
          value="24 min" 
          icon={Clock} 
          color="blue"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass-card p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">+15% vs yesterday</Badge>
          </div>
          <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
            Revenue Trends <ArrowUpRight className="w-4 h-4 text-primary" />
          </h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)' }}
                  itemStyle={{ color: 'hsl(var(--primary))', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side Info Panel */}
        <div className="flex flex-col gap-6">
          <div className="glass-card p-6 flex-1">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Recent Activity</h3>
              <Button variant="ghost" size="sm" className="text-xs text-primary hover:text-primary hover:bg-primary/10">View All</Button>
            </div>
            <div className="space-y-6">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex gap-4 group cursor-pointer">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    activity.type === 'order' ? 'bg-orange-500/10 text-orange-500' : 
                    activity.type === 'menu' ? 'bg-teal-500/10 text-teal-500' : 'bg-blue-500/10 text-blue-500'
                  }`}>
                    {activity.type === 'order' ? <ShoppingBag className="w-5 h-5" /> : 
                     activity.type === 'menu' ? <ChefHat className="w-5 h-5" /> : <Users className="w-5 h-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate group-hover:text-primary transition-colors">{activity.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] uppercase font-black text-slate-500 tracking-wider">{activity.time}</span>
                      {activity.amount && <span className="text-[10px] font-bold text-teal-500">{activity.amount}</span>}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-700 group-hover:text-white transition-colors" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-3xl p-6 shadow-2xl shadow-teal-500/20 relative overflow-hidden group cursor-pointer">
            <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <ChefHat className="w-32 h-32" />
            </div>
            <h4 className="text-white font-black text-xl mb-2">Inventory Alert</h4>
            <p className="text-white/80 text-sm mb-4">5 items reaching low stock threshold. Reorder now to avoid disruptions.</p>
            <Button size="sm" className="bg-white text-teal-600 hover:bg-slate-100 font-bold w-full rounded-xl">Review Inventory</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-6 text-white">Peak Hours Analysis</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyOrders}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}
                />
                <Bar dataKey="value" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-6 text-white">Staff on Duty</h3>
          <div className="space-y-4">
            {[
              { name: 'Marcus Chen', role: 'Head Chef', status: 'In Kitchen', efficiency: 98 },
              { name: 'Sarah Miller', role: 'Operations', status: 'On Break', efficiency: 94 },
              { name: 'David Wilson', role: 'Delivery Lead', status: 'Active', efficiency: 89 },
            ].map((staff, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-transparent hover:border-white/10">
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-white/5 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i+20}`} alt={staff.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h5 className="text-sm font-bold text-white">{staff.name}</h5>
                  <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest">{staff.role}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1.5 justify-end">
                    <div className={`w-1.5 h-1.5 rounded-full ${staff.status === 'On Break' ? 'bg-yellow-500' : 'bg-teal-500'}`} />
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">{staff.status}</span>
                  </div>
                  <div className="text-xs font-black text-primary mt-0.5">{staff.efficiency}% EFF</div>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full text-slate-400 hover:text-white hover:bg-white/5 font-bold text-xs uppercase tracking-widest mt-2">Manage All Staff</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

