import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateQuotePage.css";

const CreateQuotePage = () => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [mediaUrl, setMediaUrl] = useState<string>("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "https://crafto.app/crafto/v1.0/media/assignment/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      setMediaUrl((prev) => data[0].url);
    } catch (err) {
      console.error("Error uploading file", err);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!mediaUrl) return;

    try {
      const text = textRef.current?.value;
      const response = await fetch(
        "https://assignment.stage.crafto.app/postQuote",
        {
          method: "POST",
          headers: {
            Authorization: token || "",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text,
            mediaUrl,
          }),
        }
      );

      if (response.ok) {
        navigate("/quotes");
      }
    } catch (err) {
      console.error("Error submitting quote", err);
    }
  };

  const handleCancelBtn = () => {
    navigate("/quotes");
  };
  return (
    <div className="create-quote-page">
      <h2>Create a Quote</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Quote Text</label>
          <textarea ref={textRef} required></textarea>
        </div>
        <div className="form-group">
          <label>Upload Image</label>
          <input type="file" onChange={handleFileChange} required />
          <button type="button" onClick={handleUpload}>
            Upload
          </button>
        </div>
        {mediaUrl && <p>Image uploaded successfully!</p>}
        <div className="action-buttons">
          <button className="create-button" type="submit" disabled={!mediaUrl}>
            Create Quote
          </button>
          <button
            className="cancel-button"
            type="button"
            onClick={handleCancelBtn}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuotePage;
