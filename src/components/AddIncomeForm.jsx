import React, { useEffect, useState } from 'react'
import EmojiiPicker from '../components/EmojiiPicker';
import Input from "../components/Input";

function AddIncomeForm({onAddIncome,categories=[],expense=false}) {
    const [income,setIncome] = useState({
        name:'',
        amount:'',
        date:'',
        icon:'',
        categoryId:''
        });

    const categoryOptions = categories.map(category => ({
        value: category.id,
        label: category.name
    }));

    const handleChange = (key,value) => {
        setIncome({...income,[key]:value});
    }

    useEffect(() => {
        if(categories.length > 0 && !income.categoryId){
            setIncome((prev) => ({...prev, categoryId:categories[0].id}))
        }
    },[categories,income.categoryId]);


  return (
    <div>
        <EmojiiPicker
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange('icon',selectedIcon)}>
        </EmojiiPicker>

        <Input
        type="text"
        placeHolder={expense==true ? "e.g., Transport, medical, foods":"e.g., Salary, Freelance, Bonus"}
        label={expense==true ? "Expense source":"Income source"}
        onChange={({target}) => handleChange('name',target.value)} 
        value={income.name}>
        </Input>

        <Input
        options={categoryOptions}
        isSelect={true}
        onChange={({target}) => handleChange('categoryId',target.value)}
        value={income.categoryId} 
        label="CategoryId">
        </Input>

        <Input
        placeHolder="e.g.,5000 100 10 "
        type="number"
        label="Amount"
        onChange={({target}) => handleChange('amount',target.value)}
        value={income.amount}>
        </Input>

         <Input
        placeHolder=""
        type="date"
        label="Date"
        onChange={({target}) => handleChange('date',target.value)}
        value={income.date}>
        </Input>

        <div className="flex justify-end mt-6">
            <button 
            onClick={() => onAddIncome(income)}
            className="rounded-lg bg-green-100 text-green-600 p-3 flex items-center justify-center">
                {expense==true ? "Add Expense":"Add Income"}
            </button>
        </div>
        
    </div>
  )
}

export default AddIncomeForm