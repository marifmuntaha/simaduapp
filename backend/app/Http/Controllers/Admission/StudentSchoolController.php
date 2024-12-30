<?php

namespace App\Http\Controllers\Admission;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admission\StoreStudentSchoolRequest;
use App\Http\Requests\Admission\UpdateStudentSchoolRequest;
use App\Http\Resources\Admission\StudentSchoolResource;
use App\Models\Admission\StudentSchool;
use Exception;
use Illuminate\Http\Request;

class StudentSchoolController extends Controller
{
    public function index(Request $request)
    {
        $school = new StudentSchool();
        $school = $request->has('student_id') ? $school->whereStudentId($request->input('student_id')) : $school;
        return response([
            'success' => true,
            'message' => null,
            'result' => StudentSchoolResource::collection($school->get()),
        ]);
    }
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

    public function update(UpdateStudentSchoolRequest $request, StudentSchool $school)
    {
        try {
            return $school->update(array_filter($request->all()))
                ? response([
                    'success' => true,
                    'message' => 'Data Sekolah berhasil diubah',
                    'result' => new StudentSchoolResource($school)
                ]) : throw new Exception('Data Sekolah gagal diubah');
        } catch (Exception $exception) {
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
                'result' => null
            ], $exception->getCode());
        }
    }

    public function destroy(StudentSchool $school)
    {
        try {
            return $school->delete()
                ? response([
                    'success' => true,
                    'message' => 'Data Sekolah berhasil dihapus',
                    'result' => new StudentSchoolResource($school)
                ]) : throw new Exception('Data Sekolah gagal dihapus');
        } catch (Exception $exception) {
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
                'result' => null
            ], $exception->getCode());
        }
    }
}
