import prismadb from "@/lib/prismadb";
import { BillboardForm } from "./components/billboard-form";
import { redirect } from "next/navigation";

const BillboardPage = async ({
  params,
}: {
  params: { storeId: string; billboardId: string };
}) => {
  const billboardByStoreId = await prismadb.billboard.findFirst({
    where: {
      storeId: params.storeId,
      id: params.billboardId,
    },
  });

  if (!billboardByStoreId && params.billboardId !== "new") {
    redirect(`/${params.storeId}/billboards`);
  }

  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
