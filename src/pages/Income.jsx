import React, { useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard'
import { useUser } from '../Hooks/useUser';
import axiosConfig from '../utils/axiosConfig';
import { API_ENDPOINTS } from '../utils/apiEndpoints';
import toast from 'react-hot-toast';
import IncomeList from '../components/IncomeList';
import Modal from '../components/Modal';
import { Plus } from 'lucide-react';
import AddIncomeForm from '../components/AddIncomeForm';
import DeleteAlert from '../components/DeleteAlert';
import IncomeOverview from '../components/IncomeOverview';


function Income() {
  useUser();
  const [incomeData,setIncomeData] = useState([]);
  const [categories,setCategories] = useState([]);
  const [loading,setLoading] = useState(false);
  const [openAddIncomeModal,setOpenAddIncomeModal] = useState(false);
  const [openDeleteAlert,setOpenDeleteAlert] = useState({
    show:false,
    data:null
  });

  // fetching income details 
  const fetchIncomeDetails = async() => {
    if(loading) return;

    setLoading(true);
    try{

          const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOME);
          if(response.status === 200){
            
            setIncomeData(response.data);
          }
    }
    catch(error){
        console.error("Failed to fetch income details",error);
        toast.error("Failed to fetch income details");

    }
    finally{
      setLoading(false);
    }
  }


  const fetchCategoriesDetails = async() => {

    try{
        const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income"));
        if(response.status === 200 || response.status === 201){
          
          setCategories(response.data);
        }
    }
    catch(error){
        console.log("Failed to fetch incomes",error);
        toast.error(error.data?.message || "Failed to fetch income categories");
    }

  }

  const handleAddIncome = async(income) => {
    const {name,amount,date,icon,categoryId} = income;

    //validation
    if(!name.trim()){
      toast.error("Please enter a name");
      return;
    }

    if(!amount || isNaN(amount) || Number(amount) <= 0){
      toast.error("Amount should be a valid number");
      return;
    }

    if(!date){
      toast.error("Please enter the date");
      return;
    }

    const today = new Date().toISOString().split('T')[0];
     if(date > today){
      toast.error("Date Cannot be in the future");
      return;
     }

     if(!categoryId){
      toast.error("Please select category",categoryId);
      return;
     }

     try{

        toast.success("AddIncome is Loading")
        const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME,{
          name,
          amount:Number(amount),
          date,
          icon,
          categoryId
        });

        if(response.status === 201){
          setOpenAddIncomeModal(false);
          toast.success("Income Add successfully");
          fetchCategoriesDetails();
          fetchIncomeDetails();
        }
        
     }
     catch(error){
      console.log(error);
        toast.error("Failed to add Income");
     }


  }


  //delete the income function
  const deleteIncomeDetails = async(id) => {
  toast.success("Deleting process started. wait for while...")
        try{
            const response = await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
            if(response.status === 200 || response.status === 201){
              setOpenDeleteAlert({show:false,data:null});
              toast.success("Income deleted successfully");
              fetchIncomeDetails();
            }
        }
        catch(error){
          console.log(error);
          toast.error("Failed to delete the income",error.message);
        }
  }

  const handleEmail = () => {
    
    toast.error("Email module is under production. Coming soon");
  }

  const handleDownload = async() => {
    try{
      toast.success("Started downloading excel");
        const response = await axiosConfig.get(API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD,{responseType:"blob"});
        let filename = "income_details.xlsx";
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download",filename);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
        toast.success("Download income details successfully");

    }
    catch(error){
        console.error("error downloading income details",error);
        toast.error("failed to download incomes");
    }
    
  }


  useEffect(() => {
        toast.success("INCOME PAGE IS LOADING");
    fetchIncomeDetails();
    fetchCategoriesDetails();
  },[]);




  return (
    <Dashboard activeMenu="Income">
        <div className="my-5 mx-auto">
          <div className="grid grid-cols-1 gap-6">
            <div className="">
                {/* overView for income with line char */}
                
              

                <IncomeOverview 
                onAddIncome={() => setOpenAddIncomeModal(true)}
                transactions={incomeData}>

                </IncomeOverview>

            </div>

            <IncomeList 
            onEmail={handleEmail}
            onDownload={handleDownload}
            onDelete={(id) => setOpenDeleteAlert({show:true,data:id})}
            transactions={incomeData}>
            </IncomeList>

            {/* Add Income Modal */}
            
            <Modal
            title="Add Income"
            onclose={() => setOpenAddIncomeModal(false)}
            isOpen={openAddIncomeModal}>
              
              <AddIncomeForm
              categories={categories}
              onAddIncome={(income) => handleAddIncome(income)}>

              </AddIncomeForm>
            </Modal>

            <Modal
            title="Delete Income Modal"
            onclose={() => setOpenDeleteAlert({show:false,data:null})}
            isOpen={openDeleteAlert.show}>
                <DeleteAlert 
                content="Are you sure want to delete this income details?"
                onDelete={() => deleteIncomeDetails(openDeleteAlert.data)}>

                </DeleteAlert>
            </Modal>

          </div>
        </div>
      </Dashboard>
  )
}

export default Income