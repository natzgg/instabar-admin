import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated.", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required.", { status: 403 });
    }
    if (!params.storeId) {
      return new NextResponse("Store ID is required.", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        userId,
        id: params.storeId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized.", { status: 405 });
    }

    const billboardByStoreId = await prismadb.billboard.findFirst({
      where: {
        id: billboardId,
        storeId: params.storeId,
      },
    });

    if (!billboardByStoreId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const category = await prismadb.category.create({
      data: {
        name,
        storeId: params.storeId,
        billboardId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORIES_POST]", error);
    return new NextResponse("Internal Error.", { status: 500 });
  }
}
