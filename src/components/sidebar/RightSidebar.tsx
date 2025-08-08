import { Suspense } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getTrends, getSuggestedUsers } from "@/lib/server-data";
import RightSidebarContent from "@/components/sidebar/RightSidebarContent";

export default async function RightSidebar() {
  const [trends, suggestedUsers] = await Promise.all([
    getTrends(),
    getSuggestedUsers(),
  ]);

  return (
    <div className="p-4 space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
        <Input
          placeholder="Search"
          className="bg-gray-900 border-gray-800 rounded-full pl-12 py-3 focus:bg-gray-800 focus:border-blue-500"
        />
      </div>

      <Suspense
        fallback={<div className="p-4">Loading sidebar content...</div>}
      >
        <RightSidebarContent trends={trends} suggestedUsers={suggestedUsers} />
      </Suspense>
    </div>
  );
}
