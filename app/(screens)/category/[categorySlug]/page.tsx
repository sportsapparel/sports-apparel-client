"use client";
import { Carousel } from "@/components/Carousal";
import { ProductCard, ProductGrid } from "@/components/ProductCard";
import { useFetchData } from "@/hooks/useFetchData";
import {
  fetchProductsDataByCategorySlug,
  fetchSubCatgoriesDataByCategorySlug,
} from "@/lib/apiFuntions";
import { Subcategory } from "@/types";
import { useParams } from "next/navigation";
import React, { useMemo } from "react";

const Category = () => {
  const { categorySlug } = useParams();

  const fetchSubCatgories = useMemo(() => {
    if (typeof categorySlug === "string") {
      return () => fetchSubCatgoriesDataByCategorySlug(categorySlug);
    }
    return null;
  }, [categorySlug]);

  const {
    data: subcategories = {} as Subcategory,
    loading,
    // error,
    refetch,
  } = useFetchData<Subcategory>(
    fetchSubCatgories ?? (() => Promise.reject(new Error("Invalid user ID")))
  );
  const fetchProducts = useMemo(() => {
    if (typeof categorySlug === "string") {
      return () => fetchProductsDataByCategorySlug(categorySlug);
    }
    return null;
  }, [categorySlug]);

  const {
    data: products = {} as any,
    loading: productLoading,
    // error,
    refetch: productRefetch,
  } = useFetchData<Subcategory>(
    fetchProducts ?? (() => Promise.reject(new Error("Invalid user ID")))
  );

  console.log(subcategories, "subcategories");
  console.log(products, "products");
  return (
    <>
      <section className="w-full  px-4 mb-12">
        <h1 className="text-4xl  text-center text-gray-800 mb-8">
          Sub Categories for <span className="uppercase">{categorySlug}</span>
        </h1>
        <div className="">
          <Carousel
            link={`/category/${categorySlug}`}
            images={subcategories as any}
          />
        </div>
      </section>
      <section className="w-full  px-4">
        <h1 className="text-4xl  text-center text-gray-800 mb-8">
          All Products For <span className="uppercase">{categorySlug}</span>
        </h1>
        <div className="w-full">
          <div className="grid grid-cols-4 lg:grid-cols-3 gap-10 md:grid-cols-2 sm-to-xs:grid-cols-1 sm-to-xs:p-20 xs:p-10">
            {products?.map((product: any, index: any) => (
              <ProductCard
                key={index}
                id={product.id}
                imageUrl={product.image}
                title={product.name}
                description={product.description}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Category;
