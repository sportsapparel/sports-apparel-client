// app/category/[categorySlug]/[subcategorySlug]/page.tsx
import { ProductCard } from "@/components/ProductCard";
import { db } from "@/lib/db/db";
import { categories, gallery, products, subcategories } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
// Types
interface PageProps {
  params: {
    categorySlug: string;
    subcategorySlug: string;
  };
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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
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
      siteName: "Your Site Name",
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

export default async function SubCategoryPage({ params }: PageProps) {
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
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li>
              <Link href="/" className="text-gray-700 hover:text-gray-900">
                Home
              </Link>
            </li>
            <li>
              <span className="mx-2 text-gray-500">/</span>
              <Link
                href={`/category/${data.category.slug}`}
                className="text-gray-700 hover:text-gray-900"
              >
                {data.category.name}
              </Link>
            </li>
            <li>
              <span className="mx-2 text-gray-500">/</span>
              <span className="text-gray-900">{data.subcategory.name}</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{data.subcategory.name}</h1>
        {data.subcategory.description && (
          <p className="text-gray-600">{data.subcategory.description}</p>
        )}
      </div>

      <div className="grid grid-cols-4 gap-5 ">
        {data.products.map((productData) => (
          <div key={productData.product.id}>
            <ProductCard
              id={productData.product.id}
              imageUrl={productData.thumbnail?.imageUrl}
              title={productData.product.name}
              description={productData.product.name}
            />
          </div>
        ))}
      </div>

      {data.products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}
