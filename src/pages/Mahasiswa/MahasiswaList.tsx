import { useEffect, useState } from 'react';
import { getMahasiswa } from '@/services/api';
import type { MahasiswaType } from '@/types/Mahasiswa';

export default function MahasiswaList() {
    const [data, setData] = useState<MahasiswaType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        getMahasiswa()
            .then((res) => setData(res.data as MahasiswaType[]))
            .catch(() => alert('Gagal mengambil data mahasiswa'));
    }, []);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const pageData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="w-full">
            <div className="overflow-x-auto rounded-lg shadow border">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100 text-gray-700 uppercase">
                        <tr>
                            <th className="px-4 py-3 border">NIM</th>
                            <th className="px-4 py-3 border">Nama</th>
                            <th className="px-4 py-3 border">Program Studi</th>
                            <th className="px-4 py-3 border">Angkatan</th>
                            <th className="px-4 py-3 border">Email</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-800">
                        {pageData.map((mhs) => (
                            <tr key={mhs.nim} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border">{mhs.nim}</td>
                                <td className="px-4 py-2 border">{mhs.nama}</td>
                                <td className="px-4 py-2 border">{mhs.prodi}</td>
                                <td className="px-4 py-2 border text-center">{mhs.angkatan}</td>
                                <td className="px-4 py-2 border">{mhs.email}</td>
                            </tr>
                        ))}
                        {pageData.length === 0 && (
                            <tr>
                                <td colSpan={5} className="text-center py-4 text-gray-500">
                                    Tidak ada data mahasiswa.
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
        </div>
    );
}