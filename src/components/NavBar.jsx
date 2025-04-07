import { Outlet } from "react-router";

export default function NavBar(){
  return (
    <>
      <nav className="text-white flex justify-between items-center m-4 h-20">
        <div className="text-5xl font-medium text-white font-pacifico">
          stories slider
        </div>      
      </nav>
      <Outlet />
    </>
  )
}