import React, { useState, useEffect } from "react";
import { Head, router } from '@inertiajs/react';
import { 
    ArrowRight,ArrowLeft, CheckCircle2, Code2, BookOpen, ExternalLink, Lightbulb, Search
} from "lucide-react";
import AppLayout from '@/layouts/app-layout';

interface Question { id: number; pertanyaan: string; }
interface PrimmActivity { id: number; tahap: string; gambar: string | null; link_colab: string | null; questions: Question[]; }
interface PrimmData { [key: string]: PrimmActivity[] | undefined; }
interface Course { id: number; title: string; description: string; link?: string; file?: string; }
interface Props { 
    course: Course; 
    primm: PrimmData; 
    activeStepFromUrl?: string; 
    existingAnswers?: {[key: number]: string};
}

export default function ShowPrimm({ course, primm, activeStepFromUrl, existingAnswers }: Props) {
    const steps = ["predict", "run", "investigate", "modify", "make"];
    const initialStepIndex = activeStepFromUrl ? steps.indexOf(activeStepFromUrl.toLowerCase()) : 0;
    const [currentStep, setCurrentStep] = useState<number>(initialStepIndex !== -1 ? initialStepIndex : 0);
    const [answers, setAnswers] = useState<{[key: number]: string}>({});
    const activeStep = steps[currentStep];
    const [subView, setSubView] = useState<'menu' | 'materi' | 'aktivitas'>('menu');

    useEffect(() => { setSubView('menu'); }, [activeStep]);

    useEffect(() => {
        if (activeStepFromUrl) {
            const idx = steps.indexOf(activeStepFromUrl.toLowerCase());
            if (idx !== -1) setCurrentStep(idx);
        }
    }, [activeStepFromUrl]);

    // Mengisi jawaban otomatis dari database dan mengunci input
    useEffect(() => {
        if (existingAnswers) {
            setAnswers(existingAnswers);
        }
    }, [activeStep, existingAnswers]);

    const renderEmbedMedia = (url: string): string => {
        if (!url) return '';
        if (url.includes('<iframe')) return url.replace('<iframe', '<iframe class="w-full aspect-video rounded-[30px] shadow-lg border-0"');
        let videoId = '';
        if (url.includes('v=')) videoId = url.split('v=')[1]?.split('&')[0];
        else if (url.includes('youtu.be/')) videoId = url.split('youtu.be/')[1]?.split('?')[0];
        if (videoId) return `<iframe width="100%" height="400" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen class="rounded-[30px] shadow-lg w-full aspect-video border-0"></iframe>`;
        return `<div class="p-10 bg-gray-50 rounded-[30px] text-center border-2 border-dashed border-gray-200"><p class="text-xs font-bold text-gray-400 uppercase mb-2">Media Eksternal</p><a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline font-bold flex items-center justify-center gap-2">Buka Media di Tab Baru <ExternalLink size={14} /></a></div>`;
    };

    const parseQuestionText = (text: string) => {
        try {
            if (typeof text === 'string' && text.trim().startsWith('{')) {
                const parsed = JSON.parse(text);
                return parsed.teks || text;
            }
            return text;
        } catch (e) { return text; }
    };

    const handleAnswerChange = (questionId: number, value: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const activities = primm[activeStep] || [];

    const handleFinalComplete = () => {
    // Memanggil route yang akan mengisi user_id dan course_id ke tabel progres
        router.post(`/siswa/courseSiswa/complete/${course.id}`, {}, {
            onSuccess: () => {
                alert("Selamat! Seluruh tahapan PRIMM berhasil diselesaikan.");
            },
            onFinish: () => {
                // Arahkan kembali ke daftar kursus
                router.visit('/siswa/courseSiswa/listCourse');
            }
        });
    };

    const handleSaveAndNext = () => {
    // 1. Ambil semua ID pertanyaan di tahap aktif saat ini
        const currentQuestions = activities.flatMap(act => act.questions.map(q => q.id));
        
        // 2. Validasi lokal: Pastikan semua input di tahap ini sudah terisi
        const isAllAnswered = currentQuestions.every(id => answers[id] && answers[id].trim() !== "");

        if (!isAllAnswered) {
            alert("Ups! Kamu harus mengisi semua jawaban di tahap ini sebelum lanjut.");
            return;
        }

        // 3. Simpan progres jawaban ke tabel 'jawaban_siswa'
        router.post('/siswa/courseSiswa/saveProgress', {
            course_id: course.id,
            tahap: activeStep,
            jawaban: answers 
        }, {
            onSuccess: () => {
                // Cek apakah ini tahap terakhir (MAKE)
                if (currentStep < steps.length - 1) {
                    // Jika belum terakhir, lanjut ke tahap berikutnya (misal: Predict -> Run)
                    const nextStepIndex = currentStep + 1;
                    setCurrentStep(nextStepIndex);
                    router.visit(`/siswa/courseSiswa/showPrimm/${course.id}/${steps[nextStepIndex]}`);
                } else {
                    // JIKA INI TAHAP 'MAKE', Panggil fungsi penyelesaian akhir
                    handleFinalComplete();
                }
            }
        });
    };



    return (
        <AppLayout breadcrumbs={[{ title: course.title, href: '#' }]}>
            <Head title={`Belajar PRIMM - ${course.title}`} />
            <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 font-sans text-gray-800">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 mb-8">
                        <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tighter leading-none">
                            Tahap <span className="text-blue-600">{activeStep}</span>
                        </h1>
                        <p className="text-[12px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">
                            Materi: <span className="text-gray-900">{course.title}</span>
                        </p>
                    </div>

                    <div className="space-y-12" key={activeStep}>
                        {activeStep === 'investigate' && subView === 'menu' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
                                <button onClick={() => setSubView('materi')} className="bg-white p-10 rounded-[45px] shadow-sm border border-gray-100 hover:border-blue-500 transition-all group text-center">
                                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform"><BookOpen size={32} /></div>
                                    <h3 className="text-xl font-black uppercase">Pelajari Materi</h3>
                                    <p className="text-gray-500 text-sm mt-2">Buka materi pendukung untuk membantu investigasi.</p>
                                </button>
                                <button onClick={() => setSubView('aktivitas')} className="bg-white p-10 rounded-[45px] shadow-sm border border-gray-100 hover:border-blue-500 transition-all group text-center">
                                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform"><Search size={32} /></div>
                                    <h3 className="text-xl font-black uppercase">Mulai Aktivitas</h3>
                                    <p className="text-gray-500 text-sm mt-2">Analisis kode program dan jawab pertanyaannya.</p>
                                </button>
                            </div>
                        ) : activeStep === 'investigate' && subView === 'materi' ? (
                            <div className="bg-white p-10 rounded-[45px] shadow-sm border border-gray-100">
                                <div className="prose max-w-none prose-slate">
                                    {course.link && <div className="mb-8 overflow-hidden rounded-[30px]" dangerouslySetInnerHTML={{ __html: renderEmbedMedia(course.link) }} />}
                                    {course.file && (
                                        <div className="mb-8 rounded-[35px] overflow-hidden border border-gray-100 shadow-sm bg-gray-50">
                                            {course.file.endsWith('.pdf') ? <iframe src={`/storage/${course.file}`} className="w-full h-[500px] border-0" /> : <img src={`/storage/${course.file}`} className="w-full h-auto object-contain mx-auto" alt="Materi" />}
                                        </div>
                                    )}
                                    <div className="space-y-4 mb-12">
                                        <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-500 flex items-center gap-2"><BookOpen size={14} /> Deskripsi Materi</h3>
                                        <div className="text-gray-600 leading-relaxed font-medium prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: course.description }} />
                                    </div>
                                    <div className="flex justify-end border-t border-gray-100 pt-10">
                                        <button onClick={() => setSubView('aktivitas')} className="flex items-center justify-center gap-3 bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-[12px] uppercase tracking-wider shadow-lg hover:bg-blue-400 transition-all group">
                                            <span>Mulai Aktivitas</span> <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-12">
                                {activities.map((act, idx) => (
                                    <div key={act.id} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                        {act.gambar && (
                                            <div className="bg-white p-4 rounded-[15px] border border-gray-100 shadow-sm text-center">
                                                <img src={`/storage/${act.gambar}`} className="max-w-md w-full h-auto rounded-[15px] max-h-[350px] mx-auto object-contain" alt="Code" />
                                            </div>
                                        )}
                                        <div className="space-y-6">
                                            {act.questions && act.questions.map((q, qIdx) => (
                                                <div key={q.id} className="bg-white p-10 rounded-[45px] border border-gray-100 shadow-sm">
                                                    <div className="flex items-start gap-5 mb-6">
                                                        <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-sm font-black flex-shrink-0">{idx + 1}{String.fromCharCode(97 + qIdx)}</div>
                                                        <p className="text-md font-bold text-justify text-gray-800 pt-2 leading-relaxed">{parseQuestionText(q.pertanyaan)}</p>
                                                    </div>
                                                    <div className="space-y-4">
                                                        {(activeStep === 'modify' || activeStep === 'make') ? (
                                                            <div className="relative group">
                                                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-400"><ExternalLink size={20} /></div>
                                                                <input type="url" value={answers[q.id] || ''} onChange={(e) => handleAnswerChange(q.id, e.target.value)} readOnly={!!existingAnswers?.[q.id]} className={`w-full pl-14 pr-6 py-5 rounded-[25px] text-sm transition-all outline-none font-medium ${!!existingAnswers?.[q.id] ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-200' : 'bg-blue-50 border-blue-100 focus:ring-4 focus:ring-blue-500/10 text-blue-700'}`} placeholder={!!existingAnswers?.[q.id] ? "Link sudah terkunci" : "Tempelkan link Google Colab di sini..."} />
                                                            </div>
                                                        ) : (
                                                            <div className="relative">
                                                                <textarea value={answers[q.id] || ''} onChange={(e) => handleAnswerChange(q.id, e.target.value)} readOnly={!!existingAnswers?.[q.id]} className={`w-full p-6 rounded-[30px] text-sm transition-all outline-none font-medium min-h-[120px] resize-none ${!!existingAnswers?.[q.id] ? 'bg-gray-200 text-gray-400 border-gray-300' : 'bg-gray-50 border-gray-100 focus:ring-4 focus:ring-emerald-500/10 text-gray-700'}`} placeholder={!!existingAnswers?.[q.id] ? "Jawaban sudah terkunci" : "Tuliskan jawabanmu di sini..."} />
                                                                {!!existingAnswers?.[q.id] && <span className="absolute top-4 right-6 text-[9px] text-emerald-600 font-bold uppercase flex items-center gap-1"><CheckCircle2 size={12} /> Tersimpan</span>}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                {(activeStep === 'modify' || activeStep === 'make') && (
                                    <div className="bg-blue-50/50 border border-blue-100 p-5 rounded-[25px]">
                                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3 flex items-center gap-2"><Lightbulb size={14} /> Langkah Pengumpulan Link:</p>
                                        <ol className="text-[11px] text-blue-800 space-y-2 ml-4 list-decimal font-medium">
                                            <li>Klik tombol <strong>"Share"</strong> di pojok kanan atas Google Colab.</li>
                                            <li>Ubah akses dari "Restricted" menjadi <strong>"Anyone with the link"</strong>.</li>
                                            <li>Klik <strong>"Copy Link"</strong> dan tempelkan ke kotak di atas.</li>
                                        </ol>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                   {(!(activeStep === 'investigate' && (subView === 'menu' || subView === 'materi'))) && (
                        <div className="flex flex-col md:flex-row justify-end items-center mt-16 mb-24 px-6 gap-4 w-full"> 
                            {(!(activeStep === 'investigate' && subView === 'menu')) && (
                                <div className="flex flex-col md:flex-row items-center md:items-end justify-end gap-4 w-full md:w-auto">
                                    {(activeStep === 'modify' || activeStep === 'make') && activities.length > 0 && activities[0].link_colab && (
                                        <div className="flex flex-col justify-end items-center md:items-end gap-1.5 w-full md:w-auto">
                                            <p className="text-[12px] text-amber-600 font-bold leading-none tracking-wider">
                                                ⚠️ Setelah klik button modify/make ini, klik File-Save Copy in Drive-Open in new tab!
                                            </p>
                                            <a
                                                href={`${activities[0].link_colab}${activities[0].link_colab.includes('#') ? '' : '#force-copy=1'}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center gap-2 bg-[#78B9B5] text-white px-6 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-[#6aa8a4] transition-all shadow-sm active:scale-95 w-full md:w-auto whitespace-nowrap"
                                            >
                                                <Code2 size={16} />
                                                <span>{activeStep === 'modify' ? 'Buka Modifikasi' : 'Buat Program'}</span>
                                            </a>
                                        </div>
                                    )}

                                    <div className="w-full md:w-auto">
                                        <button
                                            type="button"
                                            onClick={handleSaveAndNext}
                                            className="flex items-center justify-center md:justify-end gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-md hover:bg-blue-700 transition-all active:scale-95 w-full md:w-auto whitespace-nowrap"
                                        >
                                            <span>{currentStep === steps.length - 1 ? 'Simpan & Selesai' : 'Simpan & Lanjut'}</span>
                                            {currentStep === steps.length - 1 ? <CheckCircle2 size={16} /> : <ArrowRight size={16} />}
                                        </button>
                                    </div>

                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}