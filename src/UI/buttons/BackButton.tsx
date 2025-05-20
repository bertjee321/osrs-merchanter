import { useNavigate } from "react-router-dom";

export const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button className="btn btn-secondary" onClick={handleBack}>
      {"<"} Back
    </button>
  );
};
