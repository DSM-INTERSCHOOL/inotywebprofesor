import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import "../EntregaDetail.css";
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  url: string;
  fileName: string;
  width?: number;
  height?: number;
}

const ImageContainer: React.FC<Props> = ({ url, fileName, width, height }) => {
  console.log('fileName', fileName)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const extension = url.split(".").pop();

  return (
    <div>
      <Button onClick={handleOpen}>
        <p className="selectFile">
          {fileName?.toLowerCase() || `Archivo.${extension}`}
        </p>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: 24,
          }}
        >
          <IconButton
            onClick={handleClose}
            style={{
              position: "absolute",
              cursor: "pointer",
              color: "#FFF",
              border: "thin solid #FFF",
              borderRadius: 50,
              padding: 1,
              margin: 5,
              backgroundColor: "#dddddd60",
            }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
          <img
            src={url}
            alt="img"
            style={{
              minWidth: 120,
              maxWidth: 860,
              minHeight: 60,
              maxHeight: 580,
              objectFit: "cover",
            }}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default ImageContainer;
