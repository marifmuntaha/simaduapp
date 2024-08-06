<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClassroomRequest;
use App\Http\Requests\UpdateClassroomRequest;
use App\Http\Resources\ClassroomResource;
use App\Models\Classroom;
use Exception;
use Illuminate\Http\Request;

class ClassroomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $classrooms = new Classroom();
        $classrooms = $request->has('institution_id') ? $classrooms->whereInstitutionId($request->input('institution_id')) : $classrooms;
        $classrooms = $request->has('year_id') ? $classrooms->whereYearId($request->input('year_id')) : $classrooms;
        return response([
            'success' => true,
            'message' => null,
            'result' => ClassroomResource::collection($classrooms->get())
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClassroomRequest $request)
    {
        try {
            return ($classroom = Classroom::create($request->all()))
                ? response([
                    'success' => true,
                    'message' => 'Data rombel berhasil ditambahkan',
                    'result' => new ClassroomResource($classroom)
                ], 201) : throw new Exception('Data rombel gagal ditambahkan');
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
    public function show(Classroom $classroom)
    {
        return response([
            'success' => true,
            'message' => null,
            'result' => new ClassroomResource($classroom)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClassroomRequest $request, Classroom $classroom)
    {
        try {
            return $classroom->update(array_filter($request->all()))
            ? response([
                'success' => true,
                'message' => 'Data rombel berhasil diubah',
                'result' => new ClassroomResource($classroom)
            ]) : throw new Exception('Data rombel gagal diubah');
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
    public function destroy(Classroom $classroom)
    {
        try {
            return $classroom->delete()
                ? response([
                    'success' => true,
                    'message' => 'Data rombel berhasil dihapus',
                    'result' => new ClassroomResource($classroom)
                ]) : throw new Exception('Data rombel gagal dihapus');
        } catch (Exception $exception){
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
                'result' => null
            ], 422);
        }
    }
}
