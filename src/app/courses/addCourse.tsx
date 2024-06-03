import React from 'react'

//ckeditor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddCourse = () => {
  return (
    <>
      <form action="" className='mt-2'>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-5">
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Course Name <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="text"
              className="border-2 border-gray-300 p-2 w-full double_input"
              name="course_name"
              id="course_name"
              required
            />
          </div>
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Duration <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="number"
              className="border-2 border-gray-300 p-2 w-full double_input"
              name="contact"
              id="contact"
              required
            />
          </div>
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Description <span className="text-red-500">*</span>
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
              Course Image<span className="text-red-500">*</span>
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
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Course Extra Image For Body<span className="text-red-500">*</span>
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
        <div className="mb-8 w-full">
          <label className="text-xl text-gray-600">
            Detail <span className="text-red-500">*</span>
          </label>
          <br />
          <CKEditor
            editor={ClassicEditor}
            onInit={(editor) => {
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
            }}
          />
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

export default AddCourse
