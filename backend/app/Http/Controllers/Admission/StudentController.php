<?php

namespace App\Http\Controllers\Admission;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admission\StoreStudentRequest;
use App\Http\Requests\Admission\UpdateStudentRequest;
use App\Http\Resources\Admission\StudentResource;
use App\Models\Admission\Student;
use Exception;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        $student = new Student();
        return response([
            'success' => true,
            'message' => null,
            'result' => StudentResource::collection($student->get())
        ]);
    }

    public function store(StoreStudentRequest $request)
    {
        try {
            return ($student = Student::create($request->all()))
                ? response([
                    'success' => true,
                    'message' => "Data Pendaftar berhasil disimpan.",
                    'result' => new StudentResource($student)
                ], 201) : throw new Exception("Data Pendaftar gagal disimpan.", 442);
        } catch (Exception $e) {
            return response([
                'success' => false,
                'message' => $e->getMessage(),
                'result' => null
            ], $e->getCode());
        }
    }

    public function show(Student $student)
    {
        return response([
            'success' => true,
            'message' => null,
            'result' => new StudentResource($student)
        ]);
    }

    public function update(UpdateStudentRequest $request, Student $student)
    {
        try {
            return ($student->update(array_filter($request->all())))
                ? response([
                    'success' => true,
                    'message' => "Data Pendaftar berhasil diperbarui.",
                    'result' => new StudentResource($student)
                ]) : throw new Exception("Data Pendaftar gagal diperbarui.", 442);
        } catch (Exception $e) {
            return response([
                'success' => false,
                'message' => $e->getMessage(),
                'result' => null
            ], $e->getCode());
        }
    }

    public function destroy(Student $student)
    {
        try {
            return ($student->delete())
                ? response([
                    'success' => true,
                    'message' => "Data Pendaftar berhasil dihapus.",
                    'result' => new StudentResource($student)
                ]) : throw new Exception("Data Pendaftar gagal dihapus.", 442);
        } catch (Exception $e) {
            return response([
                'success' => false,
                'message' => $e->getMessage(),
                'result' => null
            ], $e->getCode());
        }
    }
}
