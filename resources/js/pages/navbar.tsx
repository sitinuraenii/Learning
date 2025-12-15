import { register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLogoIcon from '../components/app-logo-icon';

export default function Navbar({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
   const page = usePage<SharedData>();
    const auth = page.props.auth;
    
    const isActive = (componentName: string) => page.component === componentName;

    return (
        <>
            <header className="fixed top-0 left-0 w-full bg-[#0F828C] text-white border-b border-[#0d6d74] z-50">
                <nav className="max-w-7xl mx-auto flex items-center justify-between p-4 gap-6">
                    <div className="flex items-center">
                        <AppLogoIcon className="size-7 text-white" />
                        <span className="ml-2 text-lg font-semibold leading-tight">
                            ProgLearn
                        </span>
                    </div>
                    <div className="flex items-center gap-6">
                       <Link href="/" className={`px-4 py-1.5 rounded-md ${
                            isActive('/') ? 'bg-[#78B9B5] hover:text-black hover:bg-gray-200' : 'hover:text-black'}`}>
                                Beranda
                        </Link>
                        <Link href="/petunjuk" className={`px-4 py-1.5 rounded-md ${
                            isActive('/petunjuk') ? 'bg-[#78B9B5] hover:text-black hover:bg-gray-200' : 'hover:text-black'}`}>
                                Petunjuk
                        </Link>
                        <Link href="/tentang" className={`px-4 py-1.5 rounded-md ${
                            isActive('tentang') ? 'bg-[#78B9B5] hover:text-black hover:bg-gray-200' : 'hover:text-black'}`}>
                                Tentang
                        </Link>
                        <Link href="/kontak" className={`px-4 py-1.5 rounded-md ${
                            isActive('kontak') ? 'bg-[#78B9B5] hover:text-black hover:bg-gray-200' : 'hover:text-black'}`}>
                                Kontak
                        </Link>

                        {auth.user ? (
                         <>
                            
                        </>
                        ) : (
                            <>
                                {canRegister && (
                                    <Link
                                        href={register()}
                                        className={`px-4 py-1.5 rounded-md ${
                                            isActive('/register') ? 'bg-[#78B9B5] hover:text-black hover:bg-gray-200' : 'hover:text-black'}`}
                                    >
                                        Daftar
                                    </Link>
                                )}
                            </>
                        )}
                    </div>
                </nav>
            </header>
        </>
    );
}
