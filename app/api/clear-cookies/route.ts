import { NextResponse } from "next/server";

export function GET() {
  const res = NextResponse.json({ cleared: true });

  const cookiesToClear = [
    // Common Supabase cookie names
    "sb-access-token",
    "sb-refresh-token",
    // Older / alternate names users might have
    "supabase-auth-token",
    "supabase-session",
  ];

  cookiesToClear.forEach((name) =>
    res.headers.append(
      "Set-Cookie",
      `${name}=; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict`
    )
  );

  // Also clear a sentinel cookie as an extra attempt
  res.headers.append(
    "Set-Cookie",
    `__clear_all=1; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict`
  );

  return res;
}
