import { connectDB } from "@/lib/mongodb.js";
import product from "@/models/products.js";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = request.nextUrl;
  const searchTerm = searchParams.get("search");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;

  await connectDB();

  try {
    let query = {};

    if (searchTerm) {
      query = {
        $or: [
          { Title: { $regex: searchTerm, $options: "i" } },
          { Genres: { $regex: searchTerm, $options: "i" } },
        ],
      };
    }

    const data = await product
      .find(query)
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
