import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit, Preview } from "@mui/icons-material";
import { Link } from "react-router-dom";
import useApi from "../../../hooks/useApi";
import { toast } from "react-toastify";
import SessionModel from "../../../components/SessionModule/SessionModal";
const RoomsActions = ({
  params,
  setSuccessDelete,
  setSelectedRow,
  setOpen,
  // open,
  type,
}) => {
  const { apiCall } = useApi();
  const handleDeleteSession = async () => {
    try {
      const response = await apiCall({
        url: "event/delete",
        method: "post",
        data: { id: params.row._id },
      });
      if (response.success) {
        setSuccessDelete(true);
        toast.success("The session is deleted succesfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const hendelEdit = async () => {
    setSelectedRow(params.row);
    setOpen(true);
  };

  return (
    <Box>
      <Tooltip title="View room details">
        <Link to={`/session/${params.row._id}`}>
          <IconButton>
            <Preview />
          </IconButton>
        </Link>
      </Tooltip>
      <Tooltip title="Edit this room">
        <IconButton
          onClick={() => {
            hendelEdit();
          }}
        >
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete this room">
        <IconButton onClick={() => handleDeleteSession()}>
          <Delete />
        </IconButton>
      </Tooltip>
      {/* {params.row._id && (
        <SessionModel
          setSuccessEdit={setSuccessEdit}
          setOpen={setOpen}
          open={open}
          type={type}
          rowData={params.row}
        />
      )} */}
    </Box>
  );
};

export default RoomsActions;
