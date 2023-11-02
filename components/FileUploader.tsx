import axios from 'axios';
import React, { useState } from 'react';

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  let imageUrl

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert('Please select an image file.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('/api/user/uploadUserImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((res) => {console.log(res.data);imageUrl = res.data.fileurl }).catch((err) => console.log(err));

    //   console.log('Image uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Upload Image</button>
        <p>{imageUrl}</p>
      </form>
    </div>
  );
}

export default ImageUpload;