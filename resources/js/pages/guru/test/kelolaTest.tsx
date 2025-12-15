import React from 'react';
import { Plus } from 'lucide-react'; 
import { Link } from '@inertiajs/react';

export default function KelolaTest(){
    return (
        <>
        <h1 className=" text-3xl mt-10 font-bold text-center">SILAHKAN BUAT TEST</h1>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <div className="border rounded-lg p-3 bg-white shadow-sm">
                    <p className="text-sm text-gray-700">
                        Pretest adalah test yang dilaksanakan sebelum pembelajaran
                    </p>
                    <Link
                        href="/guru/test/form-tambah" 
                        className="mt-3 bg-[#198754] text-white text-sm px-3 py-1.5
                                rounded-md hover:bg-green-600 inline-flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Buat Pretest
                    </Link>
                </div>

                <div className="border rounded-lg p-3 bg-white shadow-sm">
                    <p className="text-sm text-gray-700">
                        Postest adalah test yang dilaksanakan setelah pembelajaran
                    </p>
                    <Link
                        href="/guru/test/form-tambahPostest" 
                        className="mt-3 bg-[#198754] text-white text-sm px-3 py-1.5
                                rounded-md hover:bg-green-600 inline-flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Buat Postest
                    </Link>
                </div>
            </div>
        </>
    );
}