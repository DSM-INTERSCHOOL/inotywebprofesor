import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import ReactPlayer from "react-player";
import "../EntregaDetail.css";

interface Props {
  url: string;
  fileName: string;
  width?: number;
  height?: number;
}

const VideoContainer: React.FC<Props> = ({ url, fileName, width, height }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const extension = url.split(".").pop();

  return (
    <div>
      <Button onClick={handleOpen}>
        <p className="selectFile">
          {fileName.toLowerCase() || `Archivo.${extension}`}
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
          <ReactPlayer
            style={{ overflow: "hidden", backgroundColor: 'black' }}
            url={url}
            controls={true}
            loop={false}
            volume={1}
            width={920}
            height={480}
            
          />
        </Box>
      </Modal>
    </div>
  );
};

export default VideoContainer;
