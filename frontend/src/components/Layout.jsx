import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../contexts/authContext";


export default function Layout() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {isAuthenticated && <Navbar onLogout={logout} />}
      
      <main className="flex-grow container mx-auto ">
        <Outlet />
      </main>
      
    
    </div>
  );
}