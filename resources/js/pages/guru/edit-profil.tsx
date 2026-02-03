import { useForm } from "@inertiajs/react";

interface User {
  name: string;
  email: string;
  jk: "L" | "P";
}

export default function EditProfil({ user }: { user: User }) {
  const { data, setData, put, processing, errors } = useForm({
    name: user.name,
    email: user.email,
    jk: user.jk,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    put('/guru/update-profil');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 ">
        <div className="w-full max-w-lg p-6 rounded shadow-lg bg-[#f4c892]">
            <h1 className="text-center font-semibold mb-2">EDIT PROFIL</h1>
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Nama
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        />
                        {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Jenis Kelamin
                    </label>

                <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name="jk"
                        value="L"
                        checked={data.jk === "L"}
                        onChange={(e) => setData("jk", e.target.value as "L" | "P")}
                        className="accent-[#0F828C]"
                    />
                    <span>Laki-laki</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name="jk"
                        value="P"
                        checked={data.jk === "P"}
                        onChange={(e) => setData("jk", e.target.value as "L" | "P")}
                        className="accent-[#0F828C]"
                    />
                    <span>Perempuan</span>
                    </label>
                </div>

                {errors.jk && (
                    <p className="text-red-500 text-sm mt-1">
                    {errors.jk}
                    </p>
                )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        />
                        {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                </div>

                <div className="flex gap-3 pt-2">
                    <button
                    type="submit"
                    disabled={processing}
                    className="px-4 py-2 bg-[#0F828C] text-white rounded"
                    >
                    Simpan Perubahan
                    </button>

                    <button
                    type="button"
                    onClick={() => (window.location.href = '/dashboard')}
                    className="px-4 py-2 rounded bg-gray-300"
                    >
                    Batal
                    </button>

                </div>
            </form>
        </div>
    </div>
  );
}
