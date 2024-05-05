import { verifyToken } from "@/utils/JwtServices";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const token = await verifyToken(body.token);

  if (token) {
    return NextResponse.json({ valid: true });
  } else {
    return NextResponse.json({ valid: false });
  }
}
