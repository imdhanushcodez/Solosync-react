import React, { useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard'
import { useUser } from '../Hooks/useUser'
import InfoCards from '../components/InfoCards';
import { Coins, Wallet, WalletCards } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axiosConfig from '../utils/axiosConfig';
import { API_ENDPOINTS } from '../utils/apiEndpoints';
import toast from 'react-hot-toast';
import RecentTransactions from '../components/RecentTransactions';
import FinanceOverview from '../components/FinanceOverview';

function Home() {
  useUser();

  const navigate = useNavigate();
  const [DashboardData,setDashboardData] = useState(null);

  const fetchDashBoardDatas = async() => {
    try{
        const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_REQUEST);
        if(response.status === 200 || response.status === 201){
          setDashboardData(response.data);
          toast.success("Successfully fetched a data");
        }
    }
    catch(error){
        toast.error("Failed to fetch data");
    }
  }

  useEffect(() => {
      fetchDashBoardDatas();
  },[]);


  return (
    <div>
      <Dashboard activeMenu="Dashboard" >
          <div className="mt-5 p-2 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Display the cards */}
                <InfoCards
                color="bg-purple-800"
                value={DashboardData?.totalBalance != null ? DashboardData.totalBalance:"00"}
                label="Total Balance"
                icon={<WalletCards></WalletCards>}>
                </InfoCards>

                <InfoCards
                color="bg-green-800"
                value={DashboardData?.totalIncome != null ? DashboardData.totalIncome:"00"}
                label="Total Income"
                icon={<Wallet></Wallet>}>
                </InfoCards>

                <InfoCards
                color="bg-red-800"
                value={DashboardData?.totalExpense != null ? DashboardData.totalExpense:"00"}
                label="Total Expense"
                icon={<Coins></Coins>}>
                </InfoCards>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                  {/* Recent transactions */}
                  <RecentTransactions 
                  onMore={() => navigate("/expense")}
                  transactions={DashboardData?.recentTransactions}>
                  </RecentTransactions>
                  {/* finance over chart */}

                  <FinanceOverview
                  totalIncome={DashboardData?.totalIncome || 1 }
                  totalExpense={DashboardData?.totalExpense || 0}
                  totalBalance={DashboardData?.totalBalance || 0} >

                  </FinanceOverview>
                  {/* Expense transactions */}
                  {/* Income transactions */}
            </div>
          </div>
      </Dashboard>
    </div>
  )
}

export default Home