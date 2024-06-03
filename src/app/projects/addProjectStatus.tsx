import React from 'react'

const AddProjectStatus = () => {
  return (
    <>
      <form action="" className='mt-2'>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-5">
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Projct Name <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="text"
              className="border-2 border-gray-300 p-2 w-full double_input"
              name="pro_name"
              id="pro_name"
              required
            />
          </div>
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Number of Members Involved <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="number"
              className="border-2 border-gray-300 p-2 w-full double_input"
              name="num_of_team"
              id="num_of_team"
              required
            />
          </div>
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Deadline <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="datetime-local"
              className="border-2 border-gray-300 p-2 w-full double_input"
              name="deadline"
              id="deadline"
              required
            />
          </div>
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Status <span className="text-red-500">*</span>
            </label>
            <br />
            <select id="status" name="status" className="border-2 border-gray-300 p-2 w-full double_input">
              <option value="" disabled selected>Select Project status</option>
              <option value="working">Not Started</option>
              <option value="holiday">In Progress</option>
              <option value="parttime">Completed</option>
              <option value="on_hold">On Hold</option>
            </select>
          </div>
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Updates <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="text"
              className="border-2 border-gray-300 p-2 w-full double_input"
              name="updates"
              id="updates"
              required
            />
          </div>
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Requirements <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="text"
              className="border-2 border-gray-300 p-2 w-full double_input"
              name="requirements"
              id="requirements"
              required
            />
          </div>
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Future Plan / Steps <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="text"
              className="border-2 border-gray-300 p-2 w-full double_input"
              name="plans"
              id="plans"
              required
            />
          </div>
        </div>
        <div className="flex justify-end p-1">
          <button
            className="p-3 bg-blue-500 text-white hover:bg-blue-400">
            Submit
          </button>
        </div>
      </form>

    </>
  )
}

export default AddProjectStatus
