
import React from 'react'

interface TableSkeletonProps {
    rows?: number;
    cols?: number;
    title?: string
}

const shimmerCSS = `
    @keyframes shimmer {
        0% {background-position: -400px 0;}
        100% {background-position: 400px 0;}
    }
        .sk {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 400px 100%;
            animation: shimmer 1.4s ease-in-out infinite;
            border-radius: 4px;
            height: 16px;
        }
`;

const TableSkeleton: React.FC<TableSkeletonProps> = ({
    rows = 5,
    cols = 4,
    title,
}) => {
    return (
        <div style={{marginBottom: 24}}>
            <style>{shimmerCSS}</style>

            {title && (
                <div className='sk' style={{width: 200, height: 24, marginBottom: 12}}></div>
            )}

            <table style={{width: '100%', borderCollapse: 'collapse'}}>
                <thead>
                    <tr style={{background: "#1e3a8a"}}>
                        {Array.from({length: cols}).map(function(_, columnIndex) {
                            return (
                                <th key={columnIndex} style={{padding:10, width: `${100/cols}%`}}>
                                    <div className='sk' style={{width: '70%', background: '#4b6fbf'}}></div>
                                </th>
                            )
                        })}
                    </tr>
                </thead>

                <tbody>
                    {Array.from({length: rows}).map(function(_, rowIndex) {
                        var isEvenRow = rowIndex % 2 === 0;
                        var rowBackground = isEvenRow ? '#fff' : '#f8fafc';
                        return (
                            <tr key={rowIndex} style={{background: rowBackground}}>
                                {Array.from ({length: cols}).map(function(_, colIndex) {
                                    var extraWidth = (colIndex*10) % 40;
                                    var barWidth = 50 + extraWidth;

                                    return (
                                        <td key={colIndex} style={{padding: 10}}>
                                            <div className='sk' style={{width: `${barWidth}%`}}></div>
                                        </td>
                                    )
                                })}
                            </tr>

                        
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}


export default TableSkeleton;
