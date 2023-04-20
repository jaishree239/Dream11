import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/system";

interface IModalProps {
  openModal: boolean;
  handleDeleteModalClose: Function;
  onDelete:Function
}

const DeleteModal: React.FC<IModalProps> = (props: IModalProps) => {
  return (
    <div>
      <Modal
        open={props.openModal}
        onClose={() => props.handleDeleteModalClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
                  }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete ?
          </Typography>
          <Stack direction="row" spacing={2} style={{ float: "right" }}>
            <Button variant="contained" color="error" onClick={() => props.onDelete()}>
              Yes
            </Button>
            <Button
              variant="contained"
              onClick={() => props.handleDeleteModalClose()}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};
export default DeleteModal;
