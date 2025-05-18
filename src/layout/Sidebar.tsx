import { NavLink } from 'react-router-dom';
import {
    Home, List, Folder, Users, BarChart,
    HelpCircle, MapPin, Settings, BookUser
} from "lucide-react";

const perkuliahan = [
    { label: "Dashboard", icon: Home, path: "/dashboard" },
    { label: "Jadwal", icon: List, path: "/jadwal" },
    { label: "Kehadiran", icon: Folder, path: "/kehadiran" },
    { label: "Nilai", icon: Users, path: "/nilai" },
    { label: "Daftar Kelas Online", icon: BarChart, path: "/kelas-online" },
];

const lainnya = [
    { label: "Persiapan Kuliah", icon: HelpCircle, path: "/persiapan" },
    { label: "Monitoring TA", icon: MapPin, path: "/monitoring" },
    { label: "Pengaturan Akun", icon: Settings, path: "/pengaturan" },
];

const dataMaster = [
    { label: "Mahasiswa", icon: BookUser, path: "/mahasiswa" },
];

function renderMenu(menu: typeof perkuliahan) {
    return menu.map(({ label, icon: Icon, path }) => (
        <NavLink
            to={path}
            key={label}
            className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded transition-all ${isActive
                    ? 'bg-orange-400 text-black font-semibold shadow-md'
                    : 'hover:bg-indigo-700'
                }`
            }
        >
            <Icon size={18} />
            {label}
        </NavLink>
    ));
}

export default function Sidebar() {
    return (
        <aside className="w-64 bg-indigo-900 text-white h-screen flex flex-col justify-between p-4">
            <div>
                <h1 className="text-2xl font-bold mb-6">SYTAMA</h1>

                <div className="space-y-6">
                    <div>
                        <p className="text-sm uppercase text-indigo-300 mb-2">Perkuliahan</p>
                        <nav className="space-y-2">{renderMenu(perkuliahan)}</nav>
                    </div>

                    <div>
                        <p className="text-sm uppercase text-indigo-300 mb-2">Lainnya</p>
                        <nav className="space-y-2">{renderMenu(lainnya)}</nav>
                    </div>

                    <div>
                        <p className="text-sm uppercase text-indigo-300 mb-2">Data Master</p>
                        <nav className="space-y-2">{renderMenu(dataMaster)}</nav>
                    </div>
                </div>
            </div>

            <button className="bg-red-600 w-full py-2 mt-8 rounded">Logout</button>
        </aside>
    );
}