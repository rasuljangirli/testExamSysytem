import axios from "axios";
import React, { useState } from "react";

function AddExamModal({ onClose }) {
  const [examName, setExamName] = useState("");
  const [examDescription, setExamDescription] = useState("");
  const [examTime, setExamTime] = useState("");

  const handleSubmit = async () => {
   try {
     const response = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/api/exam/create`,
      {
        examName,
        examDescription,
        examTime,
      }
    );


    console.log(response.data)
    
   } catch (error) {
    console.log(error)
   }

    onClose();
  };

  return (
    <div
      className="modal d-block page-content"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Yeni Sınaq Əlavə Et</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Sınaq adı"
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
            />
            <textarea
              className="form-control mb-2"
              placeholder="Açıqlama"
              value={examDescription}
              onChange={(e) => setExamDescription(e.target.value)}
            />
            <input
              type="number"
              className="form-control mb-2"
              placeholder="Vaxt (dəqiqə)"
              value={examTime}
              onChange={(e) => setExamTime(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Ləğv et
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Əlavə et
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddExamModal;
