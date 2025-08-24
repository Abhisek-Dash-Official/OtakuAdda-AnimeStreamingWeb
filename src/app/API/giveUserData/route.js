import { NextResponse } from "next/server";
import pool from "@/lib/postgresqlPOOL";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    // No user found
    if (result.rowCount === 0) {
      return NextResponse.json({ message: "Invalid email" }, { status: 401 });
    }

    const user = result.rows[0];

    return NextResponse.json(
      {
        message: "Get successful",
        user: {
          username: user.username,
          email: user.email,
          profilePic: user.profilepic,
          createdAT: user.createdat,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
