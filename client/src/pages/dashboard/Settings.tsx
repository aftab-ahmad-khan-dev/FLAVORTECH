import { Layout } from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export default function Settings() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <Layout title="Settings">
      <div className="max-w-2xl space-y-8">
        
        {/* Profile Section */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-4">Profile</h3>
          <div className="flex items-center gap-6">
            <img src={user?.avatar} alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-primary/20" />
            <div>
              <p className="font-bold text-xl">{user?.name}</p>
              <p className="text-muted-foreground">{user?.email}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase">
                {user?.role}
              </span>
            </div>
          </div>
        </div>

        {/* Theme Section */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold mb-4">Appearance</h3>
          <div className="grid grid-cols-3 gap-4">
            <button 
              onClick={() => setTheme("light")}
              className={`p-4 rounded-xl border-2 transition-all ${theme === 'light' ? 'border-primary bg-primary/5' : 'border-transparent bg-muted'}`}
            >
              <div className="w-full h-24 bg-white rounded-lg mb-2 shadow-sm border border-gray-200"></div>
              <span className="font-medium text-sm">Light</span>
            </button>
            <button 
              onClick={() => setTheme("dark")}
              className={`p-4 rounded-xl border-2 transition-all ${theme === 'dark' ? 'border-primary bg-primary/5' : 'border-transparent bg-muted'}`}
            >
              <div className="w-full h-24 bg-gray-900 rounded-lg mb-2 shadow-sm border border-gray-800"></div>
              <span className="font-medium text-sm">Dark</span>
            </button>
            <button 
              onClick={() => setTheme("gradient")}
              className={`p-4 rounded-xl border-2 transition-all ${theme === 'gradient' ? 'border-primary bg-primary/5' : 'border-transparent bg-muted'}`}
            >
              <div className="w-full h-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-lg mb-2 shadow-sm border border-gray-700"></div>
              <span className="font-medium text-sm">Premium</span>
            </button>
          </div>
        </div>

      </div>
    </Layout>
  );
}
