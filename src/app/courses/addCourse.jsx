import React, { useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

const AddCourse = ({ handleTogglePage, rows }) => {
  const [formData, setFormData] = useState({
    id: rows?.id || "",
    course_name: rows?.course_name || "",
    description: rows?.description || "",
    duration: rows?.duration || "",
    course_image: null,
    course_extra: null,
    detail: rows?.detail || "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const submitCourse = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("course_name", formData.course_name);
    formDataToSend.append("duration", formData.duration);
    formDataToSend.append("description", formData.description);
    if (formData.course_image) {
      formDataToSend.append("course_image", formData.course_image);
    }
    if (formData.course_extra) {
      formDataToSend.append("course_extra", formData.course_extra);
    }
    formDataToSend.append("detail", formData.detail);

    try {
      let response;
      if (rows) {
        response = await axios.put(
          `https://backend-4c5c.onrender.com/api/course/${formData.id}/`,
          formDataToSend
        );
      } else {
        response = await axios.post(
          "https://backend-4c5c.onrender.com/api/course/",
          formDataToSend
        );
      }

      toast("Submitted Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      handleTogglePage();
      setFormData({
        id: "",
        course_name: "",
        description: "",
        duration: "",
        course_image: null,
        course_extra: null,
        detail: "",
      });
    } catch (error) {
      toast.error("Submission Failed!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        className="flex justify-start cursor-pointer"
        onClick={handleTogglePage}
      >
        <ArrowBackIcon className="mr-2" />
        <h2 className="font-bold mb-4">Go Back</h2>
      </div>
      <form onSubmit={submitCourse}>
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
              value={formData.course_name}
              onChange={handleChange}
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
              name="duration"
              id="duration"
              value={formData.duration}
              onChange={handleChange}
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
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Course Image <span className="text-red-500">*</span>
            </label>
            <br />
            <input
              type="file"
              className="border-2 border-gray-300 p-2 w-full double_input"
              name="course_image"
              id="course_image"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 mr-5">
            <label className="text-xl text-gray-600">
              Course Extra Image For Body
            </label>
            <br />
            <input
              type="file"
              className="border-2 border-gray-300 p-2 w-full double_input"
              name="course_extra"
              id="course_extra"
              onChange={handleChange}
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
            data={formData.detail}
            onInit={(editor) => {}}
            onChange={(event, editor) => {
              const data = editor.getData();
              setFormData({ ...formData, detail: data });
            }}
          />
        </div>
        <div className="flex justify-end p-1">
          <button className="p-3 bg-blue-500 text-white hover:bg-blue-400">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default AddCourse;
