import React, { useState } from "react";

function UploadFile() {
  const [file, setFile] = useState(null);
  const [status, updateStatus] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("http://127.0.0.1:8000/upload/file/", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      console.log("File uploaded successfully.");
      updateStatus(true)
    } else {
      console.error("Error uploading file.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
      {status ? <span>Uploaded</span> : null }
    </form>
  );
}

export default UploadFile;




