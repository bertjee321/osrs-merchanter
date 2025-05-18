interface SubmitButtonProps {
  buttonText?: string;
  onClick?: () => void;
}

export const SubmitButton = ({ buttonText, onClick }: SubmitButtonProps) => {
  return (
    <button type="submit" className="btn btn-outline-primary" onClick={onClick}>
      {buttonText ?? ""}
      <span className="bi bi-search" />
    </button>
  );
};
