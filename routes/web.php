<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

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

Route::get('guru/dataUser', function () {
    return Inertia::render('guru/dataUser');
});

Route::get('guru/test/kelolaTest', function () {
    return Inertia::render('guru/test/kelolaTest');
});

Route::get('guru/test/form-tambahTest', function () {
    return Inertia::render('guru/test/form-tambahTest');
});




require __DIR__.'/settings.php';
