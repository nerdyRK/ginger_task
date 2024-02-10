import { Link } from "react-router-dom";

const UserButton = () => {
  return (
    <>
      <button
        className="users-btn"
        style={{
          position: "absolute",
          top: "75%",
          left: "40%",
          fontSize: "2rem",
        }}
      >
        <Link to="/users">Go to users page</Link>
      </button>
    </>
  );
};
export default UserButton;
