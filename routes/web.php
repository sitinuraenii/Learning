<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\User\GuruProfilController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/tentang', function () {
    return Inertia::render('about'); 
});

Route::get('/kontak', function () {
    return Inertia::render('contact');
});

Route::get('/petunjuk', function () {
    return Inertia::render('petunjuk');
});

Route::get('guru/list-siswa', [UserController::class, 'index'])
    ->name('users.index');

Route::get('guru/test/kelolaTest', function () {
    return Inertia::render('guru/test/kelolaTest');
});

Route::get('guru/test/form-tambahTest', function () {
    return Inertia::render('guru/test/form-tambahTest');
});

Route::get('/register', [RegisterController::class, 'create'])
    ->name('register.create');
Route::post('/register', [RegisterController::class, 'store'])
    ->name('register');

Route::get('/guru/edit-profil', [GuruProfilController::class, 'edit']);
Route::put('/guru/update-profil', [GuruProfilController::class, 'update']);

require __DIR__.'/settings.php';
