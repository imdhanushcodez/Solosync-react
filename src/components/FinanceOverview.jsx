import React from 'react'
import MyPieChart from './MyPieChart';

function FinanceOverview({totalBalance,totalIncome,totalExpense}) {

    const balanceData = [
        {name:"Total Balance",value: totalBalance},
        {name:"Total Expenses",value: totalExpense},
        {name:"Total Income",value: totalIncome}
    ];


  return (
    <div className="bg-white p-5 rounded-lg">
        <div className="flex items-center justify-between">
            <h5 className="text-lg">Financial Overview</h5>
        </div>

        <MyPieChart data={balanceData}>

        </MyPieChart>
    </div>
  )
}

export default FinanceOverview