import { NextResponse } from "next/server";
import pool from "@/lib/postgresqlPOOL";

export async function POST(req) {
  try {
    const body = await req.json();
    const { currentPassword, newPassword, email } = body;

    const result = await pool.query(
      `UPDATE users SET password = $1 WHERE email = $2 and password = $3 RETURNING *`,
      [newPassword, email, currentPassword]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { message: "Incorrect email or password!" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Password updated successfully!",
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
