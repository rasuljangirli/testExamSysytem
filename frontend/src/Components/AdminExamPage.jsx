import React, { useEffect, useState } from "react";
import ExamCard from "../Components/ExamCard";
import AddExamModal from "../Components/AddExamModal";
import axios from "axios";

function AdminExamPage() {
  const [showModal, setShowModal] = useState(false);

  const [data,setData] = useState([]);

  useEffect(()=> {

    const getAllExams = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/api/exam/get-all`);
      
        if(response.data){
          setData(response.data);
        }

      } catch (error) {
        console.log("Serverde problem var")
      }
    }
    getAllExams();

  },[])



  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Sınaqlar</h2>
        <button className="btn btn-success rounded-circle" onClick={() => setShowModal(true)}>
          +
        </button>
      </div>

      <div className="row">
        {data.map((exam) => (
          <div key={exam.id} className="col-md-4 mb-3">
            <ExamCard key={exam.id} exam={exam} />
          </div>
        ))}
      </div>

      {showModal && <AddExamModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default AdminExamPage;
