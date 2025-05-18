interface ResetButtonProps {
  buttonText?: string;
  onClick?: () => void;
}

export const ResetButton = ({ buttonText, onClick }: ResetButtonProps) => {
  return (
    <button className="btn btn-outline-secondary" onClick={onClick}>
      {buttonText ?? ""} <span className="bi bi-arrow-clockwise" />
    </button>
  );
};
