"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { SizesColumn, columns } from "./column";
import { DataTable } from "@/components/ui/data-table";

interface SizesClientProps {
  data: SizesColumn[];
}

const SizesClient: React.FC<SizesClientProps> = ({ data }) => {
  const route = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes(${data.length})`}
          description="Manage sizes for your store"
        />
        <Button onClick={() => route.push(`/${params.storeId}/sizes/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};

export default SizesClient;
