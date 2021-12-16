// @Author: Rashmi Chandy 
// Feature: View Job Posting Detail
import {React,useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export default function JobDetailsPopup({openDetailsDialog,duties,setOpenDetailsDialog}) {
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


  const handleClose = () => {
    setOpenDetailsDialog(false);
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={openDetailsDialog}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Job Duties"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {duties}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
