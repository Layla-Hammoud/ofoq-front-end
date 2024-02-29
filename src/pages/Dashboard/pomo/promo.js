import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import "./GridPromotion.css";
// import merchantImg from '../../Assets/Images/maker-mkr-logo.png'
// import useApi from "../../hooks/useApi";
// import PromotionModal from "./PromotionModal";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Pagination,
  Avatar,
} from "@mui/material";

// import {
//   randomCreatedDate,
//   randomTraderName,
//   randomId,
//   randomArrayItem,
// } from "@mui/x-data-grid-generator";

const initialRows = [
  {
    id: 1,
    name: "promotion1",
    code: "XSDPOa",
    detail: "Benefit now from a promotion over 20%",
    amount: 20,
    startDate: "10-12-2023",
    endDate: "10-1-2024",
    merchant: { id: 1, userName: "activeT" },
  },
  {
    id: 2,
    name: "promotion2",
    code: "XSDPOb",
    detail: "Benefit now from a promotion over 20%",
    amount: 20,
    startDate: "10-12-2023",
    endDate: "10-1-2024",
    merchant: { id: 1, userName: "activeT" },
  },
  {
    id: 3,
    name: "promotion3",
    code: "XSDPOc",
    detail: "Benefit now from a promotion over 20%",
    amount: 20,
    startDate: "10-12-2023",
    endDate: "10-1-2024",
    merchant: { id: 1, userName: "activeT" },
  },
  {
    id: 4,
    name: "promotion4",
    code: "XSDPOd",
    detail: "Benefit now from a promotion over 20%",
    amount: 20,
    startDate: "10-12-2023",
    endDate: "10-1-2024",
    merchant: { id: 1, userName: "activeT" },
  },
  {
    id: 5,
    name: "promotion5",
    code: "XSDPOe",
    detail: "Benefit now from a promotion over 20%",
    amount: 20,
    startDate: "10-12-2023",
    endDate: "10-1-2024",
    merchant: { id: 1, userName: "activeT" },
  },
  {
    id: 6,
    name: "promotion6",
    code: "XSDPOf",
    detail: "Benefit now from a promotion over 20%",
    amount: 20,
    startDate: "10-12-2023",
    endDate: "10-1-2024",
    merchant: { id: 1, userName: "activeT" },
  },
  {
    id: 7,
    name: "promotion7",
    code: "XSDPOg",
    detail: "Benefit now from a promotion over 20%",
    amount: 20,
    startDate: "10-12-2023",
    endDate: "10-1-2024",
    merchant: { id: 1, userName: "activeT" },
  },
  {
    id: 8,
    name: "promotion8",
    code: "XSDPOh",
    detail: "Benefit now from a promotion over 20%",
    amount: 20,
    startDate: "10-12-2023",
    endDate: "10-1-2024",
    merchant: { id: 1, userName: "activeT" },
  },
];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;
  const [sorting, setSorting] = React.useState("");

  const handleClick = () => {
    // const id = randomId();
    // setRows((oldRows) => [{ id,name: '', code: '', detail: '',startDate:new Date(),endDate:new Date(), amount: null, merchant:{userName:'King'}, isNew: true }, ...oldRows]);
    // setRowModesModel((oldModel) => ({
    //   ...oldModel,
    //   [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    // }));
    // console.log(id)
  };

  return (
    <GridToolbarContainer
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        width: "100%",
        alignItems: "center",
        color: "gray",
        marginBottom: "12px",
        "@media(width<900px)": {
          display: "flex",
          justifyContent: "center",
        },
        "@media(width<500px)": {
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
        },
      }}
    >
      <Button
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClick}
        sx={{ height: "40px", color: "black" }}
      >
        Add promotion
      </Button>

      <FormControl
        sx={{
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "#119c59",
            },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#119c59",
          },
        }}
      >
        <InputLabel id="promotionSorting">Get</InputLabel>
        <Select
          labelId="promotionSorting"
          id="promotionSorting"
          value={sorting}
          onChange={(event) => setSorting(event.target.value)}
          style={{
            marginLeft: "8px",
            width: "100px",
            height: "40px",
            color: "black",
          }}
        >
          <MenuItem value={"merchant"}>All</MenuItem>
          <MenuItem value={"user"}>Recent</MenuItem>
        </Select>
      </FormControl>
      <GridToolbarFilterButton sx={{ height: "40px", color: "black" }} />
    </GridToolbarContainer>
  );
}

export default function GridPromotion() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowModesModel, setRowModesModel] = useState({});
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = React.useState(false);
  const pageSize = 7; // Set the number of rows per page here
  //   const { apiCall } = useApi();
  // Calculate the total number of pages based on the page size
  const totalPages = Math.ceil(rows.length / pageSize);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  // useEffect(() => {
  //   const fetchPromotions = async () => {
  //     try {
  //       const response = await apiCall({
  //         url: "/api/promotions/read",
  //         method: "get",
  //       });
  //       console.log(response);
  //       setRows(response.Promotions)

  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setLoading(false)
  //     }

  //   };
  //   fetchPromotions();

  // }, []);

  // Calculate the start and end indices for the current page
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const visibleRows = initialRows.slice(startIndex, endIndex);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "merchant",
      headerName: "Promotion Owner",
      width: 250,
      editable: true,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar style={{ width: 35, height: 35, marginRight: 10 }}>
            {params.row.merchant.userName.charAt(0)}
          </Avatar>
          {params.row.merchant.userName}
        </div>
      ),
    },
    { field: "name", headerName: "Name", width: 225, editable: true },
    { field: "code", headerName: "Code", width: 200, editable: true },
    {
      field: "detail",
      headerName: "Description",
      width: 400,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "amount",
      headerName: "Discount %",
      headerAlign: "left",
      type: "number",
      align: "left",
      width: 150,
      editable: true,
    },
    {
      field: "startDate",
      headerAlign: "left",
      type: "Date",
      headerName: "Start Date",
      width: 200,
      editable: true,
      renderCell: (params) => (
        <div>{new Date(params.row.startDate).toISOString().split("T")[0]}</div>
      ),
    },
    {
      field: "endDate",
      headerAlign: "left",
      headerName: "End Date",
      type: "Date",
      width: 200,
      editable: true,
      renderCell: (params) => (
        <div>{new Date(params.row.endDate).toISOString().split("T")[0]}</div>
      ),
    },
    {
      field: "actions",
      headerAlign: "left",
      align: "left",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon sx={{ color: "green" }} />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon sx={{ color: "red" }} />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return loading ? (
    <div>loading.....</div>
  ) : (
    <Box
      sx={{
        display: "block",
        height: 650,
        width: "90% ",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
        marginLeft: "130px",
        marginTop: "120px",
        "@media(width<500px)": {
          marginLeft: "auto",
          marginRight: "auto",
        },
        "& .MuiDataGrid-cell": {
          border: "none",
          backgroundColor: "#FAFAFA",
          marginTop: 1,
        },
        "& .MuiDataGrid-columnHeader": {
          backgroundColor: "#119C59",
          color: "white",
          fontWeight: "Bold",
        },
      }}
    >
      <DataGrid
        className="grid"
        disableRowSelectionOnClick
        rows={initialRows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        pagination
        pageSize={pageSize}
        rowsPerPageOptions={[pageSize]}
        rowCount={rows.length}
        page={page}
        onPageChange={handlePageChange}
        sx={{ border: "none" }}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />

      <Stack spacing={2} direction="row" justifyContent="flex-end" mt={2}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          className="pagg"
        />
      </Stack>

      {/* <PromotionModal isEdit={true} open={openModal} close={handleCloseModal} /> */}
    </Box>
  );
}
