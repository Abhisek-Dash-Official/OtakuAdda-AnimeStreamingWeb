import { NextResponse } from "next/server";
import pool from "@/lib/postgresqlPOOL";

export async function POST(req) {
  try {
    const body = await req.json();
    const { image, email } = body;

    const result = await pool.query(
      `UPDATE users SET profilepic = $1 WHERE email = $2 RETURNING *`,
      [image, email]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Profile picture updated successfully!",
        user: result.rows[0],
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
