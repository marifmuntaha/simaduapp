<?php

namespace App\Http\Controllers\Admission;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admission\UpdateSettingRequest;
use App\Http\Resources\Admission\SettingResource;
use App\Models\Admission\Setting;
use Exception;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $setting = new Setting;
        $setting = $request->has('institution') ? $setting->whereInstitutionID($request->get('institution_id')) : $setting;
        return response([
            'success' => true,
            'message' => null,
            'result' => SettingResource::collection($setting->get()),
        ]);
    }


    /**
     * Display the specified resource.
     */
    public function show(Setting $setting)
    {
        return response([
            'success' => true,
            'message' => null,
            'result' => SettingResource::make($setting),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSettingRequest $request, Setting $setting)
    {
        try {
            return $setting->update(array_filter($request->all()))
                ? response([
                    'success' => true,
                    'message' => 'Pengaturan berhasil disimpan',
                    'result' => SettingResource::make($setting),
                ]) : throw new Exception('Pengaturan gagal disimpan');
        } catch (Exception $e) {
            return response([
                'success' => false,
                'message' => $e->getMessage(),
                'result' => null,
            ],422);
        }
    }

}
