import React, { useEffect, useState } from 'react'
import CustomPieChart from '../Charts/CustomPieChart'

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4F39F6"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!data) return;
    // ✅ Moved logic inline — no need for a separate function
    const dataArr = data
      .filter((item) => item?.amount > 0) // ✅ skip zero-amount entries
      .map((item) => ({
        name: item?.source,
        amount: item?.amount,
      }));
    setChartData(dataArr);
  }, [data]);

  // ✅ Guard: prevents Recharts crash when all values are 0
  const hasData = chartData.length > 0 && chartData.some((item) => item.amount > 0);

  return (
    <div className="card overflow-hidden"> {/* ✅ overflow-hidden prevents chart bleed */}
      <div className="flex items-center justify-between mb-2">
        <h5 className="text-lg font-semibold text-gray-800">Last 60 Days Income</h5>
      </div>

      {hasData ? (
        <CustomPieChart
          data={chartData}
          label="Total Income"
          totalAmount={`₹${totalIncome}`}
          showTextAnchor
          colors={COLORS}
        />
      ) : (
        // ✅ Fallback UI so card holds its shape while loading or empty
        <div className="flex items-center justify-center h-64 text-sm text-gray-400">
          No income data for the last 60 days
        </div>
      )}
    </div>
  );
};

export default RecentIncomeWithChart;