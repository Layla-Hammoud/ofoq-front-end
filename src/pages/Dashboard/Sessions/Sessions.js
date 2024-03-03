import { useEffect, useContext, useMemo, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { AuthContext } from "../../../Context/AuthContext";
import Loader from "../../../components/Loader/Loader";
import useApi from "../../../hooks/useApi";
import SessionModel from "../../../components/SessionModule/SessionModal";
import moment from "moment";
import SessionsActions from "./SessionsActions";
import "./session.css";
const Sessions = () => {
  const { user } = useContext(AuthContext);
  const { loading, error, apiCall } = useApi();
  const [open, setOpen] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [sessions, setSessions] = useState(null);
  useEffect(() => {
    const fetchSessions = async () => {
      const response = await apiCall({
        url: "event/getByTeacher",
        method: "post",
        data: { id: user._id },
      });
      setSessions(response.data);
    };
    if (user) {
      fetchSessions();
      setSuccessDelete(false);
    }
  }, [user]);
  useEffect(() => {
    const fetchSessions = async () => {
      const response = await apiCall({
        url: "event/getByTeacher",
        method: "post",
        data: { id: user._id },
      });
      setSessions(response.data);
    };
    if (user && successDelete) {
      fetchSessions();
      setSuccessDelete(false);
    }
  }, [successDelete]);
  const [pageSize, setPageSize] = useState(5);

  const handleOpen = () => setOpen(true);

  const columns = useMemo(
    () => [
      {
        field: "image",
        headerName: "Image",
        width: 60,
        renderCell: (params) => (
          <Avatar src={params.row.image} variant="rounded" />
        ),
        sortable: false,
        filterable: false,
      },
      { field: "title", headerName: "Title", width: 170, height: 200 },
      {
        field: "description",
        headerName: "Description",
        width: 300,
        wrap: true,
      },
      { field: "duration", headerName: "Duration", width: 100 },
      {
        field: "platformType",
        headerName: "Platform Type",
        width: 120,
      },
      {
        field: "date",
        headerName: "Date",
        width: 200,
        renderCell: (params) =>
          moment(params.row.date).format("YYYY-MM-DD HH:MM:SS"),
      },
      {
        field: "startTime",
        headerName: "Start Time",
        width: 200,
        renderCell: (params) =>
          moment(params.row.startTime).format("YYYY-MM-DD HH:MM:SS"),
      },

      {
        field: "lastTime",
        headerName: "End Time",
        width: 200,
        renderCell: (params) =>
          moment(params.row.lastTime).format("YYYY-MM-DD HH:MM:SS"),
      },
      {
        field: "createdAt",
        headerName: "Created At",
        width: 200,
        renderCell: (params) =>
          moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        width: 200,
        renderCell: (params) => (
          <SessionsActions
            setSuccessDelete={setSuccessDelete}
            {...{ params }}
          />
        ),
      },
    ],
    []
  );

  return (
    <Box
      sx={{
        height: 500,
        width: "70%",
        margin: "160px auto",
      }}
    >
      <Typography variant="h3" component="h3" sx={{ mt: 3, mb: 3 }}>
        Manage Your Sessions
      </Typography>
      <Button
        size="large"
        sx={{
          mb: 3,
          height: "50px",
          borderRadius: "10px",
          fontFamily: "Inter",
          backgroundColor: "#0B7077",
          width: "150px",
          "&:hover": {
            backgroundColor: "#085b61",
          },
        }}
        onClick={handleOpen}
        variant="contained"
      >
        Add Session
      </Button>
      {loading ? (
        <Loader height="50vh" />
      ) : (
        sessions && (
          <DataGrid
            columns={columns}
            rows={sessions}
            getRowId={(row) => row._id}
            rowsPerPageOptions={[5, 10, 20]}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            getRowSpacing={(params) => ({
              top: params.isFirstVisible ? 0 : 5,
              bottom: params.isLastVisible ? 0 : 5,
            })}
          />
        )
      )}
      <SessionModel setOpen={setOpen} open={open} />
    </Box>
  );
};

export default Sessions;
