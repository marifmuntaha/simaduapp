<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMajorRequest;
use App\Http\Requests\UpdateMajorRequest;
use App\Http\Resources\MajorResource;
use App\Models\Institution;
use App\Models\Major;
use Exception;
use Illuminate\Http\Request;

class MajorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $majors = new Major();
        $majors = $request->has('ladder_id') ? $majors->whereLadderId($request->input('ladder_id')) : $majors;

        return response([
            'success' => true,
            'message' => null,
            'result' => MajorResource::collection($majors->get()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMajorRequest $request)
    {
        try {
            return ($major = Major::create($request->all()))
                ? response([
                    'success' => true,
                    'message' => "Data Jurusan berhasil disimpan",
                    'result' => new MajorResource($major),
                ], 201) : throw new Exception("Data Jurusan gagal disimpan");
        } catch (Exception $exception){
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
                'result' => null,
            ], 422);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Major $major)
    {
        return response([
            'success' => true,
            'message' => null,
            'result' => new MajorResource($major),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMajorRequest $request, Major $major)
    {
        try {
            return $major->update(array_filter($request->all()))
                ? response([
                    'success' => true,
                    'message' => "Data Jurusan berhasil diupdate",
                    'result' => new MajorResource($major),
                ]) : throw new Exception("Data Jurusan gagal diupdate");
        } catch (Exception $exception){
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
                'result' => null,
            ], 422);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Major $major)
    {
        try {
            return $major->delete()
                ? response([
                    'success' => true,
                    'message' => "Data Jurusan berhasil dihapus",
                    'result' => new MajorResource($major),
                ]) : throw new Exception("Data Jurusan gagal dihapus");
        } catch (Exception $exception){
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
                'result' => null,
            ], 422);
        }
    }
}
