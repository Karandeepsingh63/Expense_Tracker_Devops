import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance || 0 },
    { name: "Total Income", amount: totalIncome || 0 },
    { name: "Total Expenses", amount: totalExpense || 0 },
  ];

  // ✅ Guard: Recharts PieChart breaks if ALL values are 0
  const hasData = balanceData.some((item) => item.amount > 0);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold text-gray-800">Financial Overview</h5>
      </div>

      {hasData ? (
        <CustomPieChart
          data={balanceData}
          label="Total Balance"
          colors={COLORS}
          totalAmount={`₹${totalBalance}`}
          showTextAnchor
        />
      ) : (
        // ✅ Fallback so card doesn't collapse when data is empty
        <div className="flex items-center justify-center h-64 text-sm text-gray-400">
          No financial data available
        </div>
      )}
    </div>
  );
};

export default FinanceOverview;