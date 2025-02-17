import { db } from "@/lib/db/db";
import { categories, subcategories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;

  try {
    const categoryId = await db
      .select()
      .from(categories)
      .where(eq(categories.slug, params.slug));
    console.log(categoryId, "cat id");
    const categorySubcategories = await db
      .select()
      .from(subcategories)
      .where(eq(subcategories.categoryId, categoryId[0].id));

    console.log(categorySubcategories, "subcategories");
    return NextResponse.json(categorySubcategories);
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    return NextResponse.json(
      { error: "Failed to fetch subcategories" },
      { status: 500 }
    );
  }
}
