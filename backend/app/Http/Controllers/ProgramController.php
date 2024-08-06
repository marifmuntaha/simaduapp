<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProgramRequest;
use App\Http\Requests\UpdateProgramRequest;
use App\Http\Resources\ProgramResource;
use App\Models\Program;
use Exception;
use Illuminate\Http\Request;

class ProgramController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $program = new Program();
        $program = $request->has('institution_id') ? $program->whereInstitutionId($request->input('institution_id')) : $program;
        $program = $request->has('year_id') ? $program->whereYearId($request->input('year_id')) : $program;
        return response([
            'success' => true,
            'message' => null,
            'result' => ProgramResource::collection($program->get())
        ]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProgramRequest $request)
    {
        try {
            return ($program = Program::create($request->all()))
                ? response([
                    'success' => true,
                    'message' => 'Data Program berhasil ditambahkan',
                    'result' => new ProgramResource($program)
                ], 201) : throw new Exception('Data Program gagal ditambahkan');
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
    public function show(Program $program)
    {
        return response([
            'success' => true,
            'message' => null,
            'result' => new ProgramResource($program)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProgramRequest $request, Program $program)
    {
        try {
            return $program->update(array_filter($request->all()))
                ? response([
                    'success' => true,
                    'message' => 'Data Program berhasil diubah',
                    'result' => new ProgramResource($program)
                ]) : throw new Exception('Data Program gagal diubah');
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
    public function destroy(Program $program)
    {
        try {
            return $program->delete()
                ? response([
                    'success' => true,
                    'message' => 'Data Program berhasil dihapus',
                    'result' => new ProgramResource($program)
                ]) : throw new Exception('Data Program gagal dihapus');
        } catch (Exception $exception){
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
                'result' => null
            ], 422);
        }
    }
}
