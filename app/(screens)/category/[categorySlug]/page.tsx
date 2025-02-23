"use client";
import CategorySection from "@/components/Category";
import { Pagination } from "@/components/Common";
import { ProductCard } from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { ProductCardSkeleton } from "@/components/Skeleton";
import { useFetchData } from "@/hooks/useFetchData";
import { useFilteredData } from "@/hooks/useFilteredData";
import {
  fetchProductsDataByCategorySlug,
  fetchSubCatgoriesDataByCategorySlug,
} from "@/lib/apiFuntions";
import { Subcategory } from "@/types";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

const Category = () => {
  const { categorySlug } = useParams();
  const [itemsPerPage, setitemsPerPage] = useState(3);

  const fetchSubCatgories = useMemo(() => {
    if (typeof categorySlug === "string") {
      return () => fetchSubCatgoriesDataByCategorySlug(categorySlug);
    }
    return null;
  }, [categorySlug]);

  const {
    data: subcategories = {} as Subcategory,
    loading: subCategoryLoading,
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
  } = useFetchData(
    fetchProducts ?? (() => Promise.reject(new Error("Invalid user ID")))
  );
  const {
    filteredData: filterProductData,
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    totalPages,
  } = useFilteredData(products || [], {
    searchKeys: ["name", "slug", "category.name", "subcategory.name"],
    itemsPerPage: itemsPerPage,
  });
  console.log(subcategories, "subcategories");
  console.log(products, "products");
  return (
    <main className="container-c">
      {/* <section className="w-full  mb-12">
        <h1 className="text-4xl  text-center text-gray-800 mb-8">
          Sub Categories for <span className="uppercase">{categorySlug}</span>
        </h1>
        <div className="">
          {subCategoryLoading ? (
            <CarouselSkeleton />
          ) : (
            <Carousel
              link={`/category/${categorySlug}`}
              images={subcategories as any}
            />
          )}
        </div>
      </section> */}
      <CategorySection
        categoryLoading={subCategoryLoading}
        data={subcategories as any}
        link={`/category/${categorySlug}`}
        title={`Sub Categories for ${categorySlug}`}
      />

      <section className="w-full  px-4">
        <h1 className="text-4xl  text-center text-gray-800 mb-8">
          Products For <span className="uppercase">{categorySlug}</span>
        </h1>
        <div className="w-full space-y-10 py-10">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search by name, slug, category, or subcategory"
          />
          <div className="grid grid-cols-4 lg:grid-cols-3 gap-10 md:grid-cols-2 sm-to-xs:grid-cols-1 sm-to-xs:p-20 xs:p-10">
            {productLoading ? (
              [...Array(itemsPerPage)].map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            ) : filterProductData.length > 0 ? (
              filterProductData?.map((product: any, index: any) => (
                <ProductCard
                  key={index}
                  id={product.id}
                  imageUrl={product.image}
                  title={product.name}
                  description={product.description}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center col-span-full p-10">
                <h4 className="text-gray-600  uppercase">No product found</h4>
              </div>
            )}
          </div>
        </div>
      </section>
      <Pagination
        onPerPageChange={setitemsPerPage}
        totalItems={Number(products?.length)}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </main>
  );
};

export default Category;
