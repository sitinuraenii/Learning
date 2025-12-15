import hero from '@/assets/hero.png';
import Navbar from '@/pages/navbar';
import Footer from './footer';
export default function Welcome(){
    return (
        <>
        <Navbar />
            <section>
               <div className="relative isolate px-5 pt-20 lg:px-10">
                <div className="mx-auto max-w-7xl py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
                    
                    <div>
                        <h1 className="text-5xl text-center font-bold tracking-tight text-gray-900 sm:text-5xl">
                        PROGLEARN
                        </h1>
                        <p className="mt-8 text-center text-lg font-medium text-gray-500 sm:text-xl">
                        Website ini merupakan tempat belajar pemrograman dengan berbagai fitur seperti test, lembar kerja siswa dan sekaligus nilainya 
                        </p>
                        <div className=" animate-bounce justify-center mt-10 flex items-center gap-x-6 ">
                            <button className="px-4 py-1.5 rounded-md bg-[#78B9B5] font-medium text-white hover:bg-gray-300 hover:text-black">
                                Jelajahi
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center animate-pulse">
                        <img src={hero}  
                        alt="Hero Illustration"
                        className="w-[60%] max-w-sm rounded-xl "/>
                    </div>
                    </div>
                </div>
                </div>
            </section>
             <Footer />
        </>
    );
}
