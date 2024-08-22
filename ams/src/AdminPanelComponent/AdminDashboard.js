import React, { useState, createContext, useContext } from "react";
import { ChevronFirst } from "lucide-react";
import { ChevronLast } from "lucide-react";
import adminlogo from "../assests/admin logo.png";
import AttendanceComponent from "./AttendanceComponent";




const AdminDashboardContext = createContext();

function AdminDashboard({ children }) {

    const [expanded, setExpanded] = useState(true)
    return (
        <>
            <aside className="h-screen">
                <nav className="h-full flex flex-col bg-blue border-r shadow-sm">
                    <div className="p-4 pb-2 flex justify-between items-center">
                        <img src={adminlogo} className={`overflow-hidden transition-all  ${expanded ? "w-10" : "w-0"}`} /><span className={`text-black-1200 font-bold overflow-hidden transition-all    ${expanded ? "w-40" : "w-0"}`}>Admin Dashboard</span>
                        <button onClick={() => setExpanded((curr) => !curr)} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
                            {expanded ? <ChevronFirst /> : <ChevronLast />}
                        </button>


                    </div>

                    <AdminDashboardContext.Provider value={{ expanded }}>
                        <ul className="flex-1 px-3">{children}</ul>
                    </AdminDashboardContext.Provider>



                </nav>

            </aside>
        </>
    )
}

export default AdminDashboard;

export function AdminDashboardItem({ icon, text, active, alert }) {
    const { expanded } = useContext(AdminDashboardContext)
    return (
        <>
            <div>
                <li className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active ? "bg-gradient-to-tr from-blue-200 to-blue-100 text-blue-900" : "hover:bg-blue-50 text-black-600"}`} >
                    {icon}
                    <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>

                    {alert && (
                        <div className={`absolute right-2 w-2 h-2 rounded bg-blue-400 ${expanded ? "" : "top-2"} `}></div>
                    )}
                    {!expanded && (
                        <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-blue-100 text-blue-600 text-sm invisible opacity-20-translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 `}>{text}</div>
                    )}
                </li>
            </div>

        </>






    )
}