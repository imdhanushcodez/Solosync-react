import React, { useEffect, useState } from 'react'
import Input from './Input'
import EmojiiPicker from './EmojiiPicker';
import { LoaderCircle } from 'lucide-react';

function AddCategoryForm({onAddCategory,initialCategoryData,isEditing}) {

    const[category,setCategory] = useState({
        name:"",
        type:"income",
        icon:""
    });

    const [loading,setLoading] = useState(false);

    useEffect(() => {
        if(isEditing && initialCategoryData){
            setCategory(initialCategoryData);
        }
        else{
            setCategory({
                name:"",
                type:"income",
                icon:""
            });
        }
    },[isEditing,initialCategoryData]);




    const categoryTypeOptions = [
        {
            value:"income",
            label:"Income"
        },
        {
            value:"expense",
            label:"Expense"
        }
    ];

    const handleChange = (key,value) => {
        setCategory({...category,[key]:value})
    }

    const handleSubmit = () => {
        setLoading(true)
        try{
            onAddCategory(category);
        }
        finally{
            setLoading(false);
        }
        
    }


  return (
    <div className="p-4">

        <EmojiiPicker 
        onSelect = {(selectedIcon) => handleChange("icon",selectedIcon)}
        icon={category.icon}>
            
        </EmojiiPicker>


        <Input 
        value={category.name}
        onChange={({target}) => handleChange("name",target.value)}
        label="Category Name"
        placeHolder="e.g., Freelance, Salary, Groceries"
        type="text"
        >
        </Input>

        <Input
            label="Category type"
            value={category.type}
            onChange={({target}) => handleChange("type",target.value)}
            isSelect={true}
            options={categoryTypeOptions}

        >
        </Input>

        <div className="flex justify-end mt-6">
            <button
            className="flex items-center gap-1 bg-green-100 p-2 text-green-800 rounded-lg"
            disabled={loading}
            onClick={handleSubmit}
            type="button">
                {
                    loading ? (

                        <>
                            <LoaderCircle className="w-4 h-4 animate-spin">
                                Adding...
                            </LoaderCircle>
                        </>

                    ):(
                        <>
                            <span> Add Category </span>
                        </>
                    )
                }
            </button>
        </div>



        
    </div>
  )
}

export default AddCategoryForm