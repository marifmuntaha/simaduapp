<?php

namespace App\Http\Controllers\Admission;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admission\StoreStudentParentRequest;
use App\Http\Requests\Admission\UpdateStudentParentRequest;
use App\Http\Resources\Admission\StudentParentResource;
use App\Models\Admission\StudentParent;
use Exception;
use Illuminate\Http\Request;

class StudentParentController extends Controller
{
    public function index()
    {

    }

    public function store(StoreStudentParentRequest $request)
    {
        try {
            if ($parent = StudentParent::create($request->all())) {
                $parent->student()->sync($request->student_id);
                return response([
                    'success' => true,
                        'message' => 'Data Orangtua berhasil disimpan.',
                        'result' => new StudentParentResource($parent)
                    ], 201);
            } else {
                throw new Exception('Data orangtua gagal disimpan.');
            }
        } catch (Exception $exception) {
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
                'result' => null
            ], 422);
        }
    }

    public function update(UpdateStudentParentRequest $request, StudentParent $parent)
    {
        try {
            return $parent->update(array_filter($request->all()))
                ? response([
                    'success' => true,
                    'message' => 'Data Orangtua berhasil diperbarui.',
                    'result' => new StudentParentResource($parent)
                ]) : throw new Exception('Data Orangtua gagal diperbarui.');
        } catch (Exception $exception){
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
                'result' => null
            ], $exception->getCode());
        }
    }

    public function show(StudentParent $parent)
    {
        return response([
            'success' => true,
            'message' => null,
            'result' => new StudentParentResource($parent)
        ]);
    }
    public function destroy(StudentParent $parent)
    {

    }
}
