import { Link } from "react-router-dom";
import Button from "./Button";

// TODO: add hrefs
// TODO: conditional render based on auth
export default function Header() {
  return (
    <header className="fixed top-0 border-b-1 border-solid border-primary w-full box-border flex justify-between items-center px-8 py-4 text-white">
      <nav className="flex gap-8">
        <Link to="/request/1">Requests</Link>
        <Link to="">My Music</Link>
      </nav>
      <div className="flex gap-4">
        <Link to="">
          <Button
            className="px-6 py-2 border-1 border-solid border-primary rounded-full box-border hover:bg-primary hover:text-graybg"
            text="Register"
          />
        </Link>
        <Link to="">
          <Button
            className="px-6 py-2 border-1 border-solid border-primary rounded-full box-border hover:bg-primary hover:text-graybg"
            text="Login"
          />
        </Link>
      </div>
    </header>
  );
}
