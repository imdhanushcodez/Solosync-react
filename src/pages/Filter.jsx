import React, { useState } from 'react'
import Dashboard from '../components/Dashboard'
import { useUser } from '../Hooks/useUser';
import { Search } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosConfig from '../utils/axiosConfig';
import { API_ENDPOINTS } from '../utils/apiEndpoints';
import TransactionsCards from '../components/TransactionsCards';
import moment from 'moment';


function Filter() {
  useUser();

  const [type,setType] = useState("income");
  const [startdate,setStartdate] = useState("");
  const [enddate,setEnddate] = useState("");
  const [keyword,setKeyword] = useState("");
  const [sortField,setSortField] = useState("date");
  const [sortOrder,setSortOrder] = useState("asc");
  const [Transactions,setTransactions] = useState([]);
  const [loading,setloading] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    toast.success("Filter applied. Wait for while");
    //console.log(type,startdate,enddate,sortField,sortOrder,keyword);
    try{
        const response = await axiosConfig.post(API_ENDPOINTS.APPLY_FILTER,{
          type,
          startDate:startdate,
          endDate:enddate,
          keyword,
          sortField,
          sortOrder
        });

        if(response.status === 200 || response.status === 201){
          console.log(response.data);
          setTransactions(response.data);
          toast.success("filter applied successfully");
        }
    }
    catch(error){
      toast.error(response.error || "Failed to apply filter");
    }
  }



  return (
    <Dashboard activeMenu="Filter">
      <div className="my-5 mx-auto p-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold mt-2"> Filter Transactions </h2>
        </div>
        <div className="bg-white rounded-lg p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg">Select the filters</h5>
          </div>
          <form className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-5">
            <div className="">
              <label className="block text-sm font-medium mb-1" htmlFor="type">Type</label>
              <select 
              value={type} onChange={(e) => setType(e.target.value)}
              id="type" className="w-full border rounded px-3 py-2">
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
              </select>
            </div>
            <div>
              <label htmlFor="startdate" className="block text-sm font-medium mb-1">Start Date</label>
              <input 
              value={startdate} onChange={(e) => setStartdate(e.target.value)}
              id="startdate" type="date" className="w-full border rounded px-3 py-2"></input>
            </div>
            <div>
              <label htmlFor="enddate" className="block text-sm font-medium mb-1">end Date</label>
              <input 
              value={enddate} onChange={(e) => setEnddate(e.target.value)}
              id="enddate" type="date" className="w-full border rounded px-3 py-2"></input>
            </div>

             <div>
              <label htmlFor="sortfield" className="block text-sm font-medium mb-1">Sort field</label>
              <select 
              value={sortField} onChange={(e) => setSortField(e.target.value)}
              id="sortfield" className="w-full border rounded px-3 py-2">
                  <option value="date">Date</option>
                  <option value="amount">Amount</option>
                  <option value="category">Category</option>
              </select>
            </div>


            <div>
              <label htmlFor="sortorder" className="block text-sm font-medium mb-1">Sort order</label>
              <select 
              value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}
              id="sortorder" className="w-full border rounded px-3 py-2">
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
              </select>
            </div>

            <div className="sm:col-span-1 md:col-span-1 flex items-end">
              <div className="w-full">
                  <label htmlFor="keyword" className="block text-sm font-medium mb-1">Search</label>
                  <input 
                  value={keyword} onChange={(e) => setKeyword(e.target.value)}
                  id="keyword" type="text" placeholder="search..." className="w-full border rounded px-3 py-2"></input>
              </div>
              <button 
              onClick={handleSubmit}
              className="ml-2 mb-1 p-2 bg-purple-800 hover:bg-purple-900 text-white rounded flex items-center justify-center cursor-pointer">
                  <Search size={20}></Search>
              </button>
            </div>


          </form>
        </div>

        <div className="bg-white rounded-lg p-5">
          <div className="flex justify-between items-center mb-0">
            <h5 className="text-2xl font-semibold"> Transactions</h5>
          </div>
          {
            Transactions.length === 0 ? (
              <p className="text-gray-500"> Select the filters and click apply to filter the transactions</p>
            ):""
          }
          {
            Transactions.map((transaction,index) => (
                <TransactionsCards
                date={moment(transaction.date).format('Do MMM YYYY')}
                type={type}
                title={transaction.name}
                amount={transaction.amount}
                icon={transaction.icon}
                hideDeleteBtn={true}
                key={index}>

                </TransactionsCards>
            ))
          }
        </div>



      </div>
    </Dashboard>
  )
}

export default Filter