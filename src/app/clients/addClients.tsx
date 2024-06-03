import React from 'react';
import { TextField } from '@mui/material';

const AddClients = () => {
  return (
    <div>
      <form action="" className='mt-2'>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-5">
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Clients Name <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="text"
              className="border-2 border-gray-300 p-2 w-full double_input"
              name="client_name"
              id="client_name"
              required
            />
          </div>
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Contact Number <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="tel"
              className="border-2 border-gray-300 p-2 w-full double_input"
              name="contact"
              id="contact"
              required
            />
          </div>
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Review <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="text"
              className="border-2 border-gray-300 p-2 w-full double_input"
              name="review"
              id="review"
              required
            />
          </div>
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Gmail ID <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="email"
              className="border-2 border-gray-300 p-2 w-full double_input"
              name="gmail"
              id="gmail"
              required
            />
          </div>
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Profile of Client<span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="file"
              className="border-2 border-gray-300 p-2 w-full double_input"
              name="profile"
              id="profile"
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
    </div>
  )
}

export default AddClients
