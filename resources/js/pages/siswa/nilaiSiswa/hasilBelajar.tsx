import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface Result {
    id: number;
    materi_title: string;
    skor_rata_rata: number;
    fase_progress: string;
    is_pengenalan: boolean;
}

interface Props {
    results: Result[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Beranda', href: '/dashboard' },
    { title: 'Hasil Belajar', href: '/siswa/hasil-belajar' },
];

export default function HasilBelajar({ results }: any) {
    return (
        <AppLayout>
            <div className="p-8 bg-white min-h-screen">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-2xl text-center font-black mb-6 uppercase">Daftar Materi & Hasil Belajar</h1>

                   <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                        <table className="w-full text-left border-collapse">
                            {/* Header Kuning Tetap */}
                            <thead className="bg-[#F7CA89] border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-bold text-slate-700 uppercase">Materi</th>
                                    <th className="px-6 py-4 text-sm font-bold text-slate-700 uppercase text-center">Fase Selesai</th>
                                    <th className="px-6 py-4 text-sm font-bold text-slate-700 uppercase text-center">Nilai Rata-Rata</th>
                                    <th className="px-6 py-4 text-sm font-bold text-slate-700 uppercase text-center">Aksi</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-white/10">
                                {results.map((res: any, index: number) => {
                                    const isEven = index % 2 === 0;
                                    const rowColor = isEven ? 'bg-[#A6D3D0]' : 'bg-[#71A4A1]';

                                    return (
                                        <tr 
                                            key={index} 
                                            className={`${rowColor} transition-colors hover:brightness-95`}
                                        >
                                            <td className="px-6 py-5 font-bold text-white uppercase tracking-tight">
                                                {res.title}
                                            </td>
                                            <td className="px-6 py-5 text-center font-bold text-white">
                                                {res.is_pengenalan ? '-' : res.total_fase}
                                            </td>
                                            <td className="px-6 py-5 text-center font-black text-white">
                                                {res.is_pengenalan ? '-' : res.rata_rata_nilai}
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                {res.id && !res.is_pengenalan ? (
                                                    <Link 
                                                        href={`/siswa/nilaiSiswa/detailHasil/${res.id}`}
                                                        className="bg-white text-slate-800 px-5 py-1.5 rounded-xl text-xs font-black hover:bg-slate-900 hover:text-white transition-all shadow-sm inline-block uppercase"
                                                    >
                                                        Detail Nilai
                                                    </Link>
                                                ) : (
                                                    <span className="text-[10px] font-bold text-white/70 uppercase italic">
                                                        {res.is_pengenalan ? 'Materi Teori' : 'Kosong'}
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}