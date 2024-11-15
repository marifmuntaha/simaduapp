<?php

namespace App\Http\Controllers\Admission;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admission\StoreProgramRequest;
use App\Http\Requests\Admission\UpdateProgramRequest;
use App\Http\Resources\Admission\ProgramResource;
use App\Models\Admission\Program;
use Exception;
use Illuminate\Http\Request;

class ProgramController extends Controller
{
    public function index(Request $request)
    {
        $program = new Program();
        return response([
            'success' => true,
            'message' => null,
            'result' => ProgramResource::collection($program->get()),
        ]);
    }

    public function store(StoreProgramRequest $request)
    {
        try {
            return ($program = Program::create($request->all()))
                ? response([
                    'success' => true,
                    'message' => 'Data Program berhasil ditambahkan',
                    'result' => new ProgramResource($program),
                ], 201) : throw new Exception('Data Program gagal ditambahkan');
        } catch (Exception $e) {
            return response([
                'success' => false,
                'message' => $e->getMessage(),
                'result' => null,
            ], 422);
        }
    }

    public function show(Program $program)
    {
        return response([
            'success' => true,
            'message' => null,
            'result' => new ProgramResource($program),
        ]);
    }

    public function update(UpdateProgramRequest $request, Program $program)
    {
        try {
            return $program->update(array_filter($request->all()))
                ? response([
                    'success' => true,
                    'message' => 'Data Program berhasil diubah',
                    'result' => new ProgramResource($program),
                ]) : throw new Exception('Data Program gagal diubah');
        } catch (Exception $e) {
            return response([
                'success' => false,
                'message' => $e->getMessage(),
                'result' => null,
            ], 422);
        }
    }

    public function destroy(Program $program)
    {
        try {
            return $program->delete()
                ? response([
                    'success' => true,
                    'message' => 'Data Program berhasil dihapus',
                    'result' => new ProgramResource($program),
                ]) : throw new Exception('Data Program gagal dihapus');
        } catch (Exception $e) {
            return response([
                'success' => false,
                'message' => $e->getMessage(),
                'result' => null,
            ], 422);
        }
    }
}
