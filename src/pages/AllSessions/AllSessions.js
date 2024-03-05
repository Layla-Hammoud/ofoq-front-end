import { useState, useEffect } from "react";
import useApi from "../../hooks/useApi";
import styles from "./AllSession.module.css";
import Loader from "../../components/Loader/Loader";
import Pagination from "@mui/material/Pagination";
import { Button } from "@mui/material";
import EventCard from "../../components/EventCard/EventCard";

const AllSessions = () => {
  const [events, setEvents] = useState(null);
  const { apiCall } = useApi();
  const [loading, setLoading] = useState(false);
  const [pathLoading, setPathLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [filter, setFilter] = useState("all");
  const [paths, setPaths] = useState(null);
  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      const response = await apiCall({
        url: "event/get-all",
        method: "post",
        data: { domainId: filter, page, pageSize },
      });
      setEvents(response.data);
      setTotalItems(response.totalItems);
      setLoading(false);
    };

    fetchSessions();
  }, [filter, page, pageSize]);

  useEffect(() => {
    const fetchSessions = async () => {
      console.log(filter);
      setLoading(true);
      const response = await apiCall({
        url: "event/get-all",
        method: "post",
        data: { domainId: filter },
      });
      setEvents(response.data);
      setLoading(false);
    };
    const fetchPaths = async () => {
      setPathLoading(true);
      const response = await apiCall({ url: "domain/get-all", method: "get" });
      setPaths(response.data);
      setPathLoading(false);
    };

    fetchPaths();
    fetchSessions();
  }, []);

  return (
    <>
      <h1 className={styles.pageTitle}>Upcoming Sessions</h1>
      {loading || pathLoading ? (
        <Loader heigth={"50vw"} />
      ) : (
        <section className={styles.EventContainer}>
          <section className={styles.EventCardWrapper}>
            {events && events.length ? (
              events.map((event) => (
                <EventCard
                  key={event._id}
                  title={event.title}
                  duration={event.duration}
                  date={event.date}
                  image={event.image}
                  time={event.date}
                  firstName={event.teacherId.profileId.firstName}
                  lastName={event.teacherId.profileId.lastName}
                  eventId={event._id}
                  startTime={event.startTime}
                  endTime={event.endTime}
                />
              ))
            ) : (
              <p className={styles.noEvents}>
                No events available for the selected path.
              </p>
            )}
          </section>
          <section className={styles.filterWrapper}>
            <p className={styles.filterTitle}>Filter By Related Path:</p>
            <Button
              fullWidth
              size="large"
              sx={{
                mt: 1,
                width: "220px",
                mr: "10px",
                height: "70px",
                border: "1px solid #0B7077",
                borderRadius: "10px",
                boxShadow: "none",
                fontFamily: "Inter",
                color: filter === "all" ? "white" : "#0B7077",
                backgroundColor: filter === "all" ? "#085b61" : "white",
                "&:hover": {
                  backgroundColor: "#085b61",
                  color: "white",
                },
              }}
              type="submit"
              variant="contained"
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            {paths &&
              paths.map((path) => (
                <Button
                  key={path._id}
                  fullWidth
                  size="large"
                  sx={{
                    mt: 1,
                    width: "220px",
                    mr: "10px",
                    height: "70px",
                    border: "1px solid #0B7077",
                    borderRadius: "10px",
                    boxShadow: "none",
                    fontFamily: "Inter",
                    color: filter === path._id ? "white" : "#0B7077",
                    backgroundColor: filter === path._id ? "#085b61" : "white",
                    "&:hover": {
                      backgroundColor: "#085b61",
                      color: "white",
                    },
                  }}
                  type="submit"
                  variant="contained"
                  onClick={() => setFilter(path._id)}
                >
                  {path.name}
                </Button>
              ))}
          </section>
          <Pagination
            sx={{
              margin: "0 auto",
              marginTop: "auto",
            }}
            count={Math.ceil(totalItems / pageSize)}
            page={page}
            onChange={(event, value) => setPage(value)}
          />
        </section>
      )}
    </>
  );
};

export default AllSessions;
