import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import "bootstrap/dist/css/bootstrap.min.css";

const ResultPage = () => {
  const location = useLocation();
  const { examId, userToken } = location.state || {};

  const [resultData, setResultData] = useState(null);
  const [examData, setExamData] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/api/question/result/${userToken}/${examId}`
        );
        setResultData(res.data);
        console.log(res.data)
      } catch (err) {
        console.error("Netice yuklenmedi:", err);
      }
    };

    const fetchExamData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/api/exam/${examId}/questions`
        );
        setExamData(res.data);
      } catch (err) {
        console.error("Sual melumatlari yuklenmedi:", err);
      }
    };

    if (userToken && examId) {
      fetchResult();
      fetchExamData();
    }
  }, [examId, userToken]);



const getOptionStyle = (questionId, optionId) => {
  const qResult = resultData?.questionResults.find(q => q.questionId == questionId);

  // Əgər bu suala dair nəticə yoxdursa (yəni cavab verilməyibsə)
  if (!qResult) {
    const correctOptionId = examData.questions
      ?.find(q => q.id === questionId)
      ?.options.find(opt => opt.correct)?.id;

    return optionId === correctOptionId ? "btn-success" : "btn-outline-secondary";
  }

  const selectedId = qResult.selectedOptionId;
  const correctId = qResult.correctOptionId;

  if (selectedId !== correctId) {
    // Yanlış cavab verilmişsə
    if (optionId === correctId) return "btn-success"; // Doğru cavab yaşıl
    if (optionId === selectedId) return "btn-danger"; // Səhv cavab qırmızı
    return "btn-outline-secondary"; // Qalanları neytral
  }

  // Əgər düzgün cavab verilibsə
  return optionId === selectedId ? "btn-success" : "btn-outline-secondary";
};



  const mathJaxConfig = {
    tex: {
      inlineMath: [["$", "$"]],
      displayMath: [["$$", "$$"]],
    },
  };

  if (!resultData || !examData) {
    return <div className="text-center mt-5">Yüklənir...</div>;
  }

  return (
    <MathJaxContext config={mathJaxConfig}>
      <div className="container my-5">
        <div className="text-center mb-4">
          <h2 className="text-primary">{examData.examName}</h2>
          <p className="text-muted">{examData.examDescription}</p>
        </div>

        <div className="alert alert-info text-center">
          <strong>Ümumi sual sayı:</strong> {resultData.totalQuestions} |{" "}
          <strong>Düzgün:</strong> {resultData.correctAnswers} |{" "}
          <strong>Səhv:</strong> {resultData.wrongAnswers}
        </div>

        {examData.questions.map((question, index) => (
          <div key={question.id} className="card mb-4 p-4 shadow-sm">
            <h5 className="result_page_h5">
              {index + 1}.{" "}
              {question.questionText && <span>{question.questionText}</span>}
              {question.questionFormulText && (
                <MathJax dynamic>
                  <div>{ `\\(${question.questionFormulText}\\)`}</div>
                </MathJax>
              )}
            </h5>

            <div className="mt-3 result_page_option">
              {question.options.map((option) => (
                <div key={option.id} className="mb-2">
                  <span
                    className={`btn ${getOptionStyle(
                      question.id,
                      option.id
                    )} w-100 text-start`}
                  >
                    {option.optionText && <span>{option.optionText}</span>}
                    {option.optionFormulText && (
                      <MathJax inline dynamic>
                        <span className="ms-2">{`\\(${option.optionFormulText}\\)`}</span>
                      </MathJax>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </MathJaxContext>
  );
};

export default ResultPage;
