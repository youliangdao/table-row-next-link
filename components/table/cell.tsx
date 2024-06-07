import { ChangeEvent, MouseEvent, useEffect, useState } from "react"

type Option = {
  label: string
  value: string
}

export const TableCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue()
  const columnMeta = column.columnDef.meta
  const tableMeta = table.options.meta
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const onBlur = () => {
    tableMeta?.updateData(row.index, column.id, value)
  }

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value)
    tableMeta?.updateData(row.index, column.id, e.target.value)
  }

  if (tableMeta?.editedRows[row.id]) {
    return columnMeta?.type === "select" ? (
      <select
        onChange={onSelectChange}
        value={initialValue}
        onClick={(e) => {
          // tableタグ使ったとき用
          // e.stopPropagation()
          // divタグ使ったとき用
          e.preventDefault()
        }}
      >
        {columnMeta?.options?.map((option: Option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        value={value}
        onClick={(e) => {
          // tableタグ使ったとき用
          // e.stopPropagation()
          // divタグ使ったとき用
          e.preventDefault()
        }}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        type={columnMeta?.type || "text"}
      />
    )
  }
  return <span>{value}</span>
}

export const EditCell = ({ row, table }) => {
  const meta = table.options.meta

  const setEditedRows = (e: MouseEvent<HTMLButtonElement>) => {
    // tableタグ使ったとき用
    // e.stopPropagation()
    // divタグ使ったとき用
    e.preventDefault()
    const elName = e.currentTarget.name
    meta?.setEditedRows((old: []) => ({
      ...old,
      [row.id]: !old[row.id],
    }))
    if (elName !== "edit") {
      meta?.revertData(row.index, e.currentTarget.name === "cancel")
    }
  }

  return (
    <div>
      {meta?.editedRows[row.id] ? (
        <div className="edit-cell">
          <button
            onClick={setEditedRows}
            name="cancel"
            className="p-2 hover:bg-gray-400"
          >
            X
          </button>{" "}
          <button
            onClick={setEditedRows}
            name="done"
            className="p-2 hover:bg-gray-400"
          >
            ✔
          </button>
        </div>
      ) : (
        <button
          onClick={setEditedRows}
          name="edit"
          className="p-2 hover:bg-slate-400"
        >
          ✐
        </button>
      )}
    </div>
  )
}
