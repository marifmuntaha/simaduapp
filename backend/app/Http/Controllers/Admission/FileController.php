<?php

namespace App\Http\Controllers\Admission;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admission\StoreFileRequest;
use App\Http\Requests\Admission\UpdateFileRequest;
use App\Http\Resources\Admission\FileResource;
use App\Models\Admission\File;
use Exception;
use Illuminate\Http\Request;

class FileController extends Controller
{
    public function index(Request $request)
    {
        $files = new File();
        $files = $request->has('institution_id') ? $files->whereInstitutionId($request->institution_id) : $files;
        $files = $request->has('year_id') ? $files->whereYearId($request->year_id) : $files;
        return response([
            'success' => true,
            'message' => null,
            'result' => FileResource::collection($files->get())
        ]);
    }

    public function store(StoreFileRequest $request)
    {
        try {
            return ($file = FIle::create($request->all()))
                ? response([
                    'success' => true,
                    'message' => 'Data Berkas berhasil disimpan.',
                    'result' => new FileResource($file)
                ], 201) : throw new Exception('Data Berkas gagal disimpan.');
        } catch (Exception $exception) {
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
                'result' => null
            ], 422);
        }
    }

    public function show(File $file)
    {
        return response([
            'success' => true,
            'message' => null,
            'result' => new FileResource($file)
        ]);
    }

    public function update(UpdateFileRequest $request, File $file)
    {
        try {
            return $file->update(array_filter($request->all()))
                ? response([
                    'success' => true,
                    'message' => 'Data Berkas berhasil diperbarui.',
                    'result' => new FileResource($file)
                ]) : throw new Exception('Data Berkas gagal diperbarui.');
        } catch (Exception $exception) {
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
                'result' => null
            ], 422);
        }
    }


    public function destroy(File $file)
    {
        try {
            return $file->delete()
                ? response([
                    'success' => true,
                    'message' => 'Data Berkas berhasil dihapus.',
                    'result' => new FileResource($file)
                ]) : throw new Exception('Data Berkas gagal dihapus.');
        } catch (Exception $exception) {
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
                'result' => null
            ], 422);
        }
    }
}
