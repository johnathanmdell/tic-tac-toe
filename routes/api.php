<?php

use App\Http\Controllers\PlayerController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('players', [PlayerController::class, 'highScores'])->name('players.high-scores');
Route::post('players', [PlayerController::class, 'scorePlayer'])->name('player.score-player');
