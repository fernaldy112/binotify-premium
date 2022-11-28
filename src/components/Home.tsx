import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import token from "./store/token";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(token.exists() ? "/music" : "/login");
  });

  return <></>;
}
