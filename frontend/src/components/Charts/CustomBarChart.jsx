import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

const CustomBarChart = ({ data, xAxisKey = "month", tooltipLabelKey = "source" }) => {

    const getBarColor = (index) => {
        return index % 2 === 0 ? "#875cf5" : "#cfbefb";
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
                    <p className="text-xs font-semibold text-purple-800 mb-1">
                        {payload[0].payload[tooltipLabelKey]}
                    </p>
                    <p className="text-sm text-gray-600">
                        Amount:{" "}
                        <span className="text-sm font-medium text-gray-900">
                            ₹{payload[0].payload.amount}
                        </span>
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white mt-6">
            {/* ✅ Fixed: explicit height wrapper so ResponsiveContainer works correctly */}
            <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 5, right: 20, left: 0, bottom: 5 }} // ✅ prevents overflow
                        barCategoryGap="30%"   // ✅ gap between category groups
                        barGap={4}             // ✅ gap between bars in same group
                    >
                        <CartesianGrid stroke="none" />
                        <XAxis
                            dataKey={xAxisKey}
                            tick={{ fontSize: 12, fill: "#555" }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fontSize: 12, fill: "#555" }}
                            stroke="none"
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
                        <Bar
                            dataKey="amount"
                            radius={[10, 10, 0, 0]}
                            maxBarSize={60}  // ✅ KEY FIX: caps bar width so it doesn't stretch
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={getBarColor(index)} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CustomBarChart;