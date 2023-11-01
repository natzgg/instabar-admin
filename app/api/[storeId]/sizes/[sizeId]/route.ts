import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated.", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required.", { status: 403 });
    }

    if (!value) {
      return new NextResponse("Value is required.", { status: 403 });
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

    const sizeByStoreId = await prismadb.size.findFirst({
      where: {
        id: params.sizeId,
        storeId: params.storeId,
      },
    });

    if (!sizeByStoreId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const size = await prismadb.size.update({
      where: {
        id: params.sizeId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[CATEGORIES_POST]", error);
    return new NextResponse("Internal Error.", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: { storeId: string; sizeId: string };
  }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
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

    const sizeByStoreId = await prismadb.size.findFirst({
      where: {
        id: params.sizeId,
        storeId: params.storeId,
      },
    });

    if (!sizeByStoreId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const size = await prismadb.size.delete({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[size_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
