import React, { useEffect, useState } from "react";
import "../style/exams.css";
import Exam from "../Components/Exam";
import axios from "axios";

function Exams() {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const getAllExams = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/api/exam/get-all`
        );
        if (response.data) {
          setDatas(response.data);
        }
      } catch (error) {
        console.error("Data yoxdur");
      }
    };
    getAllExams();
  }, []);
  return (
    <div className="exams-container page-content">
      <h2 className="exams-container-h2">Sınaqlar</h2>
      <div className="exams-container-div">
        {datas ? datas.map((data) => <Exam key={data.id} data={data} />) : null}
      </div>
    </div>
  );
}

export default Exams;
