import { useEffect, useState } from 'react';
import { getMatakuliah, deleteMatakuliah } from '@/services/api';
import type { MataKuliahType } from '@/types/MataKuliah';
import { Pencil, Trash2, Loader2 } from 'lucide-react';
import Modal from '@/components/Modal';
import { useNavigate } from 'react-router-dom';
import { isApiErrorType } from '@/types/Api';
import { useToast } from '@/components/toast/ToastContext';


export default function MataKuliahList() {
    const { showToast } = useToast();
    const [data, setData] = useState<MataKuliahType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteItem, setDeleteItem] = useState('');
    const [loadingDelete, setLoadingDelete] = useState(false);


    const navigate = useNavigate();
    const fetchData = async () => {
        try {
            const res = await getMatakuliah();
            setData(res.data);
        } catch {
            alert('Gagal mengambil data Mata Kuliah');
        }
    };



    useEffect(() => {
        fetchData()
    }, []);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const pageData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleDelete = async () => {
        if (!deleteItem) return;
        setLoadingDelete(true);
        try {
            await deleteMatakuliah(deleteItem);
            setData((prev) => prev.filter((m) => m.kode !== deleteItem));
            setIsModalOpen(false);
            fetchData()
            showToast({ message: 'Berhasil menghapus data', type: 'success' });
        } catch (err: unknown) {
            let message = 'Gagal menyimpan data Matakuliah';
            if (isApiErrorType(err)) {
                const msg = err.response.data.message;
                message = Array.isArray(msg) ? msg.join(', ') : msg;
            }
            fetchData()
            showToast({ message: message, type: 'error' });
        } finally {
            setLoadingDelete(false);
        }
    };

    const confirmDelete = (kode: string) => {
        setIsModalOpen(true)
        setDeleteItem(kode)
    }


    return (
        <div className="w-full">
            <div className="overflow-x-auto rounded-lg shadow border">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100 text-gray-700 uppercase">
                        <tr>
                            <th className="px-4 py-3 border">Kode</th>
                            <th className="px-4 py-3 border">Nama</th>
                            <th className="px-4 py-3 border">Jurusan</th>
                            <th className="px-4 py-3 border">Semester</th>
                            <th className="px-4 py-3 border">SKS</th>
                            <th className="px-4 py-3 border text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-800">
                        {pageData.map((matkul) => (
                            <tr key={matkul.kode} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border">{matkul.kode}</td>
                                <td className="px-4 py-2 border">{matkul.nama}</td>
                                <td className="px-4 py-2 border">{matkul.jurusan}</td>
                                <td className="px-4 py-2 border text-center">{matkul.semester}</td>
                                <td className="px-4 py-2 border">{matkul.sks}</td>
                                <td className="px-4 py-2 border text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => navigate(`/matakuliah/edit/${matkul.kode}`)}
                                            className="text-indigo-600 hover:text-indigo-800"
                                            title="Edit"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            onClick={() => confirmDelete(matkul.kode)}
                                            className="text-red-600 hover:text-red-800"
                                            title="Hapus"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {pageData.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center py-4 text-gray-500">
                                    Tidak ada data Mata Kuliah.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-end items-center gap-2 mt-4">
                {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-8 h-8 rounded ${currentPage === i + 1
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white text-gray-800 border'
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            {/* Modal Konfirmation */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Konfirmasi Hapus"
                footer={
                    <>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
                        >
                            Batal
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={loadingDelete}
                            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 flex items-center gap-2"
                        >
                            {loadingDelete && <Loader2 size={16} className="animate-spin" />}
                            Hapus
                        </button>
                    </>
                }
            >
                Apakah kamu yakin ingin menghapus item ini?
            </Modal>
        </div>
    );
}