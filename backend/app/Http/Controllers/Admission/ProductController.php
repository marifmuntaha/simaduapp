<?php

namespace App\Http\Controllers\Admission;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admission\StoreProductRequest;
use App\Http\Requests\Admission\UpdateProductRequest;
use App\Http\Resources\Admission\ProductResource;
use App\Models\Admission\Product;
use Exception;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $product = new Product();
        $product = $request->has('institution_id') ? $product->whereInstitutionId($request->input('institution_id')) : $product;
        $product = $request->has('year_id') ? $product->whereYearId($request->input('year_id')) : $product;
        return response([
            'success' => true,
            'message' => null,
            'result' => ProductResource::collection($product->get())
        ]);
    }

    public function store(StoreProductRequest $request)
    {
        try {
            return ($product = Product::create($request->all()))
                ? response([
                    'success' => true,
                    'message' => 'Data item berhasil ditambahkan',
                    'result' => new ProductResource($product)
                ], 201) : throw new Exception('Data item gagal ditambahkan');
        } catch (Exception $exception) {
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
                'result' => null
            ], 422);
        }
    }

    public function show(Product $product)
    {
        return response([
            'success' => true,
            'message' => null,
            'result' => new ProductResource($product)
        ]);
    }

    public function update(UpdateProductRequest $request, Product $product)
    {
        try {
            return $product->update(array_filter($request->all()))
                ? response([
                    'success' => true,
                    'message' => 'Data item berhasil diubah',
                    'result' => new ProductResource($product)
                ]) : throw new Exception('Data item gagal diubah');
        } catch (Exception $exception) {
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
                'result' => null
            ], $exception->getCode());
        }
    }

    public function destroy(Product $product)
    {
        try {
            return $product->delete()
                ? response([
                    'success' => true,
                    'message' => 'Data item berhasil dihapus',
                    'result' => new ProductResource($product)
                ]) : throw new Exception('Data item gagal dihapus');
        } catch (Exception $exception) {
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
                'result' => null
            ], $exception->getCode());
        }
    }
}
