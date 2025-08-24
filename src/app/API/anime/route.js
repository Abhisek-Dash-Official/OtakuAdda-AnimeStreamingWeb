import { connectDB } from "@/lib/mongodb.js";
import product from "@/models/products.js";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;

  await connectDB();

  if (category) {
    try {
      const data = await product
        .find({ Genres: { $regex: category, $options: "i" } })
        .sort({ _id: 1 })
        .skip(skip)
        .limit(limit)
        .lean();

      return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to fetch products" },
        { status: 500 }
      );
    }
  }

  const data = await product.find({}).skip(skip).limit(limit).lean();

  return NextResponse.json({ data }, { status: 200 });
}
