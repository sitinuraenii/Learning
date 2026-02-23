<?php

namespace App\Http\Controllers\Dashboard;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\Test;
use App\Models\User;
use App\Models\Primm;
use App\Models\StudentAnswer;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function statistikGuru(Request $request)
    {
        // 1. Total semua siswa
        $totalSiswa = User::where('role', 'siswa')->count();

        // 2. Total semua materi yang ada (termasuk yang kosong)
        $totalMateri = Course::count();

        // 3. Total Aktivitas (Gunakan ini jika ingin menghitung TOTAL record PRIMM di DB)
        $totalAktivitas = Primm::count(); 
        
        // Atau gunakan ini jika ingin menghitung "Ada berapa materi yang sudah ada aktivitasnya"
        // $totalAktivitas = Course::has('primms')->count();

        // 4. Siswa yang menyelesaikan 5 tahap (Logika diperkuat)
        $siswaSelesai = User::where('role', 'siswa')
            ->whereHas('answers.question.primm', function ($query) {
                $query->select('course_id')
                    ->groupBy('course_id')
                    ->havingRaw('COUNT(DISTINCT tahap) >= 5');
            })->count();

        return Inertia::render('guru/dashboard', [
            'stats' => [
                'totalSiswa'            => (int) $totalSiswa,
                'totalAktivitas'        => (int) $totalAktivitas,
                'totalMateri'           => (int) $totalMateri,
                'siswaSelesaiSemuaFase' => (int) $siswaSelesai,
            ]
        ]);
    }

    public function statistikSiswa(Request $request)
    {
        $user = $request->user();

        $totalMateri = Course::count();
        
        $totalAktivitas = Course::has('primms')->count();

        $progresSiswa = Course::whereHas('primms.questions.answers', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->count();

        return Inertia::render('siswa/dashboard', [
            'stats' => [
                'totalAktivitas' => (int) $totalAktivitas,
                'totalMateri'    => (int) $totalMateri,
                'progresSiswa'   => (int) $progresSiswa,
            ]
        ]);
    }
}
