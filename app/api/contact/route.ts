import { contactUs } from "./../../../lib/db/schema";
import { db } from "@/lib/db/db";
import { NextRequest, NextResponse } from "next/server";

// Define the expected shape of the request body
interface ContactRequestBody {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body: ContactRequestBody = await req.json();
    console.log(body, "Contact message body received");

    // Insert the contact message into the database
    const contact = await db
      .insert(contactUs)
      .values({
        name: body.name,
        email: body.email,
        subject: body.subject,
        message: body.message,
      })
      .returning();

    // Return a success response
    return NextResponse.json(
      { message: "Contact message submitted successfully", data: contact },
      { status: 200 }
    );
  } catch (error: Error | any) {
    console.error("Error submitting contact message:", error);

    // Return an error response
    return NextResponse.json(
      { message: "Failed to submit contact message", error: error?.message },
      { status: 500 }
    );
  }
}
