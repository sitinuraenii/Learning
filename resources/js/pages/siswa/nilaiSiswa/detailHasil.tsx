import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { ArrowLeft, MessageCircle, Code2, Trophy } from "lucide-react";

export default function DetailHasil({ reports, course_title }: any) {
    return (
        <AppLayout>
            <Head title={`Detail - ${course_title}`} />
            
            <div className="p-8 bg-slate-50 min-h-screen">
                <div className="max-w-4xl mx-auto">
                    
                    <div className="mb-8 flex items-center justify-between">
                        <Link href="/siswa/nilaiSiswa/hasilBelajar" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-all">
                            <ArrowLeft size={20} />
                            <span className="font-bold uppercase tracking-tight">Kembali</span>
                        </Link>
                        <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
                            {course_title}
                        </h1>
                    </div>

                    <div className="space-y-10">
                        {reports.map((item: any, index: number) => (
                            <div key={index} className="bg-white border border-slate-200 rounded-[40px] shadow-sm overflow-hidden transition-all hover:shadow-md">
                                <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                    <div className="flex items-center gap-3">
                                        <span className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-sm">
                                            {index + 1}
                                        </span>
                                        <div>
                                            <h2 className="font-bold text-slate-800 uppercase">Tahap {item.question?.primm?.tahap}</h2>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center border-l border-slate-200 pl-6">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Skor</span>
                                        <span className="text-2xl font-black text-slate-900">{item.skor ?? '0'}</span>
                                    </div>
                                </div>

                                <div className="p-8 space-y-6">
                                    <div>
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Pertanyaan:</h4>
                                        <p className="text-slate-700 font-medium leading-relaxed">
                                            {item.question?.pertanyaan}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Jawaban Kamu:</h4>
                                        <div className="bg-slate-900 rounded-[24px] p-6 relative group border-4 border-slate-800">
                                            <Code2 size={18} className="absolute right-6 top-6 text-slate-600" />
                                            <pre className="text-emerald-400 font-mono text-sm whitespace-pre-wrap leading-relaxed">
                                                {item.jawaban_siswa || '// Tidak ada jawaban'}
                                            </pre>
                                        </div>
                                    </div>

                                    <div className={`rounded-[30px] p-6 ${item.feedback ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-50 text-slate-400 border border-dashed border-slate-200'}`}>
                                        <div className="flex items-start gap-4">
                                            <div className={`p-3 rounded-2xl ${item.feedback ? 'bg-white/20' : 'bg-slate-100'}`}>
                                                <MessageCircle size={20} className={item.feedback ? 'text-white' : 'text-slate-300'} />
                                            </div>
                                            <div>
                                                <h4 className={`text-[10px] font-black uppercase tracking-widest mb-1 ${item.feedback ? 'text-indigo-200' : 'text-slate-400'}`}>
                                                    Feedback Guru
                                                </h4>
                                                <p className={`font-medium ${item.feedback ? 'text-white' : 'italic text-sm'}`}>
                                                    {item.feedback ? `"${item.feedback}"` : "Belum ada feedback untuk jawaban ini."}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}