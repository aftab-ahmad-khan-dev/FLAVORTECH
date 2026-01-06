import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useStatsOverview() {
  return useQuery({
    queryKey: [api.stats.overview.path],
    queryFn: async () => {
      const res = await fetch(api.stats.overview.path);
      if (!res.ok) throw new Error("Failed to fetch stats");
      return api.stats.overview.responses[200].parse(await res.json());
    },
  });
}
