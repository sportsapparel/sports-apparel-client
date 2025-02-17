import { db } from "@/lib/db/db";
import { categories, gallery, products, subcategories } from "@/lib/db/schema";
import { count, desc, eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Extract query parameters for potential filtering or pagination
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 2);
    const limit = parseInt(searchParams.get("limit") || "2", 2); // Ensure this is correct
    const offset = (page - 1) * limit;
    console.log(page, limit, offset);
    // Get total count of active products for pagination metadata
    const [{ totalCount }] = await db
      .select({ totalCount: count(products.id) })
      .from(products)
      .where(eq(products.isActive, true));

    // Get products with related data using joins
    const productsWithDetails = await db
      .select({
        // Product fields
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

        // SEO-specific fields
        metaTitle: products.metaTitle,
        metaDescription: products.metaDescription,
        keywords: products.keywords,
        canonicalUrl: products.canonicalUrl,
        structuredData: products.structuredData,

        // Thumbnail image fields
        thumbnail: {
          id: gallery.id,
          imageUrl: gallery.imageUrl,
          originalName: gallery.originalName,
          altText: gallery.altText, // Include alt text for SEO
        },

        // Category fields
        // category: {
        //   id: categories.id,
        //   name: categories.name,
        //   slug: categories.slug,
        //   metaTitle: categories.metaTitle,
        //   metaDescription: categories.metaDescription,
        // },

        // // Subcategory fields
        // subcategory: {
        //   id: subcategories.id,
        //   name: subcategories.name,
        //   slug: subcategories.slug,
        //   metaTitle: subcategories.metaTitle,
        //   metaDescription: subcategories.metaDescription,
        // },

        // Additional images for the product
        // images:
        //   sql <
        //   Array<{
        //     id: number;
        //     imageUrl: string;
        //     altText: string;
        //   }>`(
        //   SELECT json_agg(
        //     json_build_object(
        //       'id', g.id,
        //       'imageUrl', g.image_url,
        //       'altText', g.alt_text
        //     )
        //   )
        //   FROM product_images pi
        //   JOIN gallery g ON pi.image_id = g.id
        //   WHERE pi.product_id = products.id
        // )`,
      })
      .from(products)
      // Join with subcategories
      //   .leftJoin(subcategories, eq(products.subcategoryId, subcategories.id))
      // Join with categories through subcategories
      //   .leftJoin(categories, eq(subcategories.categoryId, categories.id))
      // Join with gallery for thumbnail
      .leftJoin(gallery, eq(products.thumbnailId, gallery.id))
      // Only get active products
      .where(eq(products.isActive, true))
      // Pagination
      .limit(limit)
      .offset(offset)
      // Optional: Add sorting if needed
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
      // Include global SEO metadata
      seoMetadata: {
        title: "Our Products | Sports Apparel",
        description:
          "Explore our wide range of high-quality products across various categories.",
        canonicalUrl: "https://sports-apparel.vercel.app/shop", // Replace with your actual URL
      },
    });
  } catch (error) {
    return error;
  }
}
