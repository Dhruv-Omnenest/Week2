import React, { useState } from "react";

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
}

type sortDir = 'asc' | 'des' | null;

interface sortState<T> {
    key: keyof T | null;
    dir: sortDir
}


function DataTable<T extends object>({
    data,
    columns,
    rowKey,
    onRowClick,
    emptyMessage = 'No data found.',
}: DataTableProps<T>) {
    const [sort, setSort] = useState<sortState<T>>({
        key: null,
        dir: null
    })


    const handleSort = (key: keyof T) => {
        setSort(prev => ({
            key,
            dir: prev.key === key && prev.dir === 'asc' ? 'des' : 'asc',
        }));
    };


    const sorted = [...data].sort((a, b) => {
        if (!sort.key || !sort.dir) return 0;
        const av = a[sort.key], bv = b[sort.key];
        if (av < bv) return sort.dir === 'asc' ? -1 : 1;
        if (av > bv) return sort.dir === 'asc' ? 1 : -1;
        return 0;
    });



    if (data.length === 0) return <p>{emptyMessage}</p>

    return (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr style={{ background: '#1e3a8a', color: '#fff' }}>
                    {columns.map(col => (
                        <th
                            key={String(col.key)}
                            onClick={() => col.sortable && handleSort(col.key)}
                            style={{
                                padding: 8, textAlign: 'left',
                                cursor: col.sortable ? 'pointer' : 'default',
                                background: '#1E3A8A', color: '#fff',
                                userSelect: 'none',
                            }}
                        >
                            {col.header}
                            {col.sortable && sort.key === col.key
                                ? (sort.dir === 'asc' ? '  ▲' : '  ▼')
                                : col.sortable ? '  ⇅' : ''}
                        </th>

                    ))}
                </tr>
            </thead>
            <tbody>
                {sorted.map((row, ri) => (
                    <tr key={String(row[rowKey])} onClick={() => onRowClick?.(row)}
                        style={{
                            background: ri % 2 === 0 ? '#fff' : '#f8fafc',
                            cursor: onRowClick ? 'pointer' : 'default'
                        }}>
                        {columns.map(col => (
                            <td key={String(col.key)} style={{ padding: 8 }}>
                                {col.render ? col.render(row[col.key], row) : String(row[col.key])}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}


export default DataTable;