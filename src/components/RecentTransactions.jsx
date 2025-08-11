import { ArrowRight } from 'lucide-react'
import React from 'react'
import TransactionsCards from '../components/TransactionsCards';
import moment from 'moment';

function RecentTransactions({transactions,onMore}) {
  return (
    <div className="rounded-lg p-3 bg-white">
        <div className="flex items-center justify-between">
             <h4 className="text-lg">Recent Transactions</h4>

             <button 
             onClick={onMore}
             className="rounded-lg p-3 bg-purple-500">
                More <ArrowRight className="text-base" size={25}></ArrowRight>
             </button>
        </div>

        <div className="mt-6">
            {transactions?.slice(0,5)?.map(item => (
                <TransactionsCards
                type={item.type}
                hideDeleteBtn={true}
                amount={item.amount}
                date={moment(item.date).format("Do MMM YYYY")}
                icon={item.icon}
                title={item.name}
                key={item.id}>

                </TransactionsCards>
            ))}
        </div>
    </div>
  )
}

export default RecentTransactions