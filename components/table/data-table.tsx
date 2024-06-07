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

export const DataTable = () => {
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
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {/* <th key="extra-column"></th> */}
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className="relative cursor-pointer hover:bg-slate-600"
              onClick={(event) => {
                event.preventDefault()
                if (event.metaKey || event.ctrlKey) {
                  const win = window.open(
                    `/students/${row.original.studentId}`,
                    "_blank"
                  )
                  win.focus()
                } else {
                  push(`/students/${row.original.studentId}`)
                }
              }}
            >
              {/* <td>
                <Link
                  href="#"
                  className="absolute top-0 left-0 h-full w-full"
                  onClick={(e) => {
                    console.log(row)
                    e.preventDefault()
                  }}
                />
              </td> */}
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <pre>{JSON.stringify(data, null, "\t")}</pre> */}
    </article>
  )
}
