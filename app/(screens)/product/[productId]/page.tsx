import {
  CurrencyDollarIcon,
  GlobeAmericasIcon,
} from "@heroicons/react/24/outline";
import { db } from "@/lib/db/db";
import { products, gallery, productImages } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { unstable_noStore as noStore } from "next/cache";

interface ProductThumbnail {
  id: string;
  url: string;
  alt: string;
  originalName: string;
  fileSize: number;
  mimeType: string;
}

interface ProductImage extends ProductThumbnail {
  displayOrder: number;
}

interface ProductSeo {
  metaTitle: string | null;
  metaDescription: string;
  keywords: string;
  canonicalUrl: string;
  structuredData: any;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  details: Record<string, string> | object | any;
  minOrder: string;
  deliveryInfo: string;
  whatsappNumber: string;
  thumbnail: ProductThumbnail | any | null;
  images: ProductImage[] | any[];
  seo: ProductSeo;
  createdAt: Date;
}

async function getProduct(productId: string): Promise<Product | null> {
  noStore();
  try {
    console.log(productId, "productId");
    const [productData] = await db
      .select({
        product: products,
        thumbnail: gallery,
      })
      .from(products)
      .leftJoin(gallery, eq(products.thumbnailId, gallery.id))
      .where(and(eq(products.id, productId), eq(products.isActive, true)));
    console.log(productData, "product");
    if (!productData) return null;

    const productImagesData = await db
      .select({
        image: gallery,
        displayOrder: productImages.displayOrder,
      })
      .from(productImages)
      .leftJoin(gallery, eq(productImages.imageId, gallery.id))
      .where(eq(productImages.productId, productId))
      .orderBy(productImages.displayOrder);
    console.log(productImagesData, "productImagesData");
    return {
      id: productData.product.id,
      name: productData.product.name,
      slug: productData.product.slug,
      description: productData.product.description,
      details: productData.product.details ?? {},
      minOrder: productData.product.minOrder ?? "",
      deliveryInfo: productData.product.deliveryInfo ?? "",
      whatsappNumber: productData.product.whatsappNumber ?? "",
      thumbnail: productData?.thumbnail
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
        id: image?.id ?? "",
        url: image?.imageUrl ?? "",
        alt: image?.altText || productData.product.name,
        originalName: image?.originalName ?? "",
        fileSize: image?.fileSize ?? 0,
        mimeType: image?.mimeType ?? "",
        displayOrder,
      })),
      seo: {
        metaTitle: productData.product.metaTitle ?? "",
        metaDescription: productData.product.metaDescription ?? "",
        keywords: productData.product.keywords ?? "",
        canonicalUrl: productData.product.canonicalUrl ?? "",
        structuredData: productData.product.structuredData ?? {},
      },
      createdAt: productData.product.createdAt ?? new Date(),
    };
    // console.log(product, "product");
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductDetail({
  params,
}: {
  params: { productId: string };
}) {
  noStore();
  const product = await getProduct(params.productId);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-500">Product not found</div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="container-c">
        <div className="grid grid-cols-2 sm-to-xs:grid-cols-1 gap-10 p-10">
          {/* Left Column - Name and Image */}
          <div className="space-y-6">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              {product.name}
            </h1>
            {product.thumbnail && (
              <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
                <img
                  src={product.thumbnail.url}
                  alt={product.thumbnail.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="grid grid-cols-3 gap-4 mt-4">
              {product.images.map((image) => (
                <div
                  key={image.id}
                  className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden"
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Product Information */}
          <div className="space-y-8">
            {/* Specifications */}
            <section className="space-y-4">
              <h2 className="text-lg font-medium text-gray-900">
                Specifications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(product.details).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 p-4 rounded-lg">
                    <dt className="font-medium text-gray-900">{key}</dt>
                    <dd className="mt-1 text-gray-500">{value as string}</dd>
                  </div>
                ))}
              </div>
            </section>

            {/* Description */}
            <section className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-medium text-gray-900">Description</h2>
              <div className="mt-4 prose prose-sm text-gray-500">
                {product.description !== "none"
                  ? product.description
                  : "No description available"}
              </div>
            </section>

            {/* SEO Information */}
            <section className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-medium text-gray-900">
                Product Information
              </h2>
              <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Keywords:</span>{" "}
                  {product.seo.keywords}
                </p>
              </div>
            </section>

            {/* Policies */}
            <section className="border-t border-gray-200 pt-6">
              <h2 className="sr-only">Delivery and Contact Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                  <dt>
                    <i className="fa fa-globe-asia"></i>

                    <span className="mt-4 text-sm font-medium text-gray-900">
                      Delivery Info
                    </span>
                  </dt>
                  <dd className="mt-1 text-sm text-gray-500">
                    {product.deliveryInfo}
                  </dd>
                </div>
              </div>
            </section>

            {/* Contact Button */}
            <div className="pt-6">
              <a
                href={`https://wa.me/${product.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center rounded-md bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
              >
                Contact via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
