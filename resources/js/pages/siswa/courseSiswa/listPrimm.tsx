import React from "react";
import { Link, Head } from '@inertiajs/react';
import { Lock, CheckCircle2, Monitor, ChevronRight } from "lucide-react";
import AppLayout from '@/layouts/app-layout';

export default function ListPrimm({ course, progress }: any) {
    const steps = ["predict", "run", "investigate", "modify", "make"];

    return (
        <AppLayout breadcrumbs={[{ title: course.title, href: '#' }]}>
            <Head title={`Daftar Tahap - ${course.title}`} />
            
            <div className="w-full mx-auto p-6 md:p-12">
                <div className="mb-10">
                    <h1 className="text-3xl font-black text-black uppercase tracking-tighter">
                        Materi : <span className="text-blue-600">{course.title}</span>
                    </h1>
                    <p className="text-gray-500 mt-2 font-medium">
                        Selesaikan tahapan secara berurutan untuk menguasai materi ini.
                    </p>
                </div>
                
                <div className="space-y-4">
                    {steps.map((step, index) => {
                        const isFirstStep = index === 0;
                        const previousStep = steps[index - 1];
                        const isUnlocked = isFirstStep || progress[previousStep];
                        const isCompleted = progress[step];

                        return (
                            <div 
                                key={step} 
                                className={`group relative flex items-center p-5 rounded-[25px] border-2 transition-all duration-300 ${
                                    isUnlocked 
                                    ? 'border-[#F7CA89] bg-white shadow-sm hover:shadow-md' 
                                    : 'border-grey-100 bg-gray-50 opacity-70'
                                }`}
                            >
                                {/* Ikon Status (Monitor/Laptop) */}
                                <div className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                                    isCompleted 
                                    ? 'bg-emerald-500 text-white' 
                                    : isUnlocked 
                                    ? 'bg-[#F7CA89]/10 text-[#F7CA89]' 
                                    : 'bg-gray-200 text-gray-400'
                                }`}>
                                    {isCompleted ? (
                                        <CheckCircle2 className="w-7 h-7" />
                                    ) : isUnlocked ? (
                                        <Monitor className="w-7 h-7" />
                                    ) : (
                                        <Lock className="w-6 h-6" />
                                    )}
                                </div>

                                <div className="ml-6 flex-grow">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">
                                            Tahap 0{index + 1}
                                        </span>
                                        <h3 className={`text-lg font-bold uppercase tracking-tight ${
                                            isUnlocked ? 'text-gray-800' : 'text-gray-400'
                                        }`}>
                                            {step}
                                        </h3>
                                    </div>
                                </div>

                                <div className="ml-4">
                                    {isUnlocked ? (
                                        <Link 
                                            href={`/siswa/courseSiswa/showPrimm/${course.id}/${step}`}
                                            className={`flex items-center justify-center w-12 h-12 rounded-full transition-all ${
                                                isCompleted 
                                                ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' 
                                                : 'bg-[#0F828C] text-white hover:bg-[#0d6d74] shadow-lg shadow-emerald-100'
                                            }`}
                                        >
                                            <ChevronRight className="w-6 h-6" />
                                        </Link>
                                    ) : (
                                        <div className="w-12 h-12 flex items-center justify-center text-gray-300">
                                            <Lock className="w-5 h-5" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AppLayout>
    );
}