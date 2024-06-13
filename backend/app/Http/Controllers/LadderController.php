<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLadderRequest;
use App\Http\Requests\UpdateLadderRequest;
use App\Http\Resources\LadderResource;
use App\Models\Ladder;
use Exception;

class LadderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ladders = new Ladder();
        return response([
            'success' => true,
            'message' => null,
            'result' => LadderResource::collection($ladders->get())
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLadderRequest $request)
    {
        try {
            return ($ladder = Ladder::create($request->all()))
                ? response([
                    'success' => true,
                    'message' => 'Data jenjang berhasil ditambahkan.',
                    'result' => new LadderResource($ladder)
                ], 201) : throw new Exception('Data jenjang gagal ditambahkan.');
        } catch (Exception $exception){
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
                'result' => null
            ], 422);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Ladder $ladder)
    {
        return response([
            'success' => true,
            'message' => null,
            'result' => new LadderResource($ladder)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLadderRequest $request, Ladder $ladder)
    {
        try {
            return $ladder->update(array_filter($request->all()))
                ? response([
                    'success' => true,
                    'message' => 'Data jenjang berhasil diubah.',
                    'result' => new LadderResource($ladder)
                ]) : throw new Exception('Data jenjang gagal diubah.');
        } catch (Exception $exception){
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
                'result' => null
            ], 422);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ladder $ladder)
    {
        try {
            return $ladder->delete()
                ? response([
                    'success' => true,
                    'message' => 'Data jenjang berhasil dihapus.',
                    'result' => new LadderResource($ladder)
                ]) : throw new Exception('Data jenjang gagal dihapus.');
        } catch (Exception $exception){
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
                'result' => null
            ], 422);
        }
    }
}
