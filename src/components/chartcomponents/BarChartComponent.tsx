import React from "react";
import { CHART_COLORS } from "./Colors";

// Bar Chart Renderer (for 1 year / 12 months)
const BarChartComponent = (data: { processed: any[] }) => {
    const { processed } = data;
    if (processed.length === 0) return null;
    
    const maxCount = Math.max(...processed.map((d: { count: number }) => d.count)) || 10;
    const barWidth = 100 / processed.length * 0.7; // 70% width allocated for bars
    const barGap = 100 / processed.length * 0.3; // 30% width allocated for gaps
    
    return (
    <div className="relative flex-grow min-h-[250px] w-full border rounded-xl p-2">
        <svg viewBox="0 0 100 110" preserveAspectRatio="none" className="w-full h-full">
            {/* Y-Axis Grid Lines */}
            {[25, 50, 75].map(y => (
                <React.Fragment key={y}>
                    <line x1="0" y1={100 - y} x2="100" y2={100 - y} stroke="#e5e7eb" strokeWidth="0.3" />
                    <text x="-1" y={100 - y + 1} className="text-[3px] fill-gray-500" textAnchor="end">{Math.round((y / 100) * maxCount)}</text>
                </React.Fragment>
            ))}

            {/* Bars and Labels */}
            {processed.map((d : { label: string; count: number }, i : number) => {
                const barHeight = (d.count / maxCount) * 100;
                const xStart = (i * (barWidth + barGap)) + (barGap / 2);
                const yStart = 100 - barHeight;
                const color = CHART_COLORS[i % CHART_COLORS.length];
                
                return (
                    <g key={i}>
                        {/* Bar */}
                        <rect 
                            x={xStart} 
                            y={yStart} 
                            width={barWidth} 
                            height={barHeight} 
                            fill={color} 
                            rx="1.5"
                            className="hover:opacity-80 transition-opacity duration-150"
                        />

                        {/* X-Axis Label (Month) */}
                        <text 
                            x={xStart + barWidth / 2} 
                            y="108" // Position slightly below the chart area
                            className="text-[3px] fill-gray-600" 
                            textAnchor="middle"
                        >
                            {d.label}
                        </text>
                        
                        {/* Value Label (Above Bar) */}
                        <text 
                            x={xStart + barWidth / 2} 
                            y={yStart - 1} // Position slightly above the bar
                            className="text-[3px] fill-gray-800 font-bold" 
                            textAnchor="middle"
                        >
                            {d.count}
                        </text>
                    </g>
                );
            })}
            
            {/* Max Count Label */}
            <text x="-1" y="5" className="text-[3px] fill-gray-500 font-semibold" textAnchor="end">{maxCount}</text>
        </svg>
    </div>
    );
};

export default BarChartComponent;