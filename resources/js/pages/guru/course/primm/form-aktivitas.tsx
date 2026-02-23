import React, { useState, useEffect, ChangeEvent } from "react";
import { Plus, Trash2, Save, ArrowLeft, Upload, Code2, CheckCircle2, X, Monitor } from "lucide-react"; 
import { Link, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface Soal {
    id: number;
    teks: string;
}

interface BlokAktivitas {
    id: number;
    preview: string | null;
    gambar: File | null;
    link_colab?: string; 
    daftar_soal: Soal[];
}

export default function FormAktivitas({ materi, tahap, primm }: { materi: any; tahap: string; primm?: any }) {
    const { flash } = usePage().props as any;
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);
    
    // 1. Inisialisasi Data dari Relasi Tabel (Bukan lagi JSON tunggal)
    const getInitialData = () => {
        // primm[tahap] sekarang dikirim sebagai Array of Objects oleh Controller
        const rawData = primm?.[tahap.toLowerCase()];
        
        if (!rawData || !Array.isArray(rawData) || rawData.length === 0) {
            return [{ id: Date.now(), preview: null, gambar: null, link_colab: "", daftar_soal: [{ id: Date.now() + 1, teks: "" }] }];
        }

        return rawData.map((d: any) => ({
            id: d.id,
            preview: d.gambar ? `/storage/${d.gambar}` : null,
            gambar: null,
            link_colab: d.link_colab || "",
            // Mengambil data dari relasi 'questions' yang dikirim Laravel
            daftar_soal: d.questions && d.questions.length > 0 
                ? d.questions.map((q: any) => ({ id: q.id, teks: q.pertanyaan }))
                : [{ id: Date.now(), teks: "" }]
        }));
    };

    const [daftarBlok, setDaftarBlok] = useState<BlokAktivitas[]>(getInitialData());
    const namaTahap = tahap.charAt(0).toUpperCase() + tahap.slice(1);

    useEffect(() => {
        if (flash?.success) {
            setShowSuccessMsg(true);
            const timer = setTimeout(() => setShowSuccessMsg(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [flash?.success]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();

        daftarBlok.forEach((blok, index) => {
          
            if (blok.id && blok.id < 1000000000000) {
                formData.append(`blok[${index}][id]`, blok.id.toString());
            }

            formData.append(`blok[${index}][link_colab]`, blok.link_colab || "");

            blok.daftar_soal.forEach((soal, sIndex) => {
                if (soal.teks.trim() !== "") {
                    formData.append(`blok[${index}][pertanyaan][${sIndex}][teks]`, soal.teks);
                    
                    if (soal.id && soal.id < 1000000000000) {
                        formData.append(`blok[${index}][pertanyaan][${sIndex}][id]`, soal.id.toString());
                    }
                }
            });

            // Handle Gambar
            if (blok.gambar instanceof File) {
                formData.append(`gambar_${index}`, blok.gambar);
            } else if (blok.preview) {
                // Jika tidak ganti gambar, kirim path gambar lama agar tidak hilang
                formData.append(`blok[${index}][existing_gambar]`, blok.preview.replace('/storage/', ''));
            }
        });

        router.post(`/guru/course/${materi.id}/primm/${tahap}/store`, formData, {
            forceFormData: true,
            onSuccess: () => {
                // Otomatis pindah ke halaman listPrimm setelah sukses
                router.visit(`/guru/course/primm/list-primm/${materi.id}?judul=${encodeURIComponent(materi.judul)}`);
            }
        });
    };

    // 3. Fungsi Helper (Tambah/Hapus Blok & Soal)
    const tambahBlok = () => {
        setDaftarBlok([...daftarBlok, { 
            id: Date.now(), 
            preview: null, 
            gambar: null, 
            link_colab: "", 
            daftar_soal: [{ id: Date.now() + 1, teks: "" }] 
        }]);
    };

    const hapusBlok = (index: number) => {
        if (daftarBlok.length > 1) {
            setDaftarBlok(daftarBlok.filter((_, i) => i !== index));
        }
    };
    
    const updateLinkColab = (bIndex: number, value: string) => {
        setDaftarBlok(prev => prev.map((blok, i) => 
            i === bIndex ? { ...blok, link_colab: value } : blok
        ));
    };

    const tambahSoal = (bIndex: number) => {
        setDaftarBlok(prev => prev.map((blok, i) => 
            i === bIndex ? { ...blok, daftar_soal: [...blok.daftar_soal, { id: Date.now(), teks: "" }] } : blok
        ));
    };

    const updateTeksSoal = (bIndex: number, sIndex: number, value: string) => {
        setDaftarBlok(prev => prev.map((blok, i) => {
            if (i !== bIndex) return blok;
            const soalBaru = blok.daftar_soal.map((soal, j) => 
                // Pertahankan ID soal agar Laravel tahu soal mana yang sedang diedit
                j === sIndex ? { ...soal, teks: value } : soal
            );
            return { ...blok, daftar_soal: soalBaru };
        }));
    };

    const hapusSoal = (bIndex: number, sIndex: number) => {
        setDaftarBlok(prev => prev.map((blok, i) => {
            if (i !== bIndex) return blok;
            if (blok.daftar_soal.length <= 1) return blok; 
            return { ...blok, daftar_soal: blok.daftar_soal.filter((_, j) => j !== sIndex) };
        }));
    };

    const handleGambar = (e: ChangeEvent<HTMLInputElement>, bIndex: number) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setDaftarBlok(prev => prev.map((blok, i) => 
                    i === bIndex ? { ...blok, preview: reader.result as string, gambar: file } : blok
                ));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <AppLayout breadcrumbs={[{ title: `Aktivitas ${namaTahap}`, href: '#' }]}>
            <div className="p-6 bg-gray-100 min-h-screen w-full font-sans text-gray-800">
                
                {showSuccessMsg && (
                    <div className="max-w-3xl mx-auto mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="bg-emerald-50 border-2 border-emerald-200 text-emerald-800 px-6 py-4 rounded-[20px] flex items-center gap-3 shadow-md">
                            <CheckCircle2 size={20} className="text-emerald-600" />
                            <span className="font-semibold text-[14px]">{flash?.success}</span>
                        </div>
                    </div>
                )}
                
                <div className="max-w-3xl mx-auto mb-8 flex justify-between items-end">
                    <div className="flex items-center gap-4">
                        <div className="bg-emerald-600 p-3 rounded-2xl shadow-lg">
                            <Code2 className="text-white w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black uppercase tracking-tight leading-none">{namaTahap}</h1>
                            <p className="text-[10px] font-bold text-gray-400 uppercase mt-1 tracking-widest">Manajemen Aktivitas PRIMM</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Materi</p>
                        <p className="text-sm font-bold text-gray-900">{materi.judul}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8 mb-12">
                    {daftarBlok.map((blok, bIndex) => (
                        <div key={blok.id} className="relative bg-white border border-gray-200 rounded-[40px] shadow-sm p-8 space-y-8 animate-in fade-in zoom-in duration-300">
                            
                            {daftarBlok.length > 1 && (
                                <button type="button" onClick={() => hapusBlok(bIndex)} className="absolute top-6 right-8 text-gray-300 hover:text-red-500 transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            )}

                            <div className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                                Blok Aktivitas #{bIndex + 1}
                            </div>

                            {/* 1. MEDIA SECTION */}
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <span className="bg-emerald-600 text-white w-5 h-5 rounded-lg flex items-center justify-center text-[10px]">1</span>
                                    Gambar Kode Program
                                </label>
                                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-100 rounded-[30px] bg-gray-50/50 cursor-pointer hover:bg-gray-100 transition-all relative overflow-hidden group">
                                    {blok.preview ? (
                                        <img src={blok.preview} className="w-full h-full object-contain p-6" alt="Preview" />
                                    ) : (
                                        <div className="text-center opacity-40">
                                            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                                            <p className="text-[10px] font-black uppercase tracking-tighter">Klik untuk Unggah Gambar</p>
                                        </div>
                                    )}
                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleGambar(e, bIndex)} />
                                </label>
                            </div>

                            {/* 2. QUESTION SECTION */}
                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <span className="bg-emerald-600 text-white w-5 h-5 rounded-lg flex items-center justify-center text-[10px]">2</span>
                                    Daftar Pertanyaan (Satu Gambar untuk Banyak Soal)
                                </label>
                                <div className="space-y-4">
                                    {blok.daftar_soal.map((soal, sIndex) => (
                                        <div key={soal.id} className="flex gap-4 items-start group">
                                            <span className="mt-4 font-bold text-emerald-500 min-w-[25px]">
                                                {bIndex + 1}{String.fromCharCode(97 + sIndex)}.
                                            </span>
                                            <textarea 
                                                value={soal.teks}
                                                onChange={(e) => updateTeksSoal(bIndex, sIndex, e.target.value)}
                                                className="flex-1 p-5 bg-gray-50 border border-gray-100 rounded-[20px] text-xs focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all resize-none font-medium outline-none"
                                                placeholder={`Tulis pertanyaan ${bIndex + 1}${String.fromCharCode(97 + sIndex)}...`}
                                                rows={2}
                                            />
                                            {blok.daftar_soal.length > 1 && (
                                                <button type="button" onClick={() => hapusSoal(bIndex, sIndex)} className="mt-4 p-2 text-gray-300 hover:text-red-500 transition-colors">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <button type="button" onClick={() => tambahSoal(bIndex)} className="flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest text-emerald-600 hover:translate-x-1 transition-all">
                                    <Plus className="w-4 h-4" /> Tambah Soal untuk Gambar Ini
                                </button>
                            </div>

                            {/* 3. COLAB SECTION */}
                            {(tahap.toLowerCase() === 'modify' || tahap.toLowerCase() === 'make') && (
                                <div className="p-5 bg-orange-50 border border-orange-100 rounded-[25px] space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Monitor className="w-4 h-4 text-orange-500" />
                                        <span className="text-[10px] font-black text-orange-800 uppercase tracking-widest">Google Colab Link (Opsional)</span>
                                    </div>
                                    <input 
                                        type="url"
                                        value={blok.link_colab || ''}
                                        onChange={(e) => updateLinkColab(bIndex, e.target.value)}
                                        className="w-full p-4 bg-white border border-orange-100 rounded-xl text-xs focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all font-medium outline-none"
                                        placeholder="https://colab.research.google.com/..."
                                    />
                                </div>
                            )}
                        </div>
                    ))}

                    <button 
                        type="button"
                        onClick={tambahBlok}
                        className="w-full py-8 border-2 border-dashed border-gray-300 rounded-[35px] text-gray-400 font-bold uppercase text-[10px] tracking-widest hover:border-emerald-500 hover:text-emerald-500 transition-all flex flex-col items-center justify-center gap-2 bg-white/50"
                    >
                        <Plus className="w-6 h-6" />
                        Tambah Blok (Gambar + Grup Soal Baru)
                    </button>

                    <div className="max-w-3xl mx-auto flex justify-end gap-4 pb-12">
                        <Link 
                            href={`/guru/course/primm/list-primm/${materi.id}?judul=${encodeURIComponent(materi.judul)}`}
                            className="px-8 py-4 bg-gray-600 text-white rounded-2xl font-black text-[12px] uppercase tracking-widest hover:bg-gray-700 transition-all flex items-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" /> Batal
                        </Link>
                        <button 
                            type="submit" 
                            className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-[12px] uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center gap-2"
                        >
                            <Save className="w-4 h-4" /> Simpan Aktivitas
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}