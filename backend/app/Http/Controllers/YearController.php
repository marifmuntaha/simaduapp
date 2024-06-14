<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreYearRequest;
use App\Http\Requests\UpdateYearRequest;
use App\Http\Resources\YearResource;
use App\Models\Year;
use Exception;

class YearController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $years = new Year();
        return response([
            'success' => true,
            'message' => null,
            'result' => YearResource::collection($years->get()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreYearRequest $request)
    {
        try {
            return ($year = Year::create($request->all()))
                ? response([
                    'success' => true,
                    'message' => 'Tahun Pelajaran Berhasil Disimpan',
                    'result' => new YearResource($year),
                ], 201) : throw new Exception("Terjadi kesalahan saat menyimpan data");
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
    public function show(Year $year)
    {
        return response([
            'success' => true,
            'message' => null,
            'result' => new YearResource($year),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateYearRequest $request, Year $year)
    {
        try {
            return $year->update(array_filter($request->all()))
                ? response([
                    'success' => true,
                    'message' => 'Tahun Pelajaran berhasil diperbarui',
                    'result' => new YearResource($year),
                ]) : throw new Exception("Terjadi kesalahan saat menyimpan data");
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
    public function destroy(Year $year)
    {
        try {
            return $year->delete()
                ? response([
                    'success' => true,
                    'message' => 'Tahun Pelajaran Berhasil Dihapus',
                    'result' => new YearResource($year),
                ]) : throw new Exception("Terjadi kesalahan saat menghapus data");
        } catch (Exception $exception){
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
                'result' => null,
            ], 422);
        }
    }
}
