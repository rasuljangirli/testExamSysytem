//1111111111111111111111111111

import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { MathfieldElement } from "mathlive";

function AdminAddQuestionPage() {
  const { examId } = useParams();
  const navigate = useNavigate();

  const [questionText, setQuestionText] = useState("");
  const questionFormulRef = useRef(null);
  const questionFormulValue = useRef("");

  const [options, setOptions] = useState([
    { optionText: "", optionFormulText: "", correct: false },
    { optionText: "", optionFormulText: "", correct: false },
    { optionText: "", optionFormulText: "", correct: false },
    { optionText: "", optionFormulText: "", correct: false },
  ]);
  const optionFormulRefs = useRef([]);

  // Sualın formulu üçün MathField
  useEffect(() => {
    const mf = new MathfieldElement({
      virtualKeyboardMode: "onfocus",
      virtualKeyboardTheme: "material",
      value: questionFormulValue.current,
    });
    mf.addEventListener("input", () => {
      questionFormulValue.current = mf.getValue("latex");
    });
    if (questionFormulRef.current) {
      questionFormulRef.current.innerHTML = "";
      questionFormulRef.current.appendChild(mf);
    }
  }, []);

  // Variantların formul inputları üçün MathField-ləri render edirik
  useEffect(() => {
    options.forEach((option, index) => {
      const ref = optionFormulRefs.current[index];
      if (!ref) return;

      const mf = new MathfieldElement({
        virtualKeyboardMode: "onfocus",
        virtualKeyboardTheme: "material",
        value: option.optionFormulText || "",
      });

      mf.addEventListener("input", () => {
        setOptions((prev) => {
          const updated = [...prev];
          updated[index].optionFormulText = mf.getValue("latex");
          return updated;
        });
      });

      ref.innerHTML = "";
      ref.appendChild(mf);
    });
  }, [options.length]); // yalnız komponent ilk dəfə yaradıldıqda və ya variant sayı dəyişdikdə

  const handleOptionTextChange = (index, value) => {
    const updated = [...options];
    updated[index].optionText = value;
    setOptions(updated);
  };

  const handleCheckboxChange = (index, checked) => {
    const updated = [...options];
    updated[index].correct = checked;
    setOptions(updated);
  };

  const handleSubmit = async () => {
    const payload = {
      examId: parseInt(examId),
      questionText,
      questionFormulText: questionFormulValue.current,
      options,
    };

    console.log(payload)

    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/question/create`,
        payload
      );
      navigate("/admin");
    } catch (error) {
      console.error("Xəta oldu:", error);
    }
  };

  return (
    <div className="container mt-4 page-content">
      <h3 className="mb-4">Sual əlavə et – Sınaq #{examId}</h3>

      {/* Sual mətni */}
      <div className="mb-3">
        <label className="form-label">Sual mətni</label>
        <input
          type="text"
          className="form-control"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />
      </div>

      {/* Sual formul */}
      <div className="mb-4">
        <label className="form-label">Sualın formul şəklində ifadəsi</label>
        <div ref={questionFormulRef}  className="border rounded p-2 bg-light" />
      </div>

      {/* Variantlar */}
      <h5 className="mt-4">Variantlar</h5>
      {options.map((opt, index) => (
        <div className="mb-4 border p-3 rounded bg-light" key={index}>
          <label className="form-label">Variant {index + 1} mətn:</label>
          <input
            type="text"
            className="form-control mb-2"
            value={opt.optionText}
            onChange={(e) => handleOptionTextChange(index, e.target.value)}
          />

          <label className="form-label">Formul:</label>
          <div
            ref={(el) => (optionFormulRefs.current[index] = el)}
            className="border rounded p-2 bg-white"
          />

          <div className="form-check mt-2">
            <input
              type="checkbox"
              className="form-check-input"
              checked={opt.correct}
              onChange={(e) => handleCheckboxChange(index, e.target.checked)}
              id={`correct-${index}`}
            />
            <label className="form-check-label" htmlFor={`correct-${index}`}>
              Doğru cavabdır
            </label>
          </div>
        </div>
      ))}

      <div className="d-flex gap-2" style={{marginBottom:"200px"}}>
        <button className="btn btn-success" onClick={handleSubmit}>
          Əlavə et
        </button>

        <button className="btn btn-secondary" onClick={() => navigate("/admin")}>
          Geri
        </button>
      </div>
    </div>
  );
}

export default AdminAddQuestionPage;
