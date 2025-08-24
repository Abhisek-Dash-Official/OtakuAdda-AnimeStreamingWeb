import { NextResponse } from "next/server";
import pool from "@/lib/postgresqlPOOL";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const check = searchParams.get("check");
  if (check === "true") {
    const email = searchParams.get("email");
    if (!email) {
      return NextResponse.json(
        { error: "Email query parameter is required" },
        { status: 400 }
      );
    }

    try {
      const result = await pool.query(
        `SELECT subscription_status, subscription_end FROM user_subscription WHERE email = $1 ORDER BY subscription_end DESC LIMIT 1`,
        [email]
      );

      if (result.rows.length === 0) {
        return NextResponse.json(
          { error: "No subscription found for this email" },
          { status: 404 }
        );
      }

      if (
        !result.rows[0].subscription_status &&
        new Date(result.rows[0].subscription_end) < new Date()
      ) {
        return NextResponse.json(
          { subscription_status: "inactive" },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { subscription_status: result.rows[0].subscription_status },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      {
        error:
          "Invalid request. Use '?check=true&email=...' to check subscription.",
      },
      { status: 400 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, subscription_duration } = body;

    if (!email || !subscription_duration) {
      return NextResponse.json(
        { error: "Email and subscription_duration are required" },
        { status: 400 }
      );
    }

    // 1. Fetch User subscription record
    const existing = await pool.query(
      `SELECT subscription_end FROM user_subscription WHERE email = $1 LIMIT 1`,
      [email]
    );

    const now = new Date();
    let baseDate;

    if (existing.rows.length > 0) {
      const { subscription_end } = existing.rows[0];

      if (new Date(subscription_end) > now) {
        baseDate = new Date(subscription_end);
      } else {
        baseDate = now;
      }
    } else {
      baseDate = now;
    }

    // 2. Calculate new subscription_end
    let newEnd;
    if (subscription_duration === "monthly") {
      newEnd = new Date(baseDate.setMonth(baseDate.getMonth() + 1));
      console.log(newEnd);
    } else if (subscription_duration === "yearly") {
      newEnd = new Date(baseDate.setFullYear(baseDate.getFullYear() + 1));
    } else {
      return NextResponse.json(
        { error: "Invalid subscription_duration value" },
        { status: 400 }
      );
    }

    // 3. Update/Insert record
    if (existing.rows.length > 0) {
      await pool.query(
        `UPDATE user_subscription 
         SET subscription_status = $1, subscription_end = $2 
         WHERE email = $3`,
        ["active", newEnd.toISOString(), email]
      );
    } else {
      await pool.query(
        `INSERT INTO user_subscription(email, subscription_status, subscription_end) 
         VALUES ($1, $2, $3)`,
        [email, "active", newEnd.toISOString()]
      );
    }

    return NextResponse.json(
      {
        message: "Subscription updated successfully!",
        subscription_end: newEnd,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
