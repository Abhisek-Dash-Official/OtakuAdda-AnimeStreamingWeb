import { NextResponse } from "next/server";
import pool from "@/lib/postgresqlPOOL";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    // No user found
    if (result.rowCount === 0) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const user = result.rows[0];

    // Password check
    if (user.password !== password) {
      return NextResponse.json(
        { message: "Incorrect Password" },
        { status: 401 }
      );
    }

    // Login successful
    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          username: user.username,
          email: user.email,
          profilePic: user.profilepic,
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
