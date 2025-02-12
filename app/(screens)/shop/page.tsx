"use client";
import {
  ImageWithFallback,
  ProductCard,
  ProductGrid,
} from "@/components/ProductCard";
import { products } from "@/constants";
import { useFetchData } from "@/hooks/useFetchData";
import { fetchCatgoriesData } from "@/lib/apiFuntions";
import { Category } from "@/types";
const Shop = () => {
  const { data } = useFetchData<Category[]>(fetchCatgoriesData);
  return (
    <main className="pb-10">
      <h1 className="text-center  pb-16">All Products</h1>
      <div className="grid grid-cols-10  container-c max-w-full overflow-auto gap-5">
        {data?.map((callout) => (
          <ProductCard
            key={callout.id}
            imageUrl={callout.image}
            title={callout.name}
            description={callout.description}
          />
        ))}
      </div>
      <ProductGrid
        className="grid grid-cols-4 lg:grid-cols-3 gap-10 md:grid-cols-2 sm-to-xs:grid-cols-1 sm-to-xs:p-20 xs:p-10"
        products={products}
        initialPerPage={8}
        perPage={8}
      />
    </main>
  );
};

export default Shop;
