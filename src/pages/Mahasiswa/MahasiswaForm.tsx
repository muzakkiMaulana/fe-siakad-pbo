import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMahasiswa } from '@/services/api';
import type { MahasiswaType } from '@/types/Mahasiswa';

const initialForm: MahasiswaType = {
    nim: '',
    nama: '',
    prodi: '',
    angkatan: new Date().getFullYear(),
    email: '',
};

export default function MahasiswaForm() {
    const [form, setForm] = useState<MahasiswaType>(initialForm);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === 'angkatan' ? parseInt(value) : value,
        } as MahasiswaType));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createMahasiswa(form);
            navigate('/mahasiswa');
        } catch (err) {
            alert('Gagal menyimpan data mahasiswa');
            console.log(err)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded shadow mt-6">
            <h1 className="text-2xl font-bold mb-6">Tambah Mahasiswa</h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium mb-1">NIM</label>
                    <input
                        name="nim"
                        type="text"
                        value={form.nim}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Nama</label>
                    <input
                        name="nama"
                        type="text"
                        value={form.nama}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Program Studi</label>
                    <input name="prodi"
                        type="text"
                        value={form.prodi}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Angkatan</label>
                    <input
                        name="angkatan"
                        type="number"
                        value={form.angkatan}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>

                <div className="md:col-span-2 flex justify-between mt-4">
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white px-6 py-2 rounded"
                        disabled={loading}
                    >
                        {loading ? 'Menyimpan...' : 'Simpan'}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/mahasiswa')}
                        className="text-sm text-gray-500 hover:underline"
                    >
                        Batal / Kembali
                    </button>
                </div>
            </form>
        </div>
    );
}
