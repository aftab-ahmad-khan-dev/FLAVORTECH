import { Layout } from "@/components/Layout";
import { useOrders, useUpdateOrderStatus, useCreateOrder } from "@/hooks/use-orders";
import { format } from "date-fns";
import { Plus, Search, Filter, Clock, CheckCircle, XCircle, ChefHat, MoreVertical, ExternalLink, Printer, Trash2 } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertOrderSchema, type InsertOrder } from "@shared/schema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Component for Status Badge
const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    pending: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    preparing: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    ready: "bg-teal-500/10 text-teal-500 border-teal-500/20",
    delivered: "bg-slate-500/10 text-slate-500 border-slate-500/20",
    cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  const icons: Record<string, any> = {
    pending: Clock,
    preparing: ChefHat,
    ready: CheckCircle,
    delivered: CheckCircle,
    cancelled: XCircle,
  };

  const Icon = icons[status] || Clock;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${styles[status] || styles.pending}`}>
      <Icon className="w-3 h-3" />
      {status}
    </span>
  );
};

export default function Orders() {
  const { data: orders, isLoading } = useOrders();
  const updateStatus = useUpdateOrderStatus();
  const createOrder = useCreateOrder();
  const [search, setSearch] = useState("");

  const filteredOrders = orders?.filter(o => 
    o.customerName.toLowerCase().includes(search.toLowerCase()) || 
    String(o.id).includes(search)
  ) || [];

  return (
    <Layout title="Live Operations">
      <div className="mb-8">
        <h2 className="text-2xl font-black tracking-tight text-white mb-2 uppercase">Order Orchestration</h2>
        <p className="text-slate-500 text-sm font-medium">Managing {filteredOrders.length} live sessions across 4 delivery zones</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-6 mb-8 p-4 bg-slate-900/40 rounded-3xl border border-white/5 backdrop-blur-md">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
          <input 
            placeholder="Search by customer, ID, or phone..." 
            className="w-full pl-12 pr-4 py-3 bg-slate-950/50 rounded-2xl border border-white/5 text-white outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all text-sm font-medium placeholder:text-slate-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-2xl border-white/5 bg-slate-900/50 hover:bg-slate-800 text-white font-bold h-12 px-6">
            <Filter className="w-4 h-4 mr-2" /> Segments
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 font-black text-xs uppercase tracking-widest h-12 px-8 shadow-xl shadow-orange-500/20 border-none">
                <Plus className="w-5 h-5 mr-2" /> Deploy Order
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-white/10 text-white max-w-lg">
               <DialogHeader>
                 <DialogTitle className="text-2xl font-black uppercase tracking-tighter">Initialize New Session</DialogTitle>
               </DialogHeader>
               <div className="space-y-6 py-8">
                 <div className="p-6 rounded-3xl bg-orange-500/5 border border-orange-500/10">
                   <h4 className="text-orange-500 font-black text-xs uppercase tracking-widest mb-2">Simulated Initialization</h4>
                   <p className="text-slate-400 text-sm leading-relaxed">This will inject a high-priority order into the system with pre-calculated items for demonstration purposes.</p>
                 </div>
                 <Button 
                   onClick={() => {
                     createOrder.mutate({
                       customerName: "VIP Table 4",
                       totalAmount: 8550,
                       items: [
                         { menuItemId: 1, quantity: 2, name: "Ribeye Steak", price: 3500 },
                         { menuItemId: 2, quantity: 1, name: "Cabernet Sauvignon", price: 1550 }
                       ],
                       status: "pending"
                     });
                   }}
                   disabled={createOrder.isPending} 
                   className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 font-black uppercase tracking-[0.2em]"
                 >
                   {createOrder.isPending ? "Configuring..." : "Launch Order"}
                 </Button>
               </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Orders Grid/Table Wrapper */}
      <div className="glass-card overflow-hidden rounded-[2.5rem]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-slate-500 uppercase tracking-[0.2em] text-[10px] font-black">
                <th className="px-8 py-6">ID / Protocol</th>
                <th className="px-8 py-6">Identity</th>
                <th className="px-8 py-6">Payload</th>
                <th className="px-8 py-6 text-right">Value</th>
                <th className="px-8 py-6">System State</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                <tr><td colSpan={6} className="px-8 py-16 text-center text-slate-500 font-bold uppercase tracking-widest">Scanning Grid...</td></tr>
              ) : filteredOrders.length === 0 ? (
                <tr><td colSpan={6} className="px-8 py-16 text-center text-slate-500 font-bold uppercase tracking-widest">No active protocols found</td></tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1">
                        <span className="font-mono font-black text-white text-base">#{order.id}</span>
                        <span className="text-[10px] uppercase font-bold text-slate-600">RT-OS-v4</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center font-black text-xs text-slate-500">
                          {order.customerName.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-white text-base">{order.customerName}</span>
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Verified User</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-slate-300">{(order.items as any[]).length} Units</span>
                        <div className="flex gap-1">
                          {(order.items as any[]).slice(0, 2).map((item, idx) => (
                            <Badge key={idx} variant="outline" className="bg-white/5 border-white/10 text-[9px] py-0 px-2 h-4 text-slate-400">{item.name}</Badge>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <span className="text-lg font-black text-white tracking-tighter">
                        ${(order.totalAmount / 100).toFixed(2)}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        {order.status === 'pending' && (
                          <Button 
                            size="sm"
                            onClick={() => updateStatus.mutate({ id: order.id, status: 'preparing' })}
                            className="bg-blue-600 hover:bg-blue-500 text-white font-bold h-9 px-4 rounded-xl"
                          >
                            Execute
                          </Button>
                        )}
                        {order.status === 'preparing' && (
                          <Button 
                            size="sm"
                            onClick={() => updateStatus.mutate({ id: order.id, status: 'ready' })}
                            className="bg-teal-600 hover:bg-teal-500 text-white font-bold h-9 px-4 rounded-xl"
                          >
                            Complete
                          </Button>
                        )}
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white/10">
                              <MoreVertical className="w-4 h-4 text-slate-400" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-slate-900 border-white/10 text-white rounded-2xl p-2 min-w-[160px]">
                            <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-3 py-2">Quick Actions</DropdownMenuLabel>
                            <DropdownMenuItem className="rounded-xl hover:bg-white/10 cursor-pointer gap-3 py-3 px-3">
                              <ExternalLink className="w-4 h-4 text-slate-400" /> <span className="text-xs font-bold">Open Log</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="rounded-xl hover:bg-white/10 cursor-pointer gap-3 py-3 px-3">
                              <Printer className="w-4 h-4 text-slate-400" /> <span className="text-xs font-bold">Print Ticket</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-white/5 mx-2 my-1" />
                            <DropdownMenuItem className="rounded-xl hover:bg-red-500/20 text-red-500 cursor-pointer gap-3 py-3 px-3">
                              <Trash2 className="w-4 h-4" /> <span className="text-xs font-bold">Abort Order</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

