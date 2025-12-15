import { title } from "process";
import React from "react";

export default function dataUser(){
    return (
        <>
            <h1 className=" text-3xl mt-10 font-bold text-center">LIST DATA SISWA</h1>
            <table className="mt-10 mx-auto border-collapse border border-gray-400">
                <thead className="bg-[#F7CA89] text-black">
                    <tr>
                    <th className="border border-gray-300 ...">No</th>
                    <th className="border border-gray-300 ...">Nama</th>
                    <th className="border border-gray-300 ...">Jenis Kelamin</th>
                    <th className="border border-gray-300 ...">Email</th>
                    <th className="border border-gray-300 ...">Action</th>
                    </tr>
                </thead>
                <tbody>
                    
                    <tr>
                        <td className="border border-gray-300 px-4 py-2">1</td>
                        <td className="border border-gray-300 px-4 py-2">Indiana</td>
                        <td className="border border-gray-300 px-4 py-2">L</td>
                        <td className="border border-gray-300 px-4 py-2">indiana@mail.com</td>
                        <td className="border border-gray-300 px-4 py-2">
                            <button className="mr-2 bg-blue-500 text-white px-3 py-1 rounded">Ubah</button>
                            <button className="bg-red-500 text-white px-3 py-1 rounded">Hapus</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}