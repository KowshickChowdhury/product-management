<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::all();
        return inertia('Product', ['products' => $products]);
    }

    public function create()
    {
        // return inertia('Product');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            "name" => ['required'],
            'description' => ['required'],
            "price" => ['required'],
            "stock" => ['required'],
        ]);
        // dd($fields);
        Product::create($fields);
        return redirect('/products')->with('message', 'Product has created!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $fields = $request->validate([
            "name" => ['required'],
            'description' => ['required'],
            "price" => ['required'],
            "stock" => ['required'],
        ]);
        $product = Product::findOrFail($id);
        $product->update($fields);
        return redirect()->back()->with('message', 'Product has Updated!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->back()->with('message', 'Product has Deleted');
    }
}
