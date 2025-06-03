import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  additionalClass?: string;
}

export const BackButton = ({ additionalClass }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button
      className={`btn btn-secondary ${additionalClass}`}
      onClick={handleBack}
    >
      {"<"} Back
    </button>
  );
};
