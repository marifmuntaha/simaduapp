<?php

namespace App\Http\Controllers\Admission;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admission\StoreStudentSchoolRequest;
use App\Http\Resources\Admission\StudentSchoolResource;
use App\Models\Admission\StudentSchool;
use Exception;

class StudentSchoolController extends Controller
{
    public function store(StoreStudentSchoolRequest $request)
    {
        try {
            return ($school = StudentSchool::create($request->all()))
                ? response([
                    'success' => true,
                    'message' => 'Data Sekolah berhasil ditambahkan',
                    'result' => new StudentSchoolResource($school)
                ]) : throw new Exception('Data Sekolah gagal ditambahkan');
        } catch (Exception $exception) {
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
                'result' => null
            ], 422);
        }
    }
}
