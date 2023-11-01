"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { CategoriesColumn, columns } from "./column";
import { DataTable } from "@/components/ui/data-table";

interface CategoriesClientProps {
  data: CategoriesColumn[];
}

const CategoriesClient: React.FC<CategoriesClientProps> = ({ data }) => {
  const route = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories(${data.length})`}
          description="Manage category for your store"
        />
        <Button onClick={() => route.push(`/${params.storeId}/categories/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};

export default CategoriesClient;
