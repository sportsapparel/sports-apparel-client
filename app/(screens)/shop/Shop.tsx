"use client";
import CategorySection from "@/components/Category";
import { Pagination } from "@/components/Common";
import { ProductCard } from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { ProductCardSkeleton } from "@/components/Skeleton";
import { useFetchData } from "@/hooks/useFetchData";
import { useFilteredData } from "@/hooks/useFilteredData";
import { fetchAllProducts, fetchCategoriesData } from "@/lib/apiFuntions";
import { Category } from "@/types";
import Head from "next/head";
import { useState } from "react";

interface ThumbnailImage {
  id: number;
  imageUrl: string;
  originalName: string;
  altText: string | null;
}

interface StructuredData {
  [key: string]: any;
}
export interface ProductData {
  [key: string]: any; // This allows any additional string indexing

  id: string;
  name: string;
  slug: string;
  description: string;

  // SEO-specific fields
  metaTitle: string | null;
  metaDescription: string | null;
  keywords: string | null;
  canonicalUrl: string | null;
  structuredData: StructuredData | null;

  // Relationships
  thumbnail: ThumbnailImage | null;
}

const Shop = () => {
  const { data, loading: categoryLoading } =
    useFetchData<Category[]>(fetchCategoriesData);
  const [itemsPerPage, setitemsPerPage] = useState(3);
  const {
    data: products,
    loading,
    error,
    refetch,
  } = useFetchData<ProductData[]>(fetchAllProducts);

  const {
    filteredData: filterProductData,
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    totalPages,
  } = useFilteredData<ProductData>(products || [], {
    searchKeys: ["name", "slug", "category.name", "subcategory.name"],
    itemsPerPage: itemsPerPage,
  });
  return (
    <>
      <main className=" py-5 container-c">
        {/* Categories Section */}
        <CategorySection
          categoryLoading={categoryLoading}
          data={data as any}
          link="/category"
          title="Categories"
        />

        {/* All Products Section */}
        <section className="w-full px-4 container-c min-h-dvh">
          <h1 className="text-4xl uppercase text-center text-gray-800 mb-8">
            Products
          </h1>
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search by name, slug, category, or subcategory"
          />
          <div className="w-full space-y-10 py-10">
            <div className="grid grid-cols-4 lg:grid-cols-3 gap-10 md:grid-cols-2 sm-to-xs:grid-cols-1 sm-to-xs:p-20 xs:p-10">
              {loading ? (
                [...Array(itemsPerPage)].map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))
              ) : filterProductData.length > 0 ? (
                filterProductData?.map((product: any, index: any) => (
                  <ProductCard
                    key={index}
                    id={product.id}
                    imageUrl={product.thumbnail.imageUrl}
                    title={product.name}
                    description={product.description}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center col-span-full p-10">
                  <p className="text-gray-600 text-xs uppercase">
                    No product found
                  </p>
                </div>
              )}
            </div>
            <Pagination
              onPerPageChange={setitemsPerPage}
              totalItems={Number(products?.length)}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default Shop;
