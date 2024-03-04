import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import style from "./SingleSession.module.css";
import LoadingButton from "@mui/lab/LoadingButton";
import clockIcon from "../../assets/clock.png";
import useApi from "../../hooks/useApi";
import Loader from "../../components/Loader/Loader";
import eventDateIcon from "../../assets/date.svg";
import personIcon from "../../assets/person.png";
import moment from "moment";
import zoom from "../../assets/zoom.svg";
import google from "../../assets/google.svg";
import team from "../../assets/microsoft.svg";
import link from "../../assets/link.svg";
import Card from "../../components/Card/Card";
import axiosInstance from "../../utils/axios";
import { toast } from "react-toastify";
const SingleSession = () => {
  const { eventId } = useParams();
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [events, setEvents] = useState(null);
  const [isGoing, setIsGoing] = useState(false);
  const [goingLoading, setGoingLoading] = useState(false);
  const { loading, error, apiCall } = useApi();
  const eventDate = event && moment(event.time).format("MMMM D, YYYY");
  const pageSize = 3;
  const page = 1;
  useEffect(() => {
    const fetchSessions = async () => {
      const response = await apiCall({
        url: "event/get-all",
        method: "post",
        data: { domainId: "all", page, pageSize },
      });
      setEvents(response.data);
    };
    const fetchEvent = async () => {
      const response = await apiCall({
        url: "event/get-one",
        method: "post",
        data: { id: eventId },
      });
      setEvent(response.data);
    };
    fetchEvent();
    fetchSessions();
  }, [eventId]);

  const handleGoing = async () => {
    try {
      if (!user) {
        toast.error("please log in to going");
        return;
      }
      setGoingLoading(true);
      const updatedIsGoing = !isGoing;

      const updatedStudentId = updatedIsGoing
        ? [...event.studentId, user._id]
        : event.studentId.filter((userId) => userId !== user._id);

      const response = await axiosInstance.patch("event/add-student", {
        id: eventId,
        studentId: user._id,
      });

      // Update the local state based on the response
      setEvent((prevEvent) => ({
        ...prevEvent,
        studentId: updatedStudentId,
      }));

      setIsGoing(updatedIsGoing);
      setGoingLoading(false);
    } catch (error) {
      console.error("Error updating attendance:", error);
      setGoingLoading(false);
    }
  };

  useEffect(() => {
    if (user && event) {
      setIsGoing(event.studentId.includes(user._id));
    }
  }, [user]);

  return loading ? (
    <p>
      <Loader heigth={"50vw"} />
    </p>
  ) : (
    event && (
      <div>
        <section className={style.imageWrapper}>
          <img
            src={event.image}
            className={style.image}
            alt="session overview"
          />
        </section>
        <section className={style.textWrapper}>
          <section className={style.titleAndButtonContainer}>
            <h1 className={style.title}>{event.title}</h1>
            {!isGoing && (
              <LoadingButton
                fullWidth
                size="large"
                sx={{
                  width: "130px",
                  height: "50px",
                  borderRadius: "10px",
                  fontFamily: "Inter",
                  backgroundColor: goingLoading
                    ? isGoing
                      ? "gray" // gray when Going and loading
                      : "gray" // Gray when not Going and loading
                    : isGoing
                    ? "gray" // Blue when Going and not loading
                    : "#0B7077", // blue when not Going and not loading
                  "&:hover": {
                    backgroundColor: goingLoading
                      ? isGoing
                        ? "gray" // Dark blue when Going and loading
                        : "gray" // Gray when not Going and loading
                      : isGoing
                      ? "gray" // gray when Going and not loading (match background color)
                      : "#085b61", // blue when not Going and not loading
                  },
                  "@media(max-width:600px)": {
                    width: "120px",
                  },
                }}
                type="submit"
                variant="contained"
                loading={goingLoading}
                loadingPosition="end"
                onClick={handleGoing}
              >
                Participate
              </LoadingButton>
            )}
          </section>
          <section className={style.infoWrapper}>
            <div className={style.IconWrapper}>
              <img src={clockIcon} className={style.icon} alt="time" />{" "}
              <p>{eventDate}</p>
            </div>
            <div className={style.IconWrapper}>
              <img src={eventDateIcon} className={style.icon} alt="time" />{" "}
              <p>
                {moment(event.startTime).format("HH:mm")} -
                {moment(event.endTime).format("HH:mm")}
              </p>
            </div>
            <Link to={`/profile/${event.teacherId._id}`}>
              <div className={style.IconWrapper}>
                <img src={personIcon} className={style.icon} alt="teacher" />
                <p>
                  Posted By {event.teacherId.profileId.firstName}{" "}
                  {event.teacherId.profileId.lastName}
                </p>
              </div>
            </Link>

            {/* <div className={style.IconWrapper}>
              {event.platformType === "Zoom" && (
                <a href={event.link} target="_blank" rel="noopener noreferrer">
                  <img src={zoom} className={style.icon} alt="Zoom" />
                  Zoom Link
                </a>
              )}
              {event.platformType === "Teams" && (
                <a href={event.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={team}
                    className={style.icon}
                    alt="Microsoft Teams"
                  />
                  Microsoft Teams Link
                </a>
              )}
              {event.platformType === "Google Meet" && (
                <a href={event.link} target="_blank" rel="noopener noreferrer">
                  <img src={google} className={style.icon} alt="Google Meet" />
                  Google Meet Link
                </a>
              )}
              {event.platformType === "Other" && (
                <a href={event.link} target="_blank" rel="noopener noreferrer">
                  <img src={link} alt="Meeting" className={style.icon} />{" "}
                  Session Link
                </a>
              )}
            </div> */}
          </section>
          <p className={style.description}>{event.description}</p>
          <h3 className={style.otherEventTitle}>Other Available Sessions</h3>
          <section className={style.eventCardWrapper}>
            {events && events.length > 0
              ? events.map((event) => (
                  <Card
                    key={event._id}
                    name={event.title}
                    image={event.image}
                    description={event.description}
                    itemId={event._id}
                    type="event"
                  />
                ))
              : ""}
          </section>
        </section>
      </div>
    )
  );
};
export default SingleSession;
