import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated.", { status: 401 });
    }

    const body = await req.json();
    const { name, images } = body;
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal error.", { status: 500 });
  }
}
