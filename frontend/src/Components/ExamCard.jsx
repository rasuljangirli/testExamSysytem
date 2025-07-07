import React from "react";
import { useNavigate } from "react-router-dom";

function ExamCard({ exam }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/admin/exams/${exam.id}/add-question`);
  };

  return (
    <div className="card h-100" onClick={handleClick} style={{ cursor: "pointer" }}>
      <div className="card-body">
        <h5 className="card-title">{exam.examName}</h5>
        <p className="card-text">{exam.examDescription}</p>
        <p className="card-text">Vaxt: {exam.examTime} dəqiqə</p>
      </div>
    </div>
  );
}

export default ExamCard;
