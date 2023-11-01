"use client";

import { ColumnDef } from "@tanstack/react-table";
import ClientAction from "./client-action";

export type CategoriesColumn = {
  id: string;
  name: string;
  createdAt: string;
  billboardLabel: string;
};

export const columns: ColumnDef<CategoriesColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboardLabel",
    header: "Billboard",
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
