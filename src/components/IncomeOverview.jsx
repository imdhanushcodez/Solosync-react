import React, { useEffect, useState } from 'react'
import IncomeLineChart from './IncomeLineChart';
import { Plus } from 'lucide-react';

function IncomeOverview({ transactions, onAddIncome, expense = false }) {


    return (
        <div className="bg-white rounded-lg p-6 flex">
            <div className="flex flex-col w-full h-full">
                <div className="flex justify-between items-center">
                    <div>
                        <h5 className="text-lg ">
                            {expense == true ? "Expense Overview" : "Income Overview"}

                        </h5>
                        <p className="text-xs text-gray-400 mt-0 ">
                            {expense == true ? "Track your expense over time and analyze your expense trends." : "Track your earnings over time and analyze your income trends."}
                        </p>
                    </div>

                    <button
                        onClick={onAddIncome}
                        className="rounded-lg bg-green-100 text-green-600 p-3 flex items-center justify-center mb-2">
                        <Plus size={15} className="text-lg">
                        </Plus>
                        {expense == true ? "Add Expense " : "Add Income"}

                    </button>

                </div>

                <div className="mt-10 bg-purple-100 w-full h-full">
                    {/* Create a line chart */}
                    <IncomeLineChart data={transactions}>

                    </IncomeLineChart>

                </div>


            </div>
        </div>
    )
}

export default IncomeOverview