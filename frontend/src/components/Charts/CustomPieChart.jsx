import React from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

const CustomPieChart = ({ data, label, totalAmount, showTextAnchor, colors = [] }) => {
  return (
    // ✅ Fixed: removed fixed h-64, let the chart define its own height
    <div className="w-full flex flex-col items-center">
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"         // ✅ vertically centered within the 320px container
            outerRadius={110} // ✅ reduced from 130 so it fits without clipping
            innerRadius={80}  // ✅ reduced proportionally
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip content={CustomTooltip} />
          <Legend
            content={CustomLegend}
            verticalAlign="bottom"  // ✅ legend sits below the donut
            align="center"
          />

          {showTextAnchor && (
            <>
              <text
                x="50%"
                y="43%"          // ✅ adjusted so label + amount are visually centered in the ring
                textAnchor="middle"
                fill="#666666"   // ✅ fixed: was fill="666" (missing #)
                fontSize="13px"
              >
                {label}
              </text>
              <text
                x="50%"
                y="52%"          // ✅ sits just below the label
                textAnchor="middle"
                fill="#333333"   // ✅ fixed: was fill="333" (missing #)
                fontSize="20px"
                fontWeight="bold"
              >
                {totalAmount}
              </text>
            </>
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;