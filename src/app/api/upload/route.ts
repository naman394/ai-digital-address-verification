import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(_request: NextRequest) {
  // This route is unused. Images are compressed client-side and stored as base64 in Firestore.
  return NextResponse.json({ error: 'Use base64 upload instead' }, { status: 410 });
}
