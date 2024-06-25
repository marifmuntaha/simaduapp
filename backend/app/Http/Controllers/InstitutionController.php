<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInstitutionRequest;
use App\Http\Requests\UpdateInstitutionRequest;
use App\Http\Resources\InstitutionResource;
use App\Models\Institution;
use Exception;
use Illuminate\Http\Request;

class InstitutionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $institutions = new Institution();
        $institutions = $request->has('user_id') ? $institutions->whereHas('user', function ($user) use ($request){
            $user->where('user_id', $request->input('user_id'));
        }) : $institutions;
        return response([
            'success' => true,
            'message' => null,
            'result' => InstitutionResource::collection($institutions->get())
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInstitutionRequest $request)
    {
        try {
            return ($institution = Institution::create($request->except('user_id'))) && $institution->user()->sync($request->input('user_id'))
                ? response([
                    'success' => true,
                    'message' => 'Data Lembaga Berhasil Disimpan',
                    'result' => new InstitutionResource($institution)
                ], 201) : throw new Exception('Data Lembaga Gagal Disimpan');
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
    public function show(Institution $institution)
    {
        return response([
            'success' => true,
            'message' => null,
            'result' => new InstitutionResource($institution)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInstitutionRequest $request, Institution $institution)
    {
        try {
            return $institution->update(array_filter($request->except('user_id'))) && $institution->user()->sync($request->input('user_id'))
                ? response([
                    'success' => true,
                    'message' => 'Data Lembaga Berhasil Diupdate',
                    'result' => new InstitutionResource($institution)
                ]) : throw new Exception('Data Lembaga Gagal Diupdate');
        } catch (Exception $exception) {
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
                'result' => null
            ], 422);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Institution $institution)
    {
        try {
            return $institution->user()->detach($institution->user()->first()->id) && $institution->delete()
                ? response([
                    'success' => true,
                    'message' => 'Data Lembaga Berhasil Dihapus',
                    'result' => new InstitutionResource($institution)
                ]) : throw new Exception('Data Lembaga Gagal Dihapus');
        } catch (Exception $exception) {
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
                'result' => null
            ], 422);
        }
    }
}
