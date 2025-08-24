import { connectDB } from "@/lib/mongodb.js";
import product from "@/models/products.js";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const data = await product.aggregate([{ $sample: { size: 20 } }]);

    return NextResponse.json(
      {
        data: JSON.parse(JSON.stringify(data)),
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
