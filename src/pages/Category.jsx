import React, { useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard'
import { useUser } from '../Hooks/useUser';
import { Plus } from 'lucide-react';
import CategoryList from '../components/CategoryList';
import axiosConfig from '../utils/axiosConfig';
import { API_ENDPOINTS } from '../utils/apiEndpoints';
import toast from 'react-hot-toast';
import Modal from '../components/Modal';
import AddCategoryForm from '../components/AddCategoryForm';

function Category() {
  useUser();

  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategoryDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
      if (response.status === 200) {
        console.log("categories", response.data);
        setCategoryData(response.data);
      }
    }
    catch (error) {
      console.error("Something went wrong");
      toast.error(error.message);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    toast.success("CATEGORY PAGE IS LOADING");
    fetchCategoryDetails();
  }, []);

  const handleAddCategory = async (category) => {

    const { name, type, icon } = category;

    if (!name.trim()) {
      toast.error("Category Name is Required");
      return;
    }

    const isDuplicate = categoryData.some((category) => {
      return category.name.toLowerCase() === name.trim().toLowerCase();

    })

    if(isDuplicate){
      toast.error("Category name already exists");
      return;
    }

    try {
        const response = await axiosConfig.post(API_ENDPOINTS.GET_ALL_CATEGORIES,{name,type,icon});
        if(response.status === 201 || response.status === 200){
          toast.success("Category added successfully");
          setOpenAddCategoryModal(false);
          fetchCategoryDetails();
        }
    }
    catch (error) {
          console.log(error);
          toast.error(error.response?.data?.message ||"Failed ton add Category");
    }
  }


      const handleEditCategory = (categoryToEdit) => {
        console.log("Editing the category",categoryToEdit);
        setSelectedCategory(categoryToEdit);
        setOpenEditCategoryModal(true);
      }

      const handleUpdateCategory = async(selectedCategory) => {
        console.log("Updating the category",selectedCategory);
        const {id,name,type,icon} = selectedCategory;

         if (!name.trim()) {
              toast.error("Category Name is Required");
              return;
          }

           if (!id) {
              toast.error("Category Id is Required");
              return;
          }

          try{
            
              const response = await axiosConfig.post(API_ENDPOINTS.UPDATE_CATEGORIES(id),{name,type,icon});
              setOpenEditCategoryModal(false);
              setSelectedCategory(null);
              toast.success("Category updated successfully");
              fetchCategoryDetails();

          }
          catch(error){

            console.error(error);
            toast.error("Failed to update category");

          }


      }





  return (
    <Dashboard activeMenu="Category">
      <div className="my-5 mx-auto">
        {/* Add button to add category*/}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold"> All Categories</h2>
          <button

            onClick={() => setOpenAddCategoryModal(true)}
            className="flex items-center gap-1 bg-green-100 p-2 text-green-800 rounded-lg">
            <Plus size={15}></Plus>
            Add Category
          </button>
        </div>


        {/* category list */}
        <CategoryList categories={categoryData} onEditCategory={handleEditCategory}>
        </CategoryList>



        {/* adding category modal*/}
        <Modal
          isOpen={openAddCategoryModal}
          onclose={() => setOpenAddCategoryModal(false)}
          title="Add Category">
          <AddCategoryForm onAddCategory={handleAddCategory}>

          </AddCategoryForm>
        </Modal>


        {/* update category modal */}
         <Modal
          isOpen={openEditCategoryModal}
          onclose={() => 
              {
                setOpenEditCategoryModal(false)
                setSelectedCategory(null)
              }
          }
          title="Edit Category">
          <AddCategoryForm 
          initialCategoryData = {selectedCategory}
          isEditing = {true}
          onAddCategory={handleUpdateCategory}>

          </AddCategoryForm>
        </Modal>


      </div>
    </Dashboard>
  )
}

export default Category