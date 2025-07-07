import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../style/examDetails.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { MathJaxContext, MathJax } from "better-react-mathjax";

const isValidString = (str) => typeof str === "string" && str.trim() !== "";

const ExamDetails = () => {
  const { examId } = useParams();
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/api/exam/${examId}/questions`
        );
        setExamData(response.data);
        setAnswers(
          response.data.questions.map((q) => ({
            questionId: q.id,
            selectedOptionId: "",
          }))
        );
        setTimeLeft(response.data.examTime * 60);
      } catch (err) {
        setError("İmtahan məlumatları yüklənərkən xəta baş verdi.");
        console.error("API xətası:", err);
      } finally {
        setLoading(false);
      }
    };

    if (examId) {
      fetchExamData();
    } else {
      setLoading(false);
      setError("İmtahan ID-si tapılmadı.");
    }
  }, [examId]);

  useEffect(() => {
    if (timeLeft <= 0 && examData) {
      console.log("İmtahan vaxtı bitdi!");
      handleSubmitExam();
      return;
    }
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, examData]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleOptionChange = (questionId, optionId) => {
    setAnswers((prevAnswers) =>
      prevAnswers.map((answer) =>
        answer.questionId === questionId
          ? { ...answer, selectedOptionId: optionId }
          : answer
      )
    );
  };

  const handleSubmitExam = async () => {
    const userToken = localStorage.getItem("userToken") || "defaultUserToken";
    const submissionData = {
      examId: parseInt(examId),
      userToken: userToken,
      answers: answers.filter((answer) => answer.selectedOptionId !== ""),
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/question/evaluate`,
        submissionData
      );

      navigate("/result", {
        state: {
          examId: examId,
          userToken: localStorage.getItem("userToken"),
        },
      });
      
    } catch (error) {
      console.log("Error oldu", error);
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Yüklənir...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!examData) {
    return (
      <div className="alert alert-info">İmtahan məlumatları mövcud deyil.</div>
    );
  }

  const mathJaxConfig = {
    tex: {
      inlineMath: [
        ["$", "$"],
        ["\\(", "\\)"],
      ],
      displayMath: [
        ["$$", "$$"],
        ["\\[", "\\]"],
      ],
    },
  };

  return (
    <MathJaxContext config={mathJaxConfig} version={3}>
      <div className="container mt-4 page-content">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>{examData.examName}</h2>
          <div
            className="card p-2 text-center bg-light rounded-pill shadow-sm"
            style={{
              position: "fixed",
              top: "40px",
              right: "20px",
              zIndex: 1000,
            }}
          >
            <h5 className="mb-0 text-dark">{formatTime(timeLeft)}</h5>
          </div>
        </div>
        <p className="lead text-muted">{examData.examDescription}</p>
        <hr className="my-4" />

        <div className="questions-list">
          {examData.questions.map((question, qIndex) => (
            <div
              key={question.id}
              className="card mb-4 p-4 shadow-lg border-primary rounded-3"
            >
              <h5 className="mb-3 text-primary h5">
                {qIndex + 1}.{" "}
                {isValidString(question.questionText) && (
                  <span className="me-2">{question.questionText}</span>
                )}
                {isValidString(question.questionFormulText) && (
                  <MathJax dynamic>
                    <div>{`\\(${question.questionFormulText}\\)`}</div>
                  </MathJax>
                )}
              </h5>
              <div className="options mt-3">
                {question.options.map((option) => (
                  <div
                    key={`${question.id}-${option.id}`}
                    className="optionDF form-check mb-2"
                  >
                    <input
                      className="form-check-input"
                      type="radio"
                      name={`question-${question.id}`}
                      id={`option-${option.id}`}
                      value={option.id}
                      checked={
                        answers.find((ans) => ans.questionId === question.id)
                          ?.selectedOptionId === option.id
                      }
                      onChange={() =>
                        handleOptionChange(question.id, option.id)
                      }
                    />
                    <label
                      className="form-check-label d-flex align-items-center"
                      htmlFor={`option-${option.id}`}
                    >
                      {isValidString(option.optionText) && (
                        <span className="me-2">{option.optionText}</span>
                      )}
                      {isValidString(option.optionFormulText) && (
                        <MathJax inline dynamic>
                          <span>{ `\\(${option.optionFormulText}\\)`}</span>
                        </MathJax>
                      )}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5 mb-5">
          <button
            className="btn btn-primary btn-lg px-5 py-3 rounded-pill shadow-lg"
            onClick={handleSubmitExam}
          >
            Cavabları Göndər
          </button>
        </div>
      </div>
    </MathJaxContext>
  );
};

export default ExamDetails;
