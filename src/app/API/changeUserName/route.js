import { NextResponse } from "next/server";
import pool from "@/lib/postgresqlPOOL";

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, email } = body;

    const result = await pool.query(
      `UPDATE users SET username = $1 WHERE email = $2 RETURNING *`,
      [username, email]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Username updated successfully!",
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
