import { Layout } from "@/components/Layout";
import { useStaff } from "@/hooks/use-staff";

export default function StaffOperations() {
  const { data: staff } = useStaff();

  return (
    <Layout title="Staff & Operations">
      <div className="glass-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50 text-xs uppercase font-bold text-muted-foreground">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Rating</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {staff?.map((member) => (
              <tr key={member.id} className="hover:bg-muted/20">
                <td className="px-6 py-4 font-medium">{member.name}</td>
                <td className="px-6 py-4 text-muted-foreground">{member.role}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500">
                    {member.status}
                  </span>
                </td>
                <td className="px-6 py-4">⭐ {member.performanceRating}</td>
              </tr>
            ))}
            {!staff?.length && (
              <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">No staff found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
