<?php

namespace App\Http\Controllers\Admission;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admission\StoreStudentAddressRequest;
use App\Http\Requests\Admission\UpdateStudentAddressRequest;
use App\Http\Resources\Admission\StudentAddressResource;
use App\Models\Admission\StudentAddress;
use Exception;
use Illuminate\Http\Request;

class StudentAddressController extends Controller
{
    public function store(StoreStudentAddressRequest $request)
    {
        try {
            return ($address = StudentAddress::create($request->all()))
                ? response([
                    'success' => true,
                    'message' => 'Data Alamat berhasil disimpan.',
                    'result' => new StudentAddressResource($address)
                ], 201) : throw new Exception("Data Alamat gagal disimpan.");
        } catch (Exception $exception){
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
                'result' => null
            ], 422);
        }
    }

    public function show(StudentAddress $studentAddress)
    {
        return response([
            'success' => true,
            'message' => 'Data Alamat berhasil ditampilkan.',
            'result' => new StudentAddressResource($studentAddress)
        ]);
    }

    public function update(UpdateStudentAddressRequest $request, StudentAddress $address)
    {
        try {
            return $address->update(array_filter($request->all()))
                ? response([
                    'success' => true,
                    'message' => 'Data Alamat berhasil diubah.',
                    'result' => new StudentAddressResource($address)
                ]) : throw new Exception("Data Alamat gagal diubah.");
        } catch (Exception $exception){
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
                'result' => null
            ], 422);
        }
    }
}
