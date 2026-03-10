import React from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell,Legend } from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

const CustomPieChart = ({ data , label, totalAmount, showTextAnchor, colors = [] }) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height={380}>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={100}
            labelLine={false}
             //  true/false OR custom function
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
                   // centered
/>
          {showTextAnchor && (
            <>
            <text
            x="50%"
            y="50%"
            dy={-25}
            textAnchor="middle"
            fill="666"
            fontSize="14px"
            >
              {label}
            </text>
            <text
            x="50%"
            y="50%"
            dy={8}
            textAnchor="middle"
            fill="333"
            fontSize="24px"
            fontWeight="semibold"
            >{totalAmount}</text>

            </>
          )}
        </PieChart>
      </ResponsiveContainer>

      {/* Total income display */}
      {/* <div className="text-center mt-2"> */}
        {/* <p className="text-sm text-gray-500">{label}</p> */}
        {/* <p className="text-lg font-semibold">{totalAmount}</p> */}
      </div>
    
  );
};

export default CustomPieChart;
