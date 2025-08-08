import { getCurrentUser } from "@/lib/actions/users";
import Sidebar from "./Sidebar";

export default async function SidebarWrapper() {
  const currentUser = await getCurrentUser();

  return <Sidebar currentUser={currentUser} />;
}
