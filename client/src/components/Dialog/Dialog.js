import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DialogComponent = ({ open, setDialog, win, setReset }) => {
    const handleClose = () => {
        setDialog(false);
    };
    const handleCloseAndReset = () => {
        setDialog(false);
        setReset(true)
    };

    return (
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>You won!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You have completed {win} lines!
                        <br/>
                        You get {win === 1 ? 50 : (win + 1) * 50} points for this!
                        <br/>
                        <br/>
                        Do you want to continue with this board or create a new one?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Continue</Button>
                    <Button onClick={handleCloseAndReset}>New empty Board</Button>
                </DialogActions>
            </Dialog>
    );
}
export default DialogComponent;
