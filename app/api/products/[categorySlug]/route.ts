import { db } from "@/lib/db/db";
import { categories, gallery, products, subcategories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(
  req: Request,
  props: { params: Promise<{ categorySlug: string }> }
) {
  const params = await props.params;

  try {
    const { categorySlug } = params;
    const categoriesWithProducts = await db
      .select()
      .from(categories)
      .where(eq(categories.slug, categorySlug))
      .leftJoin(subcategories, eq(categories.id, subcategories.categoryId))
      .leftJoin(products, eq(subcategories.id, products.subcategoryId))
      .leftJoin(gallery, eq(products.thumbnailId, gallery.id));
    console.log(categoriesWithProducts, "products");
    if (categoriesWithProducts.length === 0) {
      return new Response(JSON.stringify({ error: "Category not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const allProducts = [] as any[];

    categoriesWithProducts.forEach((row) => {
      const product = row.products;
      const gallery = row.gallery;
      if (product) {
        allProducts.push({
          id: product.id,
          name: product.name,
          slug: product.slug,
          image: gallery?.imageUrl,
          description: product.description,
          details: product.details,
          minOrder: product.minOrder,
          deliveryInfo: product.deliveryInfo,
          whatsappNumber: product.whatsappNumber,
          isActive: product.isActive,
          metaTitle: product.metaTitle,
          metaDescription: product.metaDescription,
          keywords: product.keywords,
          canonicalUrl: product.canonicalUrl,
          structuredData: product.structuredData,
          createdAt: product.createdAt,
        });
      }
    });

    return new Response(JSON.stringify(allProducts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
