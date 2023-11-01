"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { ProductsColumn, columns } from "./column";
import { DataTable } from "@/components/ui/data-table";

interface ProductsClientProps {
  data: ProductsColumn[];
}

const ProductsClient: React.FC<ProductsClientProps> = ({ data }) => {
  const route = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products(${data.length})`}
          description="Manage products for your store"
        />
        <Button onClick={() => route.push(`/${params.storeId}/products/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};

export default ProductsClient;
