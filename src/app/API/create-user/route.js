import { NextResponse } from "next/server";
import pool from "@/lib/postgresqlPOOL";

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, email, password, profilePic } = body;

    await pool.query(
      `INSERT INTO users (username, email, password, profilePic) 
       VALUES ($1, $2, $3, $4)`,
      [
        username,
        email,
        password,
        profilePic || "/assets/user-profile-pics/default-profile-pic.png",
      ]
    );

    return NextResponse.json(
      { message: "Account created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { message: "Email already exists!" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
