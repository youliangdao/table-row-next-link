import { useState } from 'react';

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { columns } from './columns';

import { Student } from '@/components/table/columns';

const defaultData: Student[] = [
  {
    studentId: 1111,
    name: 'Bahar Constantia',
    dateOfBirth: '1984-01-04',
    major: 'Computer Science',
  },
  {
    studentId: 2222,
    name: 'Harold Nona',
    dateOfBirth: '1961-05-10',
    major: 'Communications',
  },
  {
    studentId: 3333,
    name: 'Raginolf Arnulf',
    dateOfBirth: '1991-10-12',
    major: 'Business',
  },
  {
    studentId: 4444,
    name: 'Marvyn Wendi',
    dateOfBirth: '1978-09-24',
    major: 'Psychology',
  },
];

export const DataTable = () => {
  const [data, setData] = useState(() => [...defaultData]);
  const [originalData, setOriginalData] = useState(() => [...defaultData]);
  const [editedRows, setEditedRows] = useState({});

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
          );
        } else {
          setOriginalData((old) =>
            old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
          );
        }
      },
      updateData: (rowIndex: number, columnId: string, value: string) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
  });

  return (
    <article className="table-container">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* <pre>{JSON.stringify(data, null, "\t")}</pre> */}
    </article>
  );
};
