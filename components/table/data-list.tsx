import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { data as defaultData } from "@/data/data"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { columns } from "./columns"

export const DataList = () => {
  const [data, setData] = useState(() => [...defaultData])
  const [originalData, setOriginalData] = useState(() => [...defaultData])
  const [editedRows, setEditedRows] = useState({})

  const { push } = useRouter()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      editedRows,
      setEditedRows,
      revertData: (rowIndex: number, revert: boolean) => {
        if (revert) {
          setData((old) =>
            old.map((row, index) =>
              index === rowIndex ? originalData[rowIndex] : row
            )
          )
        } else {
          setOriginalData((old) =>
            old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
          )
        }
      },
      updateData: (rowIndex: number, columnId: string, value: string) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              }
            }
            return row
          })
        )
      },
    },
  })

  return (
    <article className="table-container">
      <div className="w-full">
        {table.getHeaderGroups().map((headerGroup) => (
          <div
            key={headerGroup.id}
            className="grid w-full grid-cols-5 place-items-center space-x-2 border-b-2 border-gray-200"
          >
            {headerGroup.headers.map((header) => (
              <div key={header.id} className="border-gray-200 p-4">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="w-full">
        {table.getRowModel().rows.map((row) => (
          <Link
            key={row.id}
            className="relative grid w-full cursor-pointer grid-cols-5 place-items-center space-x-2 border-b-2 border-gray-200 hover:bg-slate-600"
            href={`/students/${row.original.studentId}`}
          >
            {row.getVisibleCells().map((cell) => (
              <div key={cell.id} className="border-gray-200 p-4">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            ))}
          </Link>
        ))}
      </div>
    </article>
  )
}
