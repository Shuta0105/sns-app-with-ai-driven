import SidebarWrapper from "@/components/sidebar/SidebarWrapper";
import Timeline from "@/components/timeline/Timeline";
import RightSidebar from "@/components/sidebar/RightSidebar";
import MobileNavigation from "@/components/mobile/MobileNavigation";
import MobileHeader from "@/components/mobile/MobileHeader";
import { getPosts } from "@/lib/server-data";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto flex">
          {/* Left Sidebar */}
          <div className="w-64 fixed h-full">
            <SidebarWrapper />
          </div>

          {/* Main Content */}
          <div className="flex-1 ml-64 max-w-2xl border-x border-gray-800">
            <Timeline posts={posts} />
          </div>

          {/* Right Sidebar */}
          <div className="w-80 ml-8 h-full overflow-y-auto">
            <RightSidebar />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col h-screen">
        {/* Mobile Header */}
        <MobileHeader />

        {/* Mobile Main Content */}
        <div className="flex-1 overflow-y-auto pb-16">
          <Timeline posts={posts} />
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </div>
  );
}
