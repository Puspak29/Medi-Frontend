import React, { useMemo, useState } from "react";
import { BarChart, PieChart, LineChart } from "../assets/SvgLogos";
import { BarChartComponent, LineChartComponent, PieChartComponent } from "./chartcomponents";



const getMonthName = (monthIndex: number) => [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
][monthIndex % 12];

function Charts({ mockData }: { mockData: any[] }) {
    const [timeSpan, setTimeSpan] = useState<'week' | 'month' | 'year'>('month'); // week, month, year
    
    // --- Data Aggregation Logic ---
    const aggregatedData = useMemo(() => {
        const today = new Date(); 
        
        let daysToFilter;
        let dataMap: any = {};
        let totalAppointments = 0;

        if (timeSpan === 'week') daysToFilter = 7;
        else if (timeSpan === 'month') daysToFilter = 30;
        else daysToFilter = 365;

        const limitDate = new Date(today);
        limitDate.setDate(today.getDate() - daysToFilter);

        const relevantData = mockData
            .filter(d => new Date(d.date) >= limitDate)
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            
        totalAppointments = relevantData.reduce((sum, d) => sum + d.count, 0);

        if (timeSpan === 'month') {
            // Aggregate by 4 Weeks for Pie Chart
            dataMap = { 'Week 1': 0, 'Week 2': 0, 'Week 3': 0, 'Week 4': 0 };
            const weekLength = Math.ceil(relevantData.length / 4);
            
            relevantData.forEach((d, index) => {
                let week = 1;
                if (index >= weekLength * 3) week = 4;
                else if (index >= weekLength * 2) week = 3;
                else if (index >= weekLength) week = 2;
                
                dataMap[`Week ${week}`] += d.count;
            });
            
            return { 
                processed: Object.entries(dataMap).map(([label, count]) => ({ label, count: count as number })), 
                totalAppointments 
            };
        
        } else if (timeSpan === 'year') {
            // Aggregate by 12 Months for Bar Chart
            const monthDataMap: Record<number, { month: string; count: number; index: number }> = {};
            for(let i = 0; i < 12; i++) {
                const date = new Date(today);
                date.setMonth(today.getMonth() - i);
                monthDataMap[date.getFullYear() * 100 + date.getMonth()] = { month: getMonthName(date.getMonth()), count: 0, index: i };
            }

            relevantData.forEach(d => {
                const dateObj = new Date(d.date);
                const key = dateObj.getFullYear() * 100 + dateObj.getMonth();
                if (monthDataMap[key]) {
                    monthDataMap[key].count += d.count;
                }
            });
            
            // Sort by month index descending (Jan oldest, Dec newest) and map
            const processed = Object.values(monthDataMap)
                .sort((a, b) => a.index - b.index)
                .map(d => ({ label: d.month, count: d.count }));

            return { processed, totalAppointments };

        } else { // 'week' view (Line Chart)
            const processed = relevantData.map(d => ({ 
                label: new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' }), 
                count: d.count, 
                fullDate: d.date 
            }));
            return { processed, totalAppointments };
        }
    }, [timeSpan, mockData]);
    
    // --- Main Component Rendering ---
    
    let ChartComponent;
    let Icon;
    let chartTitle;
    let chartDescription;

    if (timeSpan === 'month') {
        ChartComponent = PieChartComponent;
        Icon = PieChart;
        chartTitle = 'Monthly Appointment Breakdown (4 Weeks)';
        chartDescription = 'Distribution of booked appointments over the last 30 days.';
    } else if (timeSpan === 'year') {
        ChartComponent = BarChartComponent;
        Icon = BarChart;
        chartTitle = 'Annual Booking Summary (12 Months)';
        chartDescription = 'Total appointments booked each month over the last year.';
    } else { // 'week'
        ChartComponent = LineChartComponent;
        Icon = LineChart;
        chartTitle = 'Last 7 Days Booking Trend (Daily)';
        chartDescription = 'Daily count of booked appointments for the last week.';
    }


    const TimeButton = ({ span, label, ChartIcon } : { span: 'week' | 'month' | 'year', label: string, ChartIcon: React.FC<any> }) => (
        <button
            onClick={() => setTimeSpan(span)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 ${
                timeSpan === span
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
            }`}
        >
            <ChartIcon className="w-4 h-4" />
            {label}
        </button>
    );
    
    return (
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 w-full h-full flex flex-col">
            <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                <Icon className="text-blue-600 w-5 h-5 mr-2" /> 
                {chartTitle}
            </h3>
            <p className="text-sm text-gray-500 mb-4">{chartDescription}</p>

            Time Span Selectors
            <div className="flex flex-wrap gap-3 mb-6">
                <TimeButton span="week" label="7 Days" ChartIcon={LineChart} />
                <TimeButton span="month" label="1 Month" ChartIcon={PieChart} />
                <TimeButton span="year" label="1 Year" ChartIcon={BarChart} />
            </div>

            {/* Chart Area */}
            <div className="flex-grow flex items-center justify-center">
                {aggregatedData.totalAppointments > 0 ? (
                    <div className="h-full w-full lg:w-1/2">
                    <ChartComponent {...aggregatedData} />
                    </div>
                ) : (
                    <div className="text-center p-10 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                        <p className="text-gray-500 text-lg">No data available for this period.</p>
                    </div>
                )}
            </div>
            
            <p className="text-xs text-gray-400 mt-4 text-center">
                Visualizing {aggregatedData.totalAppointments} total appointments.
            </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 w-full h-full flex flex-col">
            <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                <Icon className="text-blue-600 w-5 h-5 mr-2" /> 
                {chartTitle}
            </h3>
            <p className="text-sm text-gray-500 mb-4">{chartDescription}</p>

            {/* Time Span Selectors */}
            {/* <div className="flex flex-wrap gap-3 mb-6">
                <TimeButton span="week" label="7 Days" ChartIcon={LineChart} />
                <TimeButton span="month" label="1 Month" ChartIcon={PieChart} />
                <TimeButton span="year" label="1 Year" ChartIcon={BarChart} />
            </div> */}

            {/* Chart Area */}
            <div className="flex-grow flex items-center justify-center">
                {aggregatedData.totalAppointments > 0 ? (
                    <div className="h-full w-full lg:w-1/2">
                    <PieChartComponent {...aggregatedData} />
                    </div>
                ) : (
                    <div className="text-center p-10 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                        <p className="text-gray-500 text-lg">No data available for this period.</p>
                    </div>
                )}
            </div>
            
            <p className="text-xs text-gray-400 mt-4 text-center">
                Visualizing {aggregatedData.totalAppointments} total appointments.
            </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 w-full h-full flex flex-col">
            <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                <Icon className="text-blue-600 w-5 h-5 mr-2" /> 
                {chartTitle}
            </h3>
            <p className="text-sm text-gray-500 mb-4">{chartDescription}</p>

            {/* Time Span Selectors */}
            {/* <div className="flex flex-wrap gap-3 mb-6">
                <TimeButton span="week" label="7 Days" ChartIcon={LineChart} />
                <TimeButton span="month" label="1 Month" ChartIcon={PieChart} />
                <TimeButton span="year" label="1 Year" ChartIcon={BarChart} />
            </div> */}

            {/* Chart Area */}
            <div className="flex-grow flex items-center justify-center">
                {aggregatedData.totalAppointments > 0 ? (
                    <div className="h-full w-full lg:w-1/2">
                    <BarChartComponent {...aggregatedData} />
                    </div>
                ) : (
                    <div className="text-center p-10 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                        <p className="text-gray-500 text-lg">No data available for this period.</p>
                    </div>
                )}
            </div>
            
            <p className="text-xs text-gray-400 mt-4 text-center">
                Visualizing {aggregatedData.totalAppointments} total appointments.
            </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 w-full h-full flex flex-col">
            <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                <Icon className="text-blue-600 w-5 h-5 mr-2" /> 
                {chartTitle}
            </h3>
            <p className="text-sm text-gray-500 mb-4">{chartDescription}</p>

            {/* Time Span Selectors */}
            {/* <div className="flex flex-wrap gap-3 mb-6">
                <TimeButton span="week" label="7 Days" ChartIcon={LineChart} />
                <TimeButton span="month" label="1 Month" ChartIcon={PieChart} />
                <TimeButton span="year" label="1 Year" ChartIcon={BarChart} />
            </div> */}

            {/* Chart Area */}
            <div className="flex-grow flex items-center justify-center">
                {aggregatedData.totalAppointments > 0 ? (
                    <div className="h-full w-full lg:w-1/2">
                    <LineChartComponent {...aggregatedData} />
                    </div>
                ) : (
                    <div className="text-center p-10 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                        <p className="text-gray-500 text-lg">No data available for this period.</p>
                    </div>
                )}
            </div>
            
            <p className="text-xs text-gray-400 mt-4 text-center">
                Visualizing {aggregatedData.totalAppointments} total appointments.
            </p>
        </div>
        </div>
    );
}

export default Charts;