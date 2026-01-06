import { Layout } from "@/components/Layout";
import { useMenu, useCreateMenuItem } from "@/hooks/use-menu";
import { Plus, Edit2, Image as ImageIcon, Search, Filter, MoreHorizontal, Zap, Star, LayoutGrid, List } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function MenuManagement() {
  const { data: menuItems, isLoading } = useMenu();
  const createItem = useCreateMenuItem();
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "main",
    description: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createItem.mutate({
      name: formData.name,
      price: parseInt(formData.price) * 100,
      category: formData.category,
      description: formData.description,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500", 
      isAvailable: true,
      isPopular: false
    }, {
      onSuccess: () => {
        setIsOpen(false);
        setFormData({ name: "", price: "", category: "main", description: "" });
      }
    });
  };

  const filteredItems = menuItems?.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <Layout title="Inventory & Catalog">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-white uppercase">Culinary Registry</h2>
          <p className="text-slate-500 text-sm font-medium">Managing {filteredItems.length} active SKUs across 4 categories</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="flex bg-slate-900/50 p-1 rounded-2xl border border-white/5">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setView('grid')}
              className={`rounded-xl px-4 ${view === 'grid' ? 'bg-primary text-white hover:bg-primary' : 'text-slate-500'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setView('list')}
              className={`rounded-xl px-4 ${view === 'list' ? 'bg-primary text-white hover:bg-primary' : 'text-slate-500'}`}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="flex-1 md:flex-none rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 font-black text-xs uppercase tracking-widest h-11 px-8 shadow-xl shadow-orange-500/20 border-none">
                <Plus className="w-4 h-4 mr-2" /> Add SKU
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border-white/10 text-white max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black uppercase tracking-tighter">Register New Item</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Designation</label>
                  <Input 
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="h-12 bg-slate-950/50 border-white/5 rounded-2xl text-white placeholder:text-slate-700 focus:ring-primary/10" 
                    placeholder="e.g. Signature Truffle Burger" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Value (USD)</label>
                    <Input 
                      required
                      type="number"
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: e.target.value})}
                      className="h-12 bg-slate-950/50 border-white/5 rounded-2xl text-white placeholder:text-slate-700 focus:ring-primary/10" 
                      placeholder="15.00" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Classification</label>
                    <select 
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                      className="w-full h-12 bg-slate-950/50 border border-white/5 rounded-2xl text-white outline-none px-4 text-sm font-medium appearance-none focus:ring-4 focus:ring-primary/10"
                    >
                      <option value="main">Main Course</option>
                      <option value="starter">Starter</option>
                      <option value="dessert">Dessert</option>
                      <option value="drink">Drink</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Technical Notes</label>
                  <textarea 
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full min-h-[100px] bg-slate-950/50 border border-white/5 rounded-2xl text-white outline-none p-4 text-sm font-medium placeholder:text-slate-700 focus:ring-4 focus:ring-primary/10" 
                    placeholder="Ingredients, preparation time, allergen warnings..." 
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={createItem.isPending}
                  className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20"
                >
                  {createItem.isPending ? "Syncing..." : "Finalize Entry"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search registry..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 h-12 bg-slate-900/40 border-white/5 rounded-2xl text-white placeholder:text-slate-700 focus:ring-primary/10"
          />
        </div>
        <Button variant="outline" className="h-12 px-6 rounded-2xl border-white/5 bg-slate-900/50 text-white font-bold">
          <Filter className="w-4 h-4 mr-2" /> All Categories
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-20 text-slate-500 font-black uppercase tracking-widest">Scanning Registry...</div>
      ) : (
        <>
          {view === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredItems.map((item) => (
                <div key={item.id} className="glass-card group relative flex flex-col overflow-hidden rounded-[2.5rem]">
                  <div className="aspect-square w-full bg-slate-950 relative overflow-hidden">
                    <img 
                      src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop"} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                    />
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <Badge className="bg-black/60 backdrop-blur-md border-none px-3 py-1 text-sm font-black text-white">
                        ${(item.price / 100).toFixed(2)}
                      </Badge>
                      {item.isPopular && (
                        <Badge className="bg-orange-500 border-none px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                          <Zap className="w-3 h-3 mr-1 fill-current" /> Hot
                        </Badge>
                      )}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-end">
                      <Button size="icon" variant="ghost" className="bg-white/10 hover:bg-white text-white hover:text-black rounded-xl">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-black text-white text-lg tracking-tight group-hover:text-primary transition-colors">{item.name}</h3>
                    </div>
                    <p className="text-sm text-slate-500 font-medium line-clamp-2 mb-6 leading-relaxed flex-1">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="border-white/5 bg-white/5 text-slate-400 text-[10px] font-black uppercase tracking-widest px-3">
                        {item.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-orange-500 fill-current" />
                        <span className="text-xs font-black text-white">4.9</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card rounded-[2.5rem] overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                    <th className="px-8 py-6">Item Designation</th>
                    <th className="px-8 py-6">Classification</th>
                    <th className="px-8 py-6">Stock Status</th>
                    <th className="px-8 py-6 text-right">Value</th>
                    <th className="px-8 py-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredItems.map(item => (
                    <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <img src={item.image || ""} className="w-12 h-12 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all" />
                          <div>
                            <div className="font-bold text-white">{item.name}</div>
                            <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest">SKU: {item.id}00X</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <Badge variant="outline" className="border-white/10 text-slate-400 uppercase text-[9px] font-black">{item.category}</Badge>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">In Stock</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <span className="font-black text-white">${(item.price / 100).toFixed(2)}</span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-white/10 text-slate-500 hover:text-primary">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </Layout>
  );
}

