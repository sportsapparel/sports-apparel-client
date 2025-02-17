"use client";
import { Carousel } from "@/components/Carousal";
import { ProductGrid } from "@/components/ProductCard";
import { products } from "@/constants";
import { useFetchData } from "@/hooks/useFetchData";
import { fetchCategoriesData } from "@/lib/apiFuntions";
import { Category } from "@/types";

const Shop = () => {
  const { data } = useFetchData<Category[]>(fetchCategoriesData);

  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen py-10 
  "
    >
      {/* Categories Section */}
      <section className="w-full  px-4 mb-12">
        <h1 className="text-4xl  text-center text-gray-800 mb-8">Categories</h1>
        <div className="w-full">
          <Carousel images={data as any} />
        </div>
      </section>

      {/* All Products Section */}
      <section className="w-full  px-4">
        <h1 className="text-4xl  text-center text-gray-800 mb-8">
          All Products
        </h1>
        <div className="w-full">
          <ProductGrid
            className="grid grid-cols-4 lg:grid-cols-3 gap-10 md:grid-cols-2 sm-to-xs:grid-cols-1 sm-to-xs:p-20 xs:p-10"
            products={products}
            initialPerPage={8}
            perPage={8}
          />
        </div>
      </section>
    </main>
  );
};

export default Shop;
