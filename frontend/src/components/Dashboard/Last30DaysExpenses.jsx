import React, { useEffect, useState } from 'react'
import CustomBarChart from '../Charts/CustomBarChart';
import { prepareExpenseBarChartData } from '../../utils/helper';

const Last30DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setChartData(result);
    return () => {};
  }, [data]);

  return (
    // ✅ Added overflow-hidden so chart never bleeds outside the card
    <div className="card col-span-1 overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <h5 className="text-lg font-semibold text-gray-800">
          Last 30 Days Expenses
        </h5>
      </div>

      {/* ✅ Guard: only render chart when data exists */}
      {chartData?.length > 0 ? (
        <CustomBarChart
          data={chartData}
          xAxisKey="category"
          tooltipLabelKey="category"
        />
      ) : (
        <div className="flex items-center justify-center h-48 text-sm text-gray-400">
          No expense data for the last 30 days
        </div>
      )}
    </div>
  );
};

export default Last30DaysExpenses;