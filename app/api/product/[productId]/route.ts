// app/api/products/[productId]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { products, gallery, productImages } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const { productId } = params;
    console.log("====================================");
    console.log(productId);
    console.log("====================================");
    // Get product with its thumbnail
    const [productData] = await db
      .select({
        product: products,
        thumbnail: gallery,
      })
      .from(products)
      .leftJoin(gallery, eq(products.thumbnailId, gallery.id))
      .where(and(eq(products.id, productId), eq(products.isActive, true)));

    if (!productData) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Get all additional product images
    const productImagesData = await db
      .select({
        image: gallery,
        displayOrder: productImages.displayOrder,
      })
      .from(productImages)
      .leftJoin(gallery, eq(productImages.imageId, gallery.id))
      .where(eq(productImages.productId, productId))
      .orderBy(productImages.displayOrder);

    // Format the response
    const formattedProduct = {
      id: productData.product.id,
      name: productData.product.name,
      slug: productData.product.slug,
      description: productData.product.description,
      details: productData.product.details,
      minOrder: productData.product.minOrder,
      deliveryInfo: productData.product.deliveryInfo,
      whatsappNumber: productData.product.whatsappNumber,
      thumbnail: productData.thumbnail
        ? {
            id: productData.thumbnail.id,
            url: productData.thumbnail.imageUrl,
            alt: productData.thumbnail.altText || productData.product.name,
            originalName: productData.thumbnail.originalName,
            fileSize: productData.thumbnail.fileSize,
            mimeType: productData.thumbnail.mimeType,
          }
        : null,
      images: productImagesData.map(({ image, displayOrder }) => ({
        id: image?.id,
        url: image?.imageUrl,
        alt: image?.altText || productData.product.name,
        originalName: image?.originalName,
        fileSize: image?.fileSize,
        mimeType: image?.mimeType,
        displayOrder,
      })),
      seo: {
        metaTitle: productData.product.metaTitle,
        metaDescription: productData.product.metaDescription,
        keywords: productData.product.keywords,
        canonicalUrl: productData.product.canonicalUrl,
        structuredData: productData.product.structuredData,
      },
      createdAt: productData.product.createdAt,
    };

    return NextResponse.json({
      success: true,
      data: formattedProduct,
    });
  } catch (error) {
    console.error("Error fetching product details:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
export const dynamic = "force-dynamic";
