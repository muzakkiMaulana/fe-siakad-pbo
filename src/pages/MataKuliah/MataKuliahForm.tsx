import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMatakuliah, getMatakuliahByKode, updateMatakuliah } from '@/services/api';
import type { MataKuliahType } from '@/types/MataKuliah';
import Alert from '@/components/Alert';
import { isApiErrorType } from '@/types/Api';
import { useParams, useLocation } from 'react-router-dom';
import { useToast } from '@/components/toast/ToastContext';



const initialForm: MataKuliahType = {
    kode: '',
    nama: '',
    jurusan: '',
    semester: '',
    sks: 1,
};

export default function MataKuliahForm() {
    const { id } = useParams();
    const { showToast } = useToast();

    const location = useLocation();
    const isEdit = location.pathname.includes('/edit');

    const [form, setForm] = useState<MataKuliahType>(initialForm);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    // handling untuk edit
    useEffect(() => {
        if (isEdit && id) {
            getMatakuliahByKode(id)
                .then((res) => setForm(res.data as MataKuliahType))
                .finally(() => setLoading(false));
        }
    }, [isEdit, id]);


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === 'sks' ? parseInt(value) : value,
        } as MataKuliahType));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isEdit && id) {
                await updateMatakuliah(form.kode, form).then(() => {
                    showToast({
                        message: 'Save data Success',
                        type: 'success'
                    })
                })
            } else {
                await createMatakuliah(form);
            }
            navigate('/matakuliah');
        } catch (err: unknown) {
            let message = 'Gagal menyimpan data Matakuliah';
            if (isApiErrorType(err)) {
                const msg = err.response.data.message;
                message = Array.isArray(msg) ? msg.join(', ') : msg;
            }
            setErrorMessage(message);
            console.log(err)
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded shadow mt-6">
            <h1 className="text-2xl font-bold mb-6">Tambah Matakuliah</h1>
            {errorMessage && (
                <Alert
                    message={errorMessage}
                    type="error"
                    onClose={() => setErrorMessage(null)}
                />
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium mb-1">Kode</label>
                    <input
                        name="kode"
                        type="text"
                        value={form.kode}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded bg-white"
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
                        className="w-full px-3 py-2 border rounded bg-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">SKS</label>
                    <input name="sks"
                        type="number"
                        value={form.sks}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded bg-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Semester</label>
                    <input
                        name="semester"
                        type="text"
                        value={form.semester}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded bg-white"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Jurusan</label>
                    <input
                        name="jurusan"
                        type="text"
                        value={form.jurusan}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded bg-white"
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
                        onClick={() => navigate('/matakuliah')}
                        className="text-sm text-white hover:underline bg-red-600"
                    >
                        Batal / Kembali
                    </button>
                </div>
            </form>
        </div>
    );
}
