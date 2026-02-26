import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const docRef = adminDb.collection('verifications').doc(id);
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      const verification = docSnap.data();
      return NextResponse.json(verification);
    } else {
      return NextResponse.json({ error: "Verification not found" }, { status: 404 });
    }
  } catch (error: any) {
    console.error("Firebase Admin database error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch verification" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await adminDb.collection('verifications').doc(id).delete();
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete" }, { status: 500 });
  }
}

