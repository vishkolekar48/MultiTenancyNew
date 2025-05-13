import axios from "axios";
import React from "react";
import { useState } from "react";

function FileUpload() {
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    console.log("File Upload", file);
    axios
      .post("http://localhost:3000/api/upload", formData)
      .then((res) => {})
      .catch((err) => {
        alert("Upload failed");
        console.log(err);
      });
  };
  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default FileUpload;
