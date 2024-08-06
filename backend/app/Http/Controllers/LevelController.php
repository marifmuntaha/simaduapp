<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLevelRequest;
use App\Http\Requests\UpdateLevelRequest;
use App\Http\Resources\LevelResource;
use App\Models\Institution;
use App\Models\Level;
use Exception;
use Illuminate\Http\Request;

class LevelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $levels = new Level();
        $levels = $request->has('ladder_id') ? $levels->whereLadderId($request->input('ladder_id')) : $levels;
        return response([
            'success' => true,
            'message' => null,
            'result' => LevelResource::collection($levels->get())
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLevelRequest $request)
    {
        try {
            return ($level = Level::create($request->all()))
                ? response([
                    'success' => true,
                    'message' => 'Data Tingkat berhasil disimpan',
                    'result' => new LevelResource($level)
                ], 201) : throw new Exception('Data Tingkat gagal disimpan');
        } catch (Exception $exception) {
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
    public function show(Level $level)
    {
        return response([
            'success' => true,
            'message' => null,
            'result' => new LevelResource($level)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLevelRequest $request, Level $level)
    {
        try {
            return $level->update($request->all())
                ? response([
                    'success' => true,
                    'message' => 'Data Tingkat berhasil diperbarui',
                    'result' => new LevelResource($level)
                ]) : throw new Exception('Data Tingkat gagal diperbarui');
        } catch (Exception $exception) {
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
    public function destroy(Level $level)
    {
        try {
            return $level->delete()
                ? response([
                    'success' => true,
                    'message' => 'Data Tingkat berhasil dihapus',
                    'result' => new LevelResource($level)
                ]) : throw new Exception('Data Tingkat gagal dihapus');
        } catch (Exception $exception){
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
                'result' => null
            ]);
        }
    }
}
