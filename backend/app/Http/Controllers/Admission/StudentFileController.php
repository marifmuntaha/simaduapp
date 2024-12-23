<?php

namespace App\Http\Controllers\Admission;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admission\StoreStudentFileRequest;
use App\Http\Requests\Admission\UpdateStudentFileRequest;
use App\Http\Resources\Admission\StudentFileResource;
use App\Models\Admission\StudentFile;
use Exception;
use Illuminate\Http\Request;

class StudentFileController extends Controller
{
    public function index(Request $request)
    {
        $files = new StudentFile();
        $files = $request->has('student_id') ? $files->whereStudentId($request->input('student_id')) : $files;
        return response([
            'success' => true,
            'message' => null,
            'result' => StudentFileResource::collection($files->get())
        ]);
    }

    public function store(StoreStudentFileRequest $request)
    {
        try {
            if ($file = StudentFile::create($request->all())) {
                return response([
                    'success' => true,
                    'message' => 'Data berkas berhasil disimpan',
                    'result' => new StudentFileResource($file)
                ], 201);
            } else {
                throw new Exception('Data berkas gagal disimpan');
            }
        } catch (Exception $exception) {
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
                'result' => null
            ], 422);
        }
    }

    public function show(StudentFile $studentFile)
    {
        return response([
            'success' => true,
            'message' => null,
            'result' => new StudentFileResource($studentFile)
        ]);
    }

    public function update(UpdateStudentFileRequest $request, StudentFile $studentFile)
    {
        try {
            return ($studentFile->update(array_filter($request->all())))
                ? response([
                    'success' => true,
                    'message' => 'Data berkas berhasil diperbarui',
                    'result' => new StudentFileResource($studentFile)
                ]) : throw new Exception('Data berkas gagal diperbarui');
        } catch (Exception $exception) {
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
                'result' => null
            ], 422);
        }
    }

    public function destroy(StudentFile $studentFile)
    {
        try {
            return ($studentFile->delete())
                ? response([
                    'success' => true,
                    'message' => 'Data berkas berhasil dihapus',
                    'result' => new StudentFileResource($studentFile)
                ]) : throw new Exception('Data berkas gagal dihapus');
        } catch (Exception $exception) {
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
                'result' => null
            ], 422);
        }
    }
}
