import prismadb from "@/lib/prismadb";
import { SizeForm } from "./components/size-form";
import { redirect } from "next/navigation";

const SizePage = async ({
  params,
}: {
  params: { storeId: string; sizeId: string };
}) => {
  const sizeByStoreId = await prismadb.size.findFirst({
    where: {
      storeId: params.storeId,
      id: params.sizeId,
    },
  });

  if (!sizeByStoreId && params.sizeId !== "new") {
    redirect(`/${params.storeId}/sizes`);
  }

  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default SizePage;
