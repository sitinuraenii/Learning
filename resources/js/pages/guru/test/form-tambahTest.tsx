import { Link } from "@inertiajs/react";
import { Save } from "lucide-react";
export default function tambahTest(){
    return (
        <>
        <h1 className=" text-3xl mt-10 font-bold text-center">Tambah Test</h1>
        <div className="mt-10 max-w-md mx-auto bg-[#F4C484] p-6 rounded-lg shadow-md">
            <label className="block text-sm font-medium mb-1">
                Masukkan judul test
            </label>
            <input
                type="text"
                className="w-full p-2 mb-4 rounded-md bg-white focus:outline-none"
                placeholder="Masukkan judul test"
            />
            <label className="block text-sm font-medium mb-1">
                Masukkan deskripsi test
            </label>
            <textarea
                className="w-full p-2 mb-4 rounded-md bg-white focus:outline-none"
                placeholder="Masukkan deskripsi test"
                rows={3}
            ></textarea>
            <label className="block text-sm font-medium mb-1">
                Unggah test
            </label>
            <input
                type="url"
                className="w-full p-2 rounded-md bg-white focus:outline-none"
            />
            <div className="w-full flex justify-end mt-3">
                <Link
                    href="/guru/test/kelolaTest" 
                    className="flex justify-end mt-3 bg-blue-600 text-white text-sm px-3 py-1.5
                            rounded-md inline-flex items-center gap-2"
                >
                    <Save className="w-4 h-4" />
                    Simpan
                </Link>
            </div>
        </div>

        </>

    );
} 