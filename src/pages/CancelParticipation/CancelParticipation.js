import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios";

const CancelParticipation = () => {
  const params = new URLSearchParams(useLocation().search);
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    const callApi = async () => {
      await axiosInstance.patch("event/remove-student", {
        id: params.get("eventId"),
        studentId: params.get("studentId"),
      });
    };

    if (status === "pending") {
      try {
        callApi();
        setStatus("success");
      } catch (error) {
        setStatus("error");
      }
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {status === "success" ? (
        <h1>Participation canceled successfully</h1>
      ) : status === "error" ? (
        <h1>Failed to cancel participation</h1>
      ) : (
        <h1>Canceling participation...</h1>
      )}
    </div>
  );
};

export default CancelParticipation;
