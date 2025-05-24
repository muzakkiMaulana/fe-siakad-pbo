import { Outlet, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';


export default function MataKuliahLayout() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Manajemen Mata Kuliah</h1>
                <button
                    onClick={() => navigate('/matakuliah/new')}
                    className="bg-indigo-600 text-white px-4 py-2 rounded shadow flex items-center gap-1"
                >
                    <Plus className="text-white" size={18} /> Mata Kuliah Baru
                </button>
            </div>
            <Outlet />
        </div>
    );
}