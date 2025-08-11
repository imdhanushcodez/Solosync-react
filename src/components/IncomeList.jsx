import { Download, Mail } from 'lucide-react'
import React from 'react'
import TransactionsCards from './TransactionsCards'
import moment from 'moment'

function IncomeList({transactions,onDelete,onDownload,onEmail,expense=false}) {
  return (
    <div className="cards bg-white p-5 rounded-lg">
        <div className="flex items-center justify-between">
            <h5 className="text-lg">{expense==true ? "Expense sources":"Income sources"}</h5>
            <div className="flex items-center justify-end gap-2">
                <button 
                onClick={onEmail}
                className="flex items-center justify-center gap-2 rounded-lg bg-gray-200 text-black hover:bg-purple-100 hover:text-purple-800 p-2">
                    <Mail size={15} className="text-base"></Mail>
                    Email
                </button>
                <button 
                onClick={onDownload}
                className="flex items-center justify-center gap-2 rounded-lg bg-gray-200 text-black hover:bg-purple-100 hover:text-purple-800 p-2">
                    <Download size={15} className="text-base"></Download>
                    Download
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Display the incomes */}
            {
                transactions?.map((incomes,index) => (
                    <TransactionsCards 
                    title={incomes.name}
                    icon={incomes.icon}
                    type={expense==true ? "expense":"income"}
                    date={moment(incomes.date).format("Do MMM YYYY")}
                    amount={incomes.amount}
                    onDelete={() => onDelete(incomes.id)}
                    key={index}>

                    </TransactionsCards>
                ))
            }


        </div>





    </div>
  )
}

export default IncomeList