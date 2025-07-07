import "../style/exam.css";
import { useNavigate } from "react-router-dom";

function Exam({ data }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/exam/${data.id}`);
  };

  return (
 <div className="card shadow-lg rounded-4 mb-4" style={{ width: '100%', maxWidth: '270px', height: '300px' }}>
  <div className="card-body d-flex flex-column p-4">
    {/* Məzmun hissəsi: Mətn çox olsa, daxili olaraq skroll olacaq */}
    <div style={{ overflowY: 'auto', flexGrow: 1, marginBottom: '1rem' }}>
      <h5 className="card-title text-primary mb-2">{data.examName}</h5>
      <p className="card-text text-secondary fw-semibold">{data.examDescription}</p>
      <p className="card-text text-muted">
        <strong>Sınaq müddəti: </strong> {data.examTime} dəqiqə
      </p>
    </div>

    {/* Düymə hissəsi: Həmişə kartın dibində qalacaq */}
    <div className="mt-auto">
      <button className="btn btn-primary w-100 py-2" onClick={handleClick}>
        İmtahanda İştirak Et
      </button>
    </div>
  </div>
</div>

  );
}

export default Exam;

