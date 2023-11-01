import prismadb from "@/lib/prismadb";
import { CategoryForm } from "./components/category-form";
import { redirect } from "next/navigation";

const CategoryPage = async ({
  params,
}: {
  params: { storeId: string; categoryId: string };
}) => {
  const categoryByStoreId = await prismadb.category.findFirst({
    where: {
      storeId: params.storeId,
      id: params.categoryId,
    },
  });

  if (!categoryByStoreId && params.categoryId !== "new") {
    redirect(`/${params.storeId}/categories`);
  }

  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} billboards={billboards} />
      </div>
    </div>
  );
};

export default CategoryPage;
