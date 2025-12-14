import React from "react";

const LineChartComponent = (data: { processed: { label: string; count: number; }[] }) => {
    const { processed } = data;
    if (processed.length === 0) return null;
    
    const maxCount = Math.max(...processed.map(d => d.count)) || 10;
    
    // Map points to SVG coordinates (0-100 scale)
    const points = processed.map((d, i) => {
        const x = (i / (processed.length - 1)) * 100;
        const y = 100 - (d.count / maxCount) * 100;
        return { x, y, count: d.count, label: d.label };
    });
    
    const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ');

    return (
    <div className="relative flex-grow min-h-[250px] w-full border rounded-xl p-2">
        <svg viewBox="0 0 100 110" preserveAspectRatio="none" className="w-full h-full">
            {/* Y-Axis Grid Lines */}
            {[25, 50, 75, 100].map(y => (
                <React.Fragment key={y}>
                    <line x1="0" y1={100 - y} x2="100" y2={100 - y} stroke="#e5e7eb" strokeWidth="0.3" />
                    <text x="-1" y={100 - y + 1} className="text-[3px] fill-gray-500" textAnchor="end">{Math.round((y / 100) * maxCount)}</text>
                </React.Fragment>
            ))}

            {/* Path */}
            <path 
                d={pathD} 
                fill="none" 
                stroke="#3B82F6" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />

            {/* Data Points and Labels */}
            {points.map((p, i) => (
                <React.Fragment key={i}>
                    {/* Data Point Circle */}
                    <circle cx={p.x} cy={p.y} r="1.5" fill="#1D4ED8" />

                    {/* X-Axis Labels (Date) */}
                    <text 
                        x={p.x} 
                        y="108" // Position slightly below the chart area
                        className="text-[3px] fill-gray-600" 
                        textAnchor="middle"
                    >
                        {p.label}
                    </text>
                </React.Fragment>
            ))}
            
            {/* Max Count Label */}
            <text x="-1" y="5" className="text-[3px] fill-gray-500 font-semibold" textAnchor="end">{maxCount}</text>
        </svg>
    </div>
    );
};

export default LineChartComponent;