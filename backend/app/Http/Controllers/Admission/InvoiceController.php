<?php

namespace App\Http\Controllers\Admission;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admission\StoreInvoiceRequest;
use App\Http\Requests\Admission\UpdateInvoiceRequest;
use App\Http\Resources\Admission\InvoiceResource;
use App\Models\Admission\Invoice;
use Exception;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function index(Request $request)
    {
        $invoices = new Invoice();
        return response([
            'success' => true,
            'message' => null,
            'result' => InvoiceResource::collection($invoices->get())
        ]);
    }

    public function store(StoreInvoiceRequest $request)
    {
        try {
            return ($invoice = Invoice::create($request->all()))
                ? response([
                    'success' => true,
                    'message' => "Data Tagihan berhasil ditambahkan",
                    'result' => new InvoiceResource($invoice)
                ], 201) : throw new Exception("Data Tagihan gagal ditambahkan");
        } catch (Exception $e) {
            return response([
                'success' => false,
                'message' => $e->getMessage(),
                'result' => null
            ], 442);
        }
    }

    public function show(Invoice $invoice)
    {
        return response([
            'success' => true,
            'message' => null,
            'result' => new InvoiceResource($invoice)
        ]);
    }

    public function update(UpdateInvoiceRequest $request, Invoice $invoice)
    {
        try {
            return ($invoice->update(array_filter($request->all())))
                ? response([
                    'success' => true,
                    'message' => "Data Tagihan berhasil diubah",
                    'result' => new InvoiceResource($invoice)
                ]) : throw new Exception("Data Tagihan gagal diubah");
        } catch (Exception $e) {
            return response([
                'success' => false,
                'message' => $e->getMessage(),
                'result' => null
            ], $e->getCode());
        }
    }

    public function destroy(Invoice $invoice)
    {
        try {
            return ($invoice->delete())
                ? response([
                    'success' => true,
                    'message' => "Data Tagihan berhasil dihapus",
                    'result' => new InvoiceResource($invoice)
                ]) : throw new Exception("Data Tagihan gagal dihapus");
        } catch (Exception $e) {
            return response([
                'success' => false,
                'message' => $e->getMessage(),
                'result' => null
            ], $e->getCode());
        }
    }
}
