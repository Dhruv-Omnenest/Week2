import React, { useState, useMemo, useEffect } from "react";

interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  width?: number;
  sortable?: boolean;
}

interface DataTableProps<T extends object> {
  data: T[];
  columns: Column<T>[];
  rowKey: keyof T;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  searchableKey?: keyof T;
  pageSize?: number; 
}

type SortDir = "asc" | "desc" | null;

interface SortState<T> {
  key: keyof T | null;
  dir: SortDir;
}

function DataTable<T extends object>({
  data,
  columns,
  rowKey,
  onRowClick,
  emptyMessage = "No data found.",
  searchableKey,
  pageSize=10,
}: DataTableProps<T>) {
  const [sort, setSort] = useState<SortState<T>>({ key: null, dir: null });
  const [filterText, setFilterText] = useState("");
  const [page, setPage] = useState(1);

  const handleSort = (key: keyof T) => {
    setSort(prev => ({
      key,
      dir: prev.key === key && prev.dir === "asc" ? "desc" : "asc",
    }));
  };

  // ---------------- FILTER ----------------
  const filteredData = useMemo(() => {
    if (!searchableKey || !filterText) return data;
    return data.filter(row =>
      String(row[searchableKey]).toLowerCase().includes(filterText.toLowerCase())
    );
  }, [data, filterText, searchableKey]);

  // ---------------- SORT ----------------
  const sortedAndFilteredData = useMemo(() => {
    const result = [...filteredData];
    if (!sort.key || !sort.dir) return result;

    return result.sort((a, b) => {
      const av = a[sort.key!];
      const bv = b[sort.key!];
      if (av === bv) return 0;

      const factor = sort.dir === "asc" ? 1 : -1;
      return av < bv ? -1 * factor : 1 * factor;
    });
  }, [filteredData, sort]);

  // ---------------- PAGINATION ----------------
  const totalPages = Math.max(
    1,
    Math.ceil(sortedAndFilteredData.length / pageSize)
  );

  const safePage = Math.min(page, totalPages);

  const paginatedData = sortedAndFilteredData.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );

  // Reset page when search OR data changes
  useEffect(() => {
    setPage(1);
  }, [filterText, data]);

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      {/* SEARCH */}
      {searchableKey && (
        <input
          type="text"
          placeholder={`Search by ${String(searchableKey)}...`}
          value={filterText}
          onChange={e => setFilterText(e.target.value)}
          style={{
            marginBottom: 12,
            padding: "8px",
            width: "100%",
            boxSizing: "border-box",
          }}
        />
      )}

      {/* TABLE */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid #e2e8f0",
        }}
      >
        <thead>
          <tr style={{ background: "#1e3a8a", color: "#fff" }}>
            {columns.map(col => (
              <th
                key={String(col.key)}
                onClick={() => col.sortable && handleSort(col.key)}
                style={{
                  padding: "12px 8px",
                  textAlign: "left",
                  cursor: col.sortable ? "pointer" : "default",
                  userSelect: "none",
                  width: col.width,
                }}
              >
                {col.header}
                {col.sortable && (
                  <span
                    style={{
                      marginLeft: 8,
                      opacity: sort.key === col.key ? 1 : 0.3,
                    }}
                  >
                    {sort.key === col.key
                      ? sort.dir === "asc"
                        ? "▲"
                        : "▼"
                      : "⇅"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, ri) => (
              <tr
                key={String(row[rowKey])}
                onClick={() => onRowClick?.(row)}
                style={{
                  background: ri % 2 === 0 ? "#fff" : "#f8fafc",
                  cursor: onRowClick ? "pointer" : "default",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                {columns.map(col => (
                  <td key={String(col.key)} style={{ padding: "12px 8px" }}>
                    {col.render
                      ? col.render(row[col.key], row)
                      : String(row[col.key])}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                style={{ padding: 20, textAlign: "center" }}
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: 8,
          }}
        >
          <button
            disabled={safePage <= 1}
            onClick={() => setPage(p => Math.max(1, p - 1))}
          >
            ← Previous
          </button>

          <span>
            Page {safePage} of {totalPages} ({sortedAndFilteredData.length} rows)
          </span>

          <button
            disabled={safePage >= totalPages}
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

export default DataTable;