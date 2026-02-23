import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Monitor } from 'lucide-react';
interface Props {
    auth: {
        user: {
            name: string;
            role: string;
        };
    };
    stats: {
        totalMateri: number;
        totalAktivitas: number;
        progresSiswa: number;
    };
}

export default function DashboardSiswa({ auth, stats }: Props) {

    return (
        <AppLayout breadcrumbs={[{ title: 'Dashboard Siswa', href: '/siswa/dashboard' }]}>
            <Head title="Dashboard Siswa" />

            <div className="p-10 bg-white min-h-screen">
                <div className="mb-10">
                    <h1 className="text-2xl font-medium text-gray-800">
                        Halo, <span className="text-blue-600 font-bold">{auth.user.name}</span>
                    </h1>
                    <p className="text-lg text-gray-700 mt-2">
                        Selamat belajar dan semoga sukses 🚀
                    </p>
                </div>

                <div className="flex gap-6">
                    <div className="w-64 bg-[#B3E5FC] p-6 rounded shadow">
                        <div className="text-5xl text-white">{stats.totalMateri}</div>
                        <div className="text-lg font-bold text-gray-900">Materi</div>
                    </div>

                    <div className="w-full md:w-64 bg-[#F7CA89] p-6 rounded-md shadow-md flex items-center justify-between transition-transform hover:scale-105">
                        <div className="flex flex-col items-center">
                            <Monitor size={48} className="text-gray-700" strokeWidth={1.5} />
                        </div>
                        <div className="text-right">
                            <span className="text-4xl font-normal text-white block leading-none">
                                {stats?.progresSiswa || 0} / {stats?.totalAktivitas || 0}
                            </span>
                            <span className="text-lg font-bold text-gray-900 mt-1 block">Aktivitas</span>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}