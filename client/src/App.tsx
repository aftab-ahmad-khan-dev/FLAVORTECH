import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";

import LandingWithLogin from "@/pages/LandingWithLogin";
import Overview from "@/pages/dashboard/Overview";
import Orders from "@/pages/dashboard/Orders";
import MenuManagement from "@/pages/dashboard/MenuManagement";
import SalesRevenue from "@/pages/dashboard/SalesRevenue";
import CustomerInsights from "@/pages/dashboard/CustomerInsights";
import DeliveryRiders from "@/pages/dashboard/DeliveryRiders";
import StaffOperations from "@/pages/dashboard/StaffOperations";
import Promotions from "@/pages/dashboard/Promotions";
import Settings from "@/pages/dashboard/Settings";
import NotFound from "@/pages/not-found";

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingWithLogin} />
      
      {/* Protected Dashboard Routes */}
      <Route path="/dashboard">
        <ProtectedRoute component={Overview} />
      </Route>
      <Route path="/dashboard/orders">
        <ProtectedRoute component={Orders} />
      </Route>
      <Route path="/dashboard/menu">
        <ProtectedRoute component={MenuManagement} />
      </Route>
      <Route path="/dashboard/sales">
        <ProtectedRoute component={SalesRevenue} />
      </Route>
      <Route path="/dashboard/customers">
        <ProtectedRoute component={CustomerInsights} />
      </Route>
      <Route path="/dashboard/delivery">
        <ProtectedRoute component={DeliveryRiders} />
      </Route>
      <Route path="/dashboard/staff">
        <ProtectedRoute component={StaffOperations} />
      </Route>
      <Route path="/dashboard/promos">
        <ProtectedRoute component={Promotions} />
      </Route>
      <Route path="/dashboard/settings">
        <ProtectedRoute component={Settings} />
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Toaster />
          <Router />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
