import { Layout } from "@/components/Layout";
import { MapPin, Phone } from "lucide-react";

export default function DeliveryRiders() {
  const riders = [
    { id: 1, name: "John Doe", status: "busy", deliveries: 12, rating: 4.8 },
    { id: 2, name: "Jane Smith", status: "idle", deliveries: 8, rating: 4.9 },
    { id: 3, name: "Mike Johnson", status: "offline", deliveries: 0, rating: 4.7 },
  ];

  return (
    <Layout title="Delivery & Riders">
      <div className="grid gap-6">
        {riders.map((rider) => (
          <div key={rider.id} className="glass-card p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center font-bold text-lg">
                {rider.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-lg">{rider.name}</h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className={`w-2 h-2 rounded-full ${
                    rider.status === 'busy' ? 'bg-red-500' : 
                    rider.status === 'idle' ? 'bg-green-500' : 'bg-gray-500'
                  }`} />
                  {rider.status.charAt(0).toUpperCase() + rider.status.slice(1)}
                </div>
              </div>
            </div>
            
            <div className="flex gap-8 text-center">
              <div>
                <p className="text-sm text-muted-foreground">Deliveries</p>
                <p className="font-bold text-lg">{rider.deliveries}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rating</p>
                <p className="font-bold text-lg text-primary">{rider.rating}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="p-2 rounded-lg bg-muted hover:bg-muted/80">
                <MapPin className="w-5 h-5 text-muted-foreground" />
              </button>
              <button className="p-2 rounded-lg bg-muted hover:bg-muted/80">
                <Phone className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
