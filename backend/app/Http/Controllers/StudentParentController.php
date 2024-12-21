<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudentParentRequest;
use App\Http\Requests\UpdateStudentParentRequest;
use App\Http\Resources\Admission\StudentParentResource;
use App\Models\StudentParent;
use Exception;

class StudentParentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentParentRequest $request)
    {
        try {
            return ($studentParent = StudentParent::create([$request->all()]))
                ? response([
                    'success' => true,
                    'message' => 'Siswa '.$studentParent->name.' berhasil ditambahkan',
                    'result' => new StudentParentResource($studentParent)
                ]) : throw new Exception('Siswa '.$studentParent->name.' gagal ditambahkan');
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
    public function show(StudentParent $studentParent)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StudentParent $studentParent)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentParentRequest $request, StudentParent $studentParent)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StudentParent $studentParent)
    {
        //
    }
}
