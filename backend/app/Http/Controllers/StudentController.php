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
            $userStudent = User::create([
                'fullname' => $request->name,
                'email' => $request->email,
                'username' => $request->nisn,
                'password' => 'password',
                'role' => 8,
                'phone' => $request->phone,
                'image' => ''
            ]);
            $userParent = User::firstOrNew([
                'username' => $request->guard_nik,
                'email' => 'testingParent@gmail.com',
                'fullname' => $request->guard_name,
                'password' => 'password',
                'role' => 9,
                'phone' => '0002232323',
                'image' => ''
            ]);
            $userParent->save();
            $parent = StudentParent::create([
                'user_id' => $userParent->id,
                'father_name' => $request->father_name,
                'mother_name' => $request->mother_name,
                'guard_nik' => $request->guard_nik,
                'guard_name' => $request->guard_name,
            ]);
            return ($student = Student::create([
                'user_id' => $userStudent->id,
                'nism' => $request->nism,
                'nisn' => $request->nisn,
                'nik' => $request->nik,
                'name' => $request->name,
                'birthplace' => $request->birthplace,
                'birthdate' => $request->birthdate,
                'gender' => $request->gender,
                'orderborn' => $request->orderborn,
                'sibling' => $request->sibling,
                'phone' => $request->phone,
                'province_id' => $request->province_id,
                'city_id' => $request->city_id,
                'district_id' => $request->district_id,
                'village_id' => $request->village_id,
                'address' => $request->address,
                'boarding' => $request->boarding,
                'onevervalpd' => $request->onevervalpd,
                'parent_id' => $parent->id,
                'creator' => $request->user('sanctum')->id,
                'updater' => $request->user('sanctum')->id,
            ]))
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
