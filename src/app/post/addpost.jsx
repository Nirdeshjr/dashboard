// addpost.jsx
"use client";
import { useState } from 'react';
import axios from 'axios';

export default function UploadForm() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    formData.append('caption', caption);

    try {
      const response = await axios.post('/api/upload', formData);
      console.log('Post successful:', response.data);
    } catch (error) {
      console.error('Error posting:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleImageChange} />
      <input type="text" value={caption} onChange={handleCaptionChange} placeholder="Enter caption" />
      <button type="submit">Post</button>
    </form>
  );
}
