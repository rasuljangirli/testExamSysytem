import React, { useState } from "react";
import MathInput from "./MathInput";

function QuestionModal({ onClose }) {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState([
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ]);

  const handleOptionChange = (index, field, value) => {
    const updated = [...options];
    updated[index][field] = value;
    setOptions(updated);
  };

  const handleSubmit = () => {
    console.log("Sual göndərildi:", {
      questionText,
      options,
    });

    onClose();
  };

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content p-3">
          <div className="modal-header">
            <h5 className="modal-title">Sual Əlavə Et</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <label className="form-label">Sualın mətni:</label>
            <MathInput value={questionText} onChange={setQuestionText} />

            <hr />

            <h6>Variantlar:</h6>
            {options.map((opt, index) => (
              <div key={index} className="mb-3">
                <label className="form-label">Variant {index + 1}</label>
                <MathInput
                  value={opt.text}
                  onChange={(val) => handleOptionChange(index, "text", val)}
                />
                <div className="form-check mt-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={opt.isCorrect}
                    onChange={(e) =>
                      handleOptionChange(index, "isCorrect", e.target.checked)
                    }
                    id={`correct-${index}`}
                  />
                  <label className="form-check-label" htmlFor={`correct-${index}`}>
                    Doğru cavabdır
                  </label>
                </div>
              </div>
            ))}
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

export default QuestionModal;
