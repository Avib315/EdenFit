import React, { useState, useMemo } from "react";
import type { ITableProps } from "@/interfaces/IModels";
import "./style/style.scss";

const Table: React.FC<ITableProps> = ({
  columns,
  data,
  onRowClick,
  selectable = false,
  striped = true,
  hover = true,
  className = "",
  loading = false,
  paginated = false,
  pageSize = 10,
}) => {
  const [selectedRows, setSelectedRows] = useState<unknown[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const paginatedData = useMemo(() => {
    if (!paginated) return sortedData;
    const start = currentPage * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize, paginated]);

  const handleSort = (columnKey: string) => {
    setSortConfig((prev) => {
      if (prev?.key === columnKey) {
        return {
          key: columnKey,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key: columnKey, direction: "asc" };
    });
  };

  const handleRowClick = (row: unknown) => {
    if (selectable) {
      setSelectedRows((prev) =>
        prev.includes(row)
          ? prev.filter((r) => r !== row)
          : [...prev, row]
      );
    }
    onRowClick?.(row);
  };

  const tableClasses = [
    "table",
    striped && "table-striped",
    hover && "table-hover",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (loading) {
    return <div className="table-wrapper">Loading...</div>;
  }

  if (data.length === 0) {
    return <div className="table-wrapper">No data available</div>;
  }

  return (
    <div className="table-wrapper">
      <table className={tableClasses}>
        <thead className="table-head">
          <tr>
            {selectable && (
              <th className="table-header" style={{ width: "50px" }}>
                <input
                  type="checkbox"
                  checked={selectedRows.length === paginatedData.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRows([...paginatedData]);
                    } else {
                      setSelectedRows([]);
                    }
                  }}
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                className={`table-header ${
                  column.sortable ? "sortable" : ""
                }`}
                style={{ width: column.width }}
                onClick={() =>
                  column.sortable && handleSort(column.key)
                }
              >
                {column.label}
                {column.sortable && sortConfig?.key === column.key && (
                  <span>
                    {sortConfig?.direction === "asc" ? " ↑" : " ↓"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="table-row"
              onClick={() => handleRowClick(row)}
            >
              {selectable && (
                <td className="table-cell" style={{ width: "50px" }}>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row)}
                    onChange={(e) => e.stopPropagation()}
                  />
                </td>
              )}
              {columns.map((column) => {
                const cellValue = (row as Record<string, unknown>)?.[column.key];
                return (
                  <td key={column.key} className="table-cell">
                    {column.render
                      ? column.render(cellValue, row)
                      : (cellValue as React.ReactNode)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {paginated && (
        <div
          style={{
            padding: "16px",
            textAlign: "center",
            borderTop: "1px solid #e2e8f0",
          }}
        >
          <button
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <span style={{ margin: "0 16px" }}>
            Page {currentPage + 1} of{" "}
            {Math.ceil(sortedData.length / pageSize)}
          </span>
          <button
            onClick={() =>
              setCurrentPage(
                Math.min(
                  Math.ceil(sortedData.length / pageSize) - 1,
                  currentPage + 1
                )
              )
            }
            disabled={
              currentPage ===
              Math.ceil(sortedData.length / pageSize) - 1
            }
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
