import { CHART_COLORS } from "./Colors";

// Pie Chart Renderer (for 1 month / 4 weeks)
const PieChartComponent = (data: { processed: any[]; totalAppointments: number }) => {
    const { processed, totalAppointments } = data;
    if (totalAppointments === 0) return null;

    let cumulativeAngle = 0;

    const pieSlices = processed.map((d, i) => {
        const percentage = d.count / totalAppointments;
        const angle = percentage * 360;
        const startAngle = cumulativeAngle;
        const endAngle = cumulativeAngle + angle;
        cumulativeAngle += angle;

        const color = CHART_COLORS[i % CHART_COLORS.length];
        const radius = 45;
        const centerX = 50;
        const centerY = 50;

        const x1 = centerX + radius * Math.sin(startAngle * Math.PI / 180);
        const y1 = centerY - radius * Math.cos(startAngle * Math.PI / 180);
        const x2 = centerX + radius * Math.sin(endAngle * Math.PI / 180);
        const y2 = centerY - radius * Math.cos(endAngle * Math.PI / 180);
        
        // Large arc flag: 0 if angle <= 180, 1 if angle > 180
        const largeArcFlag = angle > 180 ? 1 : 0;
        
        const pathData = [
            `M ${centerX},${centerY}`, // Move to center
            `L ${x1},${y1}`,         // Line to start point
            `A ${radius},${radius} 0 ${largeArcFlag} 1 ${x2},${y2}`, // Arc
            'Z' // Close path to center
        ].join(' ');

        // Calculate label position for center of the arc
        const midAngle = startAngle + angle / 2;
        const labelRadius = radius * 0.7; // Place label slightly inside
        const labelX = centerX + labelRadius * Math.sin(midAngle * Math.PI / 180);
        const labelY = centerY - labelRadius * Math.cos(midAngle * Math.PI / 180);
        
        return {
            pathData,
            color,
            label: `${d.label} (${Math.round(percentage * 100)}%)`,
            labelX,
            labelY,
            percentage: Math.round(percentage * 100)
        };
    });

    return (
        <div className="relative flex-grow min-h-[300px] w-full flex flex-col items-center">
            <div className="w-full max-w-sm flex-grow">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    {pieSlices.map((slice, i) => (
                        <g key={i}>
                            <path 
                                d={slice.pathData} 
                                fill={slice.color} 
                                className="hover:opacity-80 transition-opacity duration-150"
                            />
                            {slice.percentage > 5 && ( // Only show label if slice is big enough
                                <text
                                    x={slice.labelX}
                                    y={slice.labelY}
                                    textAnchor="middle"
                                    alignmentBaseline="middle"
                                    className="text-[3.5px] font-bold fill-white"
                                >
                                    {slice.percentage}%
                                </text>
                            )}
                        </g>
                    ))}
                </svg>
            </div>
            
            {/* Legend */}
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 mt-4 w-full text-left max-w-sm">
                {pieSlices.map((slice, i) => (
                    <div key={i} className="flex items-center text-sm">
                        <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: slice.color }}></span>
                        <span className="text-gray-700">{slice.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PieChartComponent;