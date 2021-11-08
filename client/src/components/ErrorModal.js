import * as React from 'react';
import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AuthContext from '../auth'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ErrorModal() {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  //const [open, setOpen] = React.useState(false);
  //const handleOpen = () => setOpen(true);
  //const handleClose = () => setOpen(false);
    let error = "";
    let open = false;
    if(auth.errMsg){
        open = true
        error = auth.errMsg;
    }


  function handleClose(event){
    //event.stopPropagation();
    // let newOpen = !open
    // setOpen(newOpen);
    open = false
    console.log("closing modal...")
    console.log(open)
    auth.clearErrorMessage();
    store.hideErrorModal();

  }

  return (
    <div
    className="modal"
    id="error-modal"
    >
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Alert severity="error">{error}</Alert>
          {/* <Button onClick={}>Confirm</Button> */}
        <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
}