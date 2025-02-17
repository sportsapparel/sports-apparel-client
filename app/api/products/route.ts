import { db } from "@/lib/db/db";
import { categories, gallery, products, subcategories } from "@/lib/db/schema";
import { count, desc, eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Extract query parameters for potential filtering or pagination
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10); // Use base 10 for parseInt
    const limit = parseInt(searchParams.get("limit") || "10", 10); // Use base 10 for parseInt
    const offset = (page - 1) * limit;

    // Get total count of active products for pagination metadata
    const [{ totalCount }] = await db
      .select({ totalCount: count(products.id) })
      .from(products)
      .where(eq(products.isActive, true));

    // Get products with related data using joins
    const productsWithDetails = await db
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        description: products.description,
        details: products.details,
        minOrder: products.minOrder,
        deliveryInfo: products.deliveryInfo,
        whatsappNumber: products.whatsappNumber,
        isActive: products.isActive,
        createdAt: products.createdAt,
        metaTitle: products.metaTitle,
        metaDescription: products.metaDescription,
        keywords: products.keywords,
        canonicalUrl: products.canonicalUrl,
        structuredData: products.structuredData,
        thumbnail: {
          id: gallery.id,
          imageUrl: gallery.imageUrl,
          originalName: gallery.originalName,
          altText: gallery.altText,
        },
      })
      .from(products)
      .leftJoin(gallery, eq(products.thumbnailId, gallery.id))
      .where(eq(products.isActive, true))
      .limit(limit)
      .offset(offset)
      .orderBy(desc(products.createdAt));

    // Construct pagination metadata
    const pagination = {
      currentPage: page,
      pageSize: limit,
      totalProducts: totalCount,
      totalPages: Math.ceil(totalCount / limit),
      hasNextPage: offset + limit < totalCount,
      hasPreviousPage: page > 1,
    };

    // Optional: Generate a summary for SEO
    const productSummary = {
      totalActiveProducts: totalCount,
      categories: await db
        .select({
          id: categories.id,
          name: categories.name,
          slug: categories.slug,
          productCount: sql<number>`(
              SELECT COUNT(*)
              FROM products p
              JOIN subcategories s ON p.subcategory_id = s.id
              WHERE s.category_id = categories.id AND p.is_active = true
            )`,
        })
        .from(categories),
    };

    // Return response with SEO-optimized data
    return NextResponse.json({
      products: productsWithDetails,
      pagination,
      summary: productSummary,
      seoMetadata: {
        title: "Our Products | Sports Apparel",
        description:
          "Explore our wide range of high-quality products across various categories.",
        canonicalUrl: "https://sports-apparel.vercel.app/shop",
      },
    });
  } catch (error) {
    // Return a proper error response
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
