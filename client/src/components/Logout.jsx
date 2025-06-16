import { LogOut } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

const Logout = () => {
    const handleLogout = () => {
        localStorage.removeItem('user');
        location.href = '/'
    }
  return (
    <div>
      <Button variant="destructive" onClick={handleLogout} className='group bg-red-700' title='Logout'>
        <LogOut size={16} className="border-accent group-hover:text-black" />
      </Button>
    </div>
  );
};

export default Logout;
