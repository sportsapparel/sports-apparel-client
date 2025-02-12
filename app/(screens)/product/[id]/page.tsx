"use client";

import { useFetchData } from "@/hooks/useFetchData";
import { fetchProductById } from "@/lib/apiFuntions";
import {
  CurrencyDollarIcon,
  GlobeAmericasIcon,
} from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";
import { useMemo } from "react";

interface ProductThumbnail {
  url: string;
  alt: string;
}

interface ProductSeo {
  keywords: string;
}

interface ProductImage {
  id: number;
  url: string;
  alt: string;
  originalName: string;
  fileSize: number;
  mimeType: string;
  displayOrder: number;
}
interface Product {
  id: string;
  name: string;
  thumbnail: ProductThumbnail;
  details: Record<string, string>;
  description: string;
  images: ProductImage[];
  seo: ProductSeo;
  whatsappNumber: string;
}

interface Policy {
  name: string;
  icon: React.ElementType;
  description: string;
}

const policies: Policy[] = [
  {
    name: "Delivery Info",
    icon: GlobeAmericasIcon,
    description: "Minimum order: 50 units",
  },
  {
    name: "Contact",
    icon: CurrencyDollarIcon,
    description: "WhatsApp: 03237803135",
  },
];
export default function ProductDetail() {
  const { id } = useParams();
  const fetchSubCatgories = useMemo(() => {
    if (typeof id === "string") {
      return () => fetchProductById(String(id));
    }
    return null;
  }, [id]);

  const {
    data: product = {} as Product,
    loading,
    error,
    refetch,
  } = useFetchData<Product>(
    fetchSubCatgories ?? (() => Promise.reject(new Error("Invalid user ID")))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-500">Error: {error.message}</div>
      </div>
    );
  }

  if (!product) return null;
  console.log(product, "pruducts");
  return (
    <div className="bg-white min-h-screen">
      <div className="container-c">
        <div className="grid grid-cols-2 sm-to-xs:grid-cols-1npm run dev gap-10 p-10">
          {/* Left Column - Name and Image */}
          <div className="space-y-6">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              {product.name}
            </h1>
            <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
              <img
                src={product.thumbnail.url}
                alt={product.thumbnail.alt}
                className="w-full h-full object-cover"
              />
            </div>
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
                    <dd className="mt-1 text-gray-500">{value}</dd>
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
                {policies.map((policy) => (
                  <div
                    key={policy.name}
                    className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center"
                  >
                    <dt>
                      <policy.icon
                        className="mx-auto h-6 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="mt-4 text-sm font-medium text-gray-900">
                        {policy.name}
                      </span>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-500">
                      {policy.description}
                    </dd>
                  </div>
                ))}
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
