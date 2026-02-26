import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { id } = data;

    if (!id) {
      return NextResponse.json({ error: "Missing verification ID" }, { status: 400 });
    }

    data.created_at = new Date().toISOString();
    await adminDb.collection('verifications').doc(id).set(data);

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error("Firebase Admin database error:", error);
    return NextResponse.json({ error: error.message || "Failed to save verification" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const snapshot = await adminDb.collection('verifications').orderBy('created_at', 'desc').get();
    const verifications = snapshot.docs.map(doc => doc.data());
    return NextResponse.json(verifications);
  } catch (error: any) {
    console.error("Firebase Admin database error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch verifications" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const snapshot = await adminDb.collection('verifications').get();
    const batch = adminDb.batch();
    snapshot.docs.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
    return NextResponse.json({ success: true, deleted: snapshot.size });
  } catch (error: any) {
    console.error("Bulk delete error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete all records" }, { status: 500 });
  }
}

