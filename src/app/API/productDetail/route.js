import { connectDB } from "@/lib/mongodb.js";
import product from "@/models/products.js";
import { NextResponse } from "next/server";

export async function GET(request) {
  const searchParams = new URL(request.url).searchParams;
  const _id = searchParams.get("_id");
  try {
    await connectDB();
    const item = await product.findOne({ _id }).lean();

    return NextResponse.json(
      {
        item: item ? JSON.parse(JSON.stringify(item)) : null,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
