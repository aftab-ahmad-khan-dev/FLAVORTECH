import { Layout } from "@/components/Layout";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const retentionData = [
  { name: '1st Order', value: 100 },
  { name: '2nd Order', value: 45 },
  { name: '3rd Order', value: 30 },
  { name: '4th Order', value: 20 },
  { name: 'Loyal', value: 15 },
];

export default function CustomerInsights() {
  return (
    <Layout title="Customer Insights">
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold mb-6">Retention Funnel</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={retentionData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={100} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: 'transparent' }} />
              <Bar dataKey="value" fill="hsl(var(--secondary))" radius={[0, 4, 4, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  );
}
