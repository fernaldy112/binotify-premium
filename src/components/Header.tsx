import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import token from "./store/token";

// TODO: add hrefs (remaining "My Music")
export default function Header() {
  const navigate = useNavigate();

  function logout() {
    token.reset();
    navigate("/login");
  }

  const buttons = token.exists() ? (
    <Button
      className="px-6 py-2 border-1 border-solid border-primary rounded-full box-border hover:bg-primary hover:text-graybg"
      text="Logout"
      onClick={logout}
    />
  ) : (
    <>
      <Link to="/register">
        <Button
          className="px-6 py-2 border-1 border-solid border-primary rounded-full box-border hover:bg-primary hover:text-graybg"
          text="Register"
        />
      </Link>
      <Link to="/login">
        <Button
          className="px-6 py-2 border-1 border-solid border-primary rounded-full box-border hover:bg-primary hover:text-graybg"
          text="Login"
        />
      </Link>
    </>
  );

  return (
    <header className="z-30 bg-graybg fixed top-0 border-b-1 border-solid border-primary w-full box-border flex justify-between items-center px-8 py-4 text-white">
      <nav className="flex gap-8">
        <Link to="/request/1">Requests</Link>
        <Link to="">My Music</Link>
      </nav>
      <div className="flex gap-4">{buttons}</div>
    </header>
  );
}
