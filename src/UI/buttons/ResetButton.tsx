interface ResetButtonProps { 
    onClickHandler: () => void;
}

export const ResetButton = ({onClickHandler}: ResetButtonProps ) => {
  return (
    <button className="btn btn-secondary" onClick={onClickHandler}>
      Reset <span className="bi bi-arrow-clockwise" />
    </button>
  );
};
