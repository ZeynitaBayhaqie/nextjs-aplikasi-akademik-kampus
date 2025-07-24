"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Student } from "@/lib/api"

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "name",
    header: "Nama Mahasiswa",
  },
  {
    accessorKey: "NIM",
    header: "NIM",
  },
  {
    accessorKey: "major",
    header: "Jurusan",
  },
  {
    accessorKey: "created_at",
    header: "Tanggal Terdaftar",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"))
      return <div className="font-medium">{date.toLocaleDateString("id-ID")}</div>
    },
  },
]