"use client";

import { ColumnDef } from "@tanstack/react-table";
import ClientAction from "./client-action";

export type ProductsColumn = {
  id: string;
  name: string;
  createdAt: string;
  isArchived: boolean;
  isFeatured: boolean;
  price: string;
  category: string;
  size: string;
};

export const columns: ColumnDef<ProductsColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <ClientAction data={row.original} />,
  },
];
