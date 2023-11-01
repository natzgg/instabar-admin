import prismadb from "@/lib/prismadb";
import ProductsClient from "./components/client";
import { format } from "date-fns";
import { ProductsColumn } from "./components/column";
import { formatter } from "@/lib/utils";

export default async function ProductsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductsColumn[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    isArchived: product.isArchived,
    isFeatured: product.isFeatured,
    price: formatter.format(product.price.toNumber()),
    category: product.category.name,
    size: product.size.name,
    createdAt: format(product.createdAt, "MMMM dd, yyyy"),
  }));
  return (
    <div className="flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={formattedProducts} />
      </div>
    </div>
  );
}
