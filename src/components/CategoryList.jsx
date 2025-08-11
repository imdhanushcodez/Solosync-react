import { Layers2, Pencil } from 'lucide-react'
import React from 'react'

function CategoryList({categories=[],onEditCategory}) {

  return (
    <div className="cards p-4 bg-white">
        <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold"> Category Sources</h4>
        </div>

        {
            categories?.length === 0 ? 
            (
                <p className="No Categories available. Please add a Category"></p>
            )
            :
            (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {
                        categories.map((category,index) => (
                            <div 
                            key = {index}
                            className="group relative flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100/60">
                                {/*Icon */}

                                <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
                                    {
                                        category.icon ? (
                                            <span className="text-2xl">
                                                <img src={category.icon} alt={category.name} className="h-5 w-5" />
                                            </span>
                                        )
                                        :
                                        (
                                            <Layers2 className="text-purple-600" size={24}></Layers2>
                                        )
                                    }
                                </div>

                                {/* Category details*/}
                                <div className="flex-1 flex items-center justify-between">
                                    {/* Category name and type*/}
                                    <div>
                                        <p className="text-sm text-gray-700 font-medium"> 
                                            {category.name}
                                        </p>
                                        <p className="text-sm text-gray-400 mt-1 capitalize"> 
                                            {category.type}
                                        </p>
                                    </div>

                                    {/* Category actions*/}
                                    <div className="flex items-center gap-2">
                                        <button 
                                        onClick={() => onEditCategory(category)}
                                        className="text-gray-400 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                            <Pencil size={18}></Pencil>
                                        </button>
                                    </div>

                                </div>

                                
                            </div>
                        ))
                    }
                </div>
            )
        }


    </div>
  )
}

export default CategoryList