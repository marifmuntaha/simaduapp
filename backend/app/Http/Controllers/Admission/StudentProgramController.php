<?php

namespace App\Http\Controllers\Admission;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admission\StoreStudentProgramRequest;
use App\Http\Resources\Admission\StudentProgramResource;
use App\Models\Admission\StudentProgram;
use Exception;
use Illuminate\Http\Request;

class StudentProgramController extends Controller
{
    public function store(StoreStudentProgramRequest $request)
    {
        try {
            return ($program = StudentProgram::create($request->all()))
                ? response([
                    'success' => true,
                    'message' => 'Data Program berhasil ditambahkan',
                    'result' => new StudentProgramResource($program)
                ]) : throw new Exception('Data Program gagal ditambahkan');
        } catch (Exception $exception) {
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
                'result' => null
            ],422);
        }
    }
}
