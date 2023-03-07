import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ErrorRedirection() {
  const { error } = useParams();
  console.log(error);
  const navigate = useNavigate();

  useEffect(() => {
    if (error === "ERR_NETWORK") {
      navigate("/500");
    }
  }, [navigate, error]);

  return <div></div>;
}
