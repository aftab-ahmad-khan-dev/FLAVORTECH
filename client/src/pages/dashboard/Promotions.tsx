import { Layout } from "@/components/Layout";

export default function Promotions() {
  return (
    <Layout title="Promotions">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="glass-card p-6 border-l-4 border-l-primary">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-xl">SUMMER20</h3>
              <p className="text-sm text-muted-foreground mt-1">20% off all drinks</p>
            </div>
            <span className="px-2 py-1 rounded text-xs font-bold bg-green-500/10 text-green-500">ACTIVE</span>
          </div>
          <div className="mt-4 pt-4 border-t border-border/50 flex justify-between text-sm">
            <span className="text-muted-foreground">Used: 145 times</span>
            <span className="font-bold">Save $245</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
