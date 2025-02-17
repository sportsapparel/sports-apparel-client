"use client";
import { Carousel } from "@/components/Carousal";
import { Pagination } from "@/components/Common";
import { ProductCard, ProductGrid } from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { useFetchData } from "@/hooks/useFetchData";
import { useFilteredData } from "@/hooks/useFilteredData";
import { fetchAllProducts, fetchCategoriesData } from "@/lib/apiFuntions";
import { Category } from "@/types";
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
  const { data } = useFetchData<Category[]>(fetchCategoriesData);
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
    <main className="flex flex-col items-center justify-center min-h-screen py-10">
      {/* Categories Section */}
      <section className="w-full px-4 mb-12">
        <h1 className="text-4xl text-center text-gray-800 mb-8">Categories</h1>
        <div className="w-full">
          <Carousel link={`/category`} images={data as any} />
        </div>
      </section>

      {/* All Products Section */}
      <section className="w-full px-4 container-c">
        <h1 className="text-4xl text-center text-gray-800 mb-8">
          All Products
        </h1>
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search by name, slug, category, or subcategory"
        />
        <div className="w-full">
          <div className="grid grid-cols-4 lg:grid-cols-3 gap-10 md:grid-cols-2 sm-to-xs:grid-cols-1 sm-to-xs:p-20 xs:p-10">
            {filterProductData?.map((product: any, index: any) => (
              <ProductCard
                key={index}
                id={product.id}
                imageUrl={product.thumbnail.imageUrl}
                title={product.name}
                description={product.description}
              />
            ))}
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
  );
};

export default Shop;
