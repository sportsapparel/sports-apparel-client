// app/api/products/[categorySlug]/[subcategorySlug]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import {
  products,
  subcategories,
  categories,
  gallery,
  productImages,
} from "@/lib/db/schema";
import { eq, and, inArray } from "drizzle-orm";

export async function GET(
  req: Request,
  props: { params: Promise<{ categorySlug: string; subcategorySlug: string }> }
) {
  const params = await props.params;
  try {
    const { categorySlug, subcategorySlug } = params;

    // Find the category by slug
    const [categoryData] = await db
      .select()
      .from(categories)
      .where(eq(categories.slug, categorySlug));

    if (!categoryData) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Find the subcategory that belongs to this category
    const [subcategoryData] = await db
      .select()
      .from(subcategories)
      .where(
        and(
          eq(subcategories.slug, subcategorySlug),
          eq(subcategories.categoryId, categoryData.id)
        )
      );

    if (!subcategoryData) {
      return NextResponse.json(
        { error: "Subcategory not found" },
        { status: 404 }
      );
    }

    // Get all active products for this subcategory with their thumbnail
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

    // Get all product images
    const productIds = productsData.map((p) => p.product.id);

    const productImagesData =
      productIds.length > 0
        ? await db
            .select({
              productId: productImages.productId,
              image: gallery,
              displayOrder: productImages.displayOrder,
            })
            .from(productImages)
            .leftJoin(gallery, eq(productImages.imageId, gallery.id))
            .where(inArray(productImages.productId, productIds))
        : [];

    // Group images by product
    const imagesByProduct = productImagesData.reduce((acc, curr) => {
      const { productId, image, displayOrder } = curr;
      if (!acc[productId]) {
        acc[productId] = [];
      }
      if (image) {
        acc[productId].push({
          id: image.id,
          url: image.imageUrl,
          alt: image.altText || "",
          displayOrder,
        });
      }
      return acc;
    }, {} as Record<string, any[]>);

    // Format the response
    const formattedProducts = productsData.map(({ product, thumbnail }) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      details: product.details,
      minOrder: product.minOrder,
      deliveryInfo: product.deliveryInfo,
      whatsappNumber: product.whatsappNumber,
      thumbnail: thumbnail
        ? {
            id: thumbnail.id,
            url: thumbnail.imageUrl,
            alt: thumbnail.altText || product.name,
          }
        : null,
      images: imagesByProduct[product.id] || [],
      seo: {
        metaTitle: product.metaTitle,
        metaDescription: product.metaDescription,
        keywords: product.keywords,
        canonicalUrl: product.canonicalUrl,
        structuredData: product.structuredData,
      },
      createdAt: product.createdAt,
    }));

    return NextResponse.json({
      success: true,
      data: {
        category: {
          id: categoryData.id,
          name: categoryData.name,
          slug: categoryData.slug,
          description: categoryData.description,
          seo: {
            metaTitle: categoryData.metaTitle,
            metaDescription: categoryData.metaDescription,
            keywords: categoryData.keywords,
            canonicalUrl: categoryData.canonicalUrl,
          },
        },
        subcategory: {
          id: subcategoryData.id,
          name: subcategoryData.name,
          slug: subcategoryData.slug,
          description: subcategoryData.description,
          seo: {
            metaTitle: subcategoryData.metaTitle,
            metaDescription: subcategoryData.metaDescription,
            keywords: subcategoryData.keywords,
            canonicalUrl: subcategoryData.canonicalUrl,
          },
        },
        products: formattedProducts,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
export const dynamic = "force-dynamic";
