<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GuruProfilController extends Controller
{

    public function edit(Request $request)
    {
        return Inertia::render('guru/edit-profil', [
            'user' => $request->user(),
        ]);
    }

    public function update(Request $request)
{
    $request->validate([
        'name'  => 'required|string|max:255',
        'jk'    => 'required|in:L,P',
        'email' => 'required|email',
    ]);

    $request->user()->update([
        'name'  => $request->name,
        'jk'    => $request->jk,
        'email' => $request->email,
    ]);

        return redirect()->route('dashboard')
            ->with('success', 'Profil berhasil diperbarui');
    }
}
