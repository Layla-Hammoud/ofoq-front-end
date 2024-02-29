import { useEffect, useContext, useMemo, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { AuthContext } from "../../../Context/AuthContext";
import Loader from "../../../components/Loader/Loader";

import useApi from "../../../hooks/useApi";
import moment from "moment";
import { grey } from "@mui/material/colors";
import UsersActions from "./SessionsActions";
const Sessions = () => {
  //   const {
  //     state: { users },
  //     dispatch,
  //   } = useValue();
  const { user } = useContext(AuthContext);
  const { loading, error, apiCall } = useApi();
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
    }
  }, [user]);
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);

  const columns = useMemo(
    () => [
      {
        field: "image",
        headerName: "Image",
        width: 60,
        renderCell: (params) => <Avatar src={params.row.image} />,
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
        type: "singleSelect",
        valueOptions: ["Zoom", "Teams", "Google Meet", "Other"],
        editable: true,
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
        headerName: "Last Time",
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
      { field: "_id", headerName: "Id", width: 150 },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        renderCell: (params) => (
          <UsersActions {...{ params, rowId, setRowId }} />
        ),
      },
    ],
    [rowId]
  );

  return (
    <Box
      sx={{
        height: 500,
        width: "70%",
        margin: "160px auto",
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: "center", mt: 3, mb: 3 }}
      >
        Manage Users
      </Typography>

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
            onCellEditCommit={(params) => setRowId(params.id)}
          />
        )
      )}
    </Box>
  );
};

export default Sessions;
