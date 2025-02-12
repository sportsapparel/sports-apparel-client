import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { categories, subcategories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    // Fetch categories with their subcategories
    const categoriesWithSubcategories = await db
      .select({
        id: categories.id,
        name: categories.name,
        description: categories.description,
        image: categories.image,
        slug: categories.slug,
        subcategories: {
          id: subcategories.id,
          name: subcategories.name,
          description: subcategories.description,
          image: subcategories.image,
          slug: subcategories.slug,
        },
      })
      .from(categories)
      .leftJoin(subcategories, eq(categories.id, subcategories.categoryId))
      .orderBy(categories.name, subcategories.name);

    // Group categories and their subcategories
    const navigationStructure = categoriesWithSubcategories.reduce(
      (acc, item) => {
        // Find or create category in accumulator
        let category = acc.find((cat) => cat.id === item.id);
        if (!category) {
          category = {
            id: item.id,
            name: item.name,
            description: item?.description ?? "",
            image: item?.image ?? "",
            slug: item.slug,
            subcategories: [],
          };
          acc.push(category);
        }

        // Add subcategory if it exists and is not already added
        if (item?.subcategories && item?.subcategories.id) {
          const existingSubcategory = category?.subcategories.find(
            (sub) => sub.id === item.subcategories?.id
          );

          if (!existingSubcategory) {
            category?.subcategories.push({
              id: item.subcategories.id,
              name: item.subcategories.name,
              description: item.subcategories.description ?? "",
              slug: item.subcategories.slug,
              image: item.subcategories.image ?? "",
            });
          }
        }

        return acc;
      },
      [] as Array<{
        id: number;
        name: string;
        description: string;
        slug: string;
        image?: string;
        subcategories: Array<{
          id: number;
          name: string;
          description: string;
          slug: string;
          image?: string;
        }>;
      }>
    );

    return NextResponse.json({
      status: "success",
      data: navigationStructure,
    });
  } catch (error) {
    console.error("Error fetching navigation structure:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch navigation structure",
      },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
