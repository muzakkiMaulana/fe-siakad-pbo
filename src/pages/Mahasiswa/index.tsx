import { Outlet, useNavigate } from 'react-router-dom';

export default function MahasiswaLayout() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Manajemen Mahasiswa</h1>
                <button
                    onClick={() => navigate('/mahasiswa/new')}
                    className="bg-indigo-600 text-white px-4 py-2 rounded shadow"
                >
                    ➕ Mahasiswa Baru
                </button>
            </div>

            {/* Halaman yang di-nest akan ditampilkan di sini */}
            <Outlet />
        </div>
    );
}