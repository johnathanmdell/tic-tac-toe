<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Player;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class PlayerController extends Controller
{
    /**
     * @return JsonResponse
     */
    public function highScores(): JsonResponse
    {
        return response()->json([
            'players' => Player::orderBy('score', 'desc')->take(5)->get()
        ]);
    }

    /**
     * @param Request $request
     * @return Response
     */
    public function scorePlayer(Request $request): Response
    {
        $validated = compact($request->validate([
            'name' => ['required'],
        ]));

        Player::updateOrCreate([
            'name' => $validated['name']
        ], [
            'score' => DB::raw('score + 1')
        ]);

        return response();
    }
}
