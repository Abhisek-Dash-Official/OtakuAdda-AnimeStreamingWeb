import { connectDB } from "@/lib/mongodb.js";
import product from "@/models/products.js";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectDB();
    const products = await product.find({}).limit(40);

    const popular = products.slice(21, 31);
    const kickstart = products.slice(11, 21);
    const fans_loved = products.slice(0, 11);
    const trending = products.slice(31);

    return NextResponse.json(
      {
        popular,
        kickstart,
        fans_loved,
        trending,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
