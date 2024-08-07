<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Http\Resources\StudentResource;
use App\Models\Student;
use App\Models\StudentParent;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $students = new Student();
        return response([
            'success' => true,
            'message' => null,
            'result' => StudentResource::collection($students->get())
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentRequest $request)
    {
        try {
            return ($student = Student::create([$request->all()]))
                ? response([
                    'success' => true,
                    'message' => 'Siswa '.$student->name.' berhasil ditambahkan',
                    'result' => new StudentResource($student)
                ]) : throw new Exception('Siswa '.$student->name.' gagal ditambahkan');
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
    public function show(Student $student)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Student $student)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentRequest $request, Student $student)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        //
    }
}
