import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import { useNavigate } from 'react-router-dom';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import InfoCard from '../../components/Cards/InfoCard';
import { IoMdCard } from 'react-icons/io';
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu"
import { addThousandsSeparator } from '../../utils/helper';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import ExpenseTransaction from '../../components/Dashboard/ExpenseTransaction';
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses';
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart';
import RecentIncome from '../../components/Dashboard/RecentIncome';

function Home() {
  useUserAuth();
  const navigate = useNavigate();

  const [DashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);
      if (response.data) {
        setDashboardData(response.data);
        console.log("API Data:", response.data);
      }
    } catch (error) {
      console.log("Something error occurred while fetching dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);
  // console.log("Expense Data:", DashboardData?.expenseLast60Days?.transactions);
  console.log("Income Data",DashboardData?.last60DaysIncome?.transactions)


  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='my-5 mx-auto'>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* total balance */}
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeparator(DashboardData?.totalBalance || 0)}
            color="bg-primary"
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandsSeparator(DashboardData?.totalIncome || 0)}
            color="bg-orange-500"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandsSeparator(DashboardData?.totalExpense || 0)}
            color="bg-red-500"
          />
        </div>
{/* 
    //main section */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <RecentTransactions
            transactions={DashboardData?.recentTransactions || []}
            onSeeMore={() => navigate("/expense")}
          />

          {/* Finance Overview */}

          <FinanceOverview
            totalBalance={DashboardData?.totalBalance || 0}
            totalIncome={DashboardData?.totalIncome || 0}
            totalExpense={DashboardData?.totalExpense || 0}
          />

          {/* Last 60 Days Expense */}

           <ExpenseTransaction
  transactions={DashboardData?.Last30DaysExpenses?.transactions || []}
  onSeeMore={() => navigate("/expense")}
/>

<Last30DaysExpenses
  data={DashboardData?.Last30DaysExpenses?.transactions || []}
/>
          {/* Last 60 Days Income (Chart + List) */}
          <RecentIncomeWithChart
            data={DashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []}
            totalIncome={DashboardData?.totalIncome || 0}
          />

          <RecentIncome
            transactions={DashboardData?.last60DaysIncome?.transactions || []}
            onSeeMore={() => navigate("/income")}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home
