"use client";

import { ColumnDef } from "@tanstack/react-table";
import ClientAction from "./client-action";

export type BillBoardColumn = {
  id: string;
  label: string;
  createdAt: string;
};

export const columns: ColumnDef<BillBoardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
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
