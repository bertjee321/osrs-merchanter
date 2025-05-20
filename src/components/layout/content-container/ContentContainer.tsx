import { Outlet } from "react-router-dom";

export const ContentContainer = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
