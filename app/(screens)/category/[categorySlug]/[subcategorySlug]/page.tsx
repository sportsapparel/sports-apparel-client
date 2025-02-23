import dynamic from "next/dynamic";
// app/category/[categorySlug]/[subcategorySlug]/page.tsx
import { db } from "@/lib/db/db";
import { categories, gallery, products, subcategories } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";

// const { ProductCard } = dynamic(() => import("@/components/ProductCard"), {
//   ssr: false,
// });

// Types
interface PageProps {
  params: Promise<{
    categorySlug: string;
    subcategorySlug: string;
  }>;
}

interface ProductData {
  product: typeof products.$inferSelect;
  thumbnail: typeof gallery.$inferSelect | null;
}

interface PageData {
  category: typeof categories.$inferSelect;
  subcategory: typeof subcategories.$inferSelect;
  products: ProductData[];
}

// Fetch data for the page
async function getPageData(
  categorySlug: string,
  subcategorySlug: string
): Promise<PageData | null> {
  noStore();
  const [categoryData] = await db
    .select()
    .from(categories)
    .where(eq(categories.slug, categorySlug));

  if (!categoryData) return null;

  const [subcategoryData] = await db
    .select()
    .from(subcategories)
    .where(
      and(
        eq(subcategories.slug, subcategorySlug),
        eq(subcategories.categoryId, categoryData.id)
      )
    );

  if (!subcategoryData) return null;

  const productsData = await db
    .select({
      product: products,
      thumbnail: gallery,
    })
    .from(products)
    .leftJoin(gallery, eq(products.thumbnailId, gallery.id))
    .where(
      and(
        eq(products.subcategoryId, subcategoryData.id),
        eq(products.isActive, true)
      )
    );

  return {
    category: categoryData,
    subcategory: subcategoryData,
    products: productsData,
  };
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  noStore();

  const data = await getPageData(params.categorySlug, params.subcategorySlug);

  if (!data) {
    return {
      description: "Category or Subcategory Not Found",
    };
  }

  return {
    title: data.subcategory.metaTitle || data.subcategory.name,
    description:
      data.subcategory.metaDescription || data.subcategory.description,
    keywords: data.subcategory.keywords || "",
    openGraph: {
      title: data.subcategory.metaTitle ?? data.subcategory.name ?? "",
      description:
        data.subcategory.metaDescription ?? data.subcategory.description ?? "",
      url: data.subcategory.canonicalUrl ?? "",
      siteName: "Sports Apparel",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: data.subcategory.metaTitle ?? data.subcategory.name ?? "",
      description:
        data.subcategory.metaDescription ?? data.subcategory.description ?? "",
    },
    alternates: {
      canonical: data.subcategory.canonicalUrl,
    },
  };
}

export default async function SubCategoryPage(props: PageProps) {
  const params = await props.params;
  const data = await getPageData(params.categorySlug, params.subcategorySlug);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Category or subcategory not found</div>
      </div>
    );
  }

  return (
    <div className="container-c py-8">
      {/* Breadcrumb */}
      <div className="mb-8">
        <nav
          className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 "
          aria-label="Breadcrumb"
        >
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <Link
                href="/"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-600 "
              >
                <svg
                  className="w-3 h-3 me-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <Link
                  href={`/category/${data.category.slug}`}
                  className="ms-1 text-sm font-medium text-gray-700 hover:text-gray-600 md:ms-2 "
                >
                  {data.category.name}
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 ">
                  {data.subcategory.name}
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* Category Header */}
      <div className="mb-8">
        {/* <h1 className="text-3xl font-bold mb-4">{data.subcategory.name}</h1> */}
        {data.subcategory.description && (
          <p className="text-gray-600">{data.subcategory.description}</p>
        )}
      </div>

      <div className="grid grid-cols-4 gap-5 ">
        {data.products.map((productData) => (
          <div key={productData.product.id}>
            <ProductCard
              id={productData.product.id}
              imageUrl={productData?.thumbnail?.imageUrl ?? ""}
              title={productData.product.name}
              description={productData.product.name}
            />
          </div>
        ))}
      </div>

      {data.products.length === 0 && (
        <div className="text-center py-12">
          <h4 className="text-gray-600  uppercase">
            No products found in this category.{" "}
            <i
              className="fa-duotone fa-solid fa-face-spiral-eyes"
              // style={{"--fa-primary-color: #000000; --fa-secondary-color: #ad6343;"}}
              style={
                {
                  "--fa-primary-color": "#000000",
                  "--fa-secondary-color": "#ad6343",
                } as React.CSSProperties
              }
            ></i>
          </h4>
        </div>
      )}
    </div>
  );
}
