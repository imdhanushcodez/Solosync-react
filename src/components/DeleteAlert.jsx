import React from 'react'

function DeleteAlert({content,onDelete}) {
  return (
    <div>
        <p className="text-sm">{content}</p>
        <div className="flex justify-end mt-6">
            <button 
            className="rounded-lg bg-red-100 text-red-600 p-3 flex justify-center items-center"
            type="button"
            onClick={onDelete}>
                delete
            </button>
        </div>
    </div>
  )
}

export default DeleteAlert