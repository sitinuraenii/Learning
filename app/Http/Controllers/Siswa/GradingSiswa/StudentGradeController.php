<?php

namespace App\Http\Controllers\Siswa\GradingSiswa;

use App\Http\Controllers\Controller; 
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

use App\Models\Course;             
use App\Models\StudentAnswer;
use App\Models\CourseProgress;

class StudentGradeController extends Controller
{
    public function index()
    {
        // Pastikan Facade Auth sudah di-import di atas: use Illuminate\Support\Facades\Auth;
        $userId = Auth::id(); 

        $allCourses = \App\Models\Course::all();

        $allAnswers = \App\Models\StudentAnswer::with(['question.primm'])
            ->where('user_id', $userId)
            ->get();

        $results = $allCourses->map(function ($course) use ($allAnswers) {
            // Filter jawaban dengan proteksi null (?->)
            $jawabanMateriIni = $allAnswers->filter(function ($answer) use ($course) {
                // Kita cek apakah relasinya sampai ke course_id ada
                return $answer->question?->primm?->course_id === $course->id;
            });

            // Hitung fase unik
            $faseCount = $jawabanMateriIni->map(fn($a) => $a->question?->primm?->tahap ?? null)
                ->filter()
                ->unique()
                ->count();

            $firstAnswer = $jawabanMateriIni->first();

            return [
                'id' => $firstAnswer ? $firstAnswer->id : null,
                'title' => $course->title, 
                'total_fase' => $faseCount . ' / 5',
                'rata_rata_nilai' => round($jawabanMateriIni->avg('skor'), 1) ?: 0,
                'is_pengenalan' => str_contains(strtolower($course->title), 'pengenalan'),
            ];
        });

        return Inertia::render('siswa/nilaiSiswa/hasilBelajar', [
            'results' => $results
        ]);
    }

    public function show($id)
    {
        $currentAnswer = StudentAnswer::with('question.primm')->findOrFail($id);
        $courseId = $currentAnswer->question->primm->course_id;

        $reports = StudentAnswer::with(['question.primm'])
            ->where('user_id', Auth::id())
            ->whereHas('question.primm', function($q) use ($courseId) {
                $q->where('course_id', $courseId);
            })
            ->orderBy('id', 'asc')
            ->get();

        return Inertia::render('siswa/nilaiSiswa/detailHasil', [
            'reports' => $reports,
            'course_title' => $currentAnswer->question->primm->course->title
        ]);
    }
}