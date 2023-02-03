import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import trackerApi from '../../api/tracker'

const LoginDialogComponent = ({ open, setDialog }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [alreadyExists, setAlreadyExists] = useState(false)
    const [name, setName] = useState('')
    const [userId, setUserId] = useState(null)
    const [error, setError] = useState(false)

    const login = async () => {
        setIsLoading(true)

        if (name.trim().length) {
            try {
                const response = await trackerApi.post('/api/players', {name: name.trim() });

                setIsLoading(false)
                setError(false)
                setUserId(response.data._id)

                if (response.status === 200) {
                    setAlreadyExists(true)
                } else {
                    success(response.data);
                }
            } catch (e) {
              setIsLoading(false);
            }
        } else {
            setIsLoading(false)
            setError(true)
        }
    }

    const success = ({ name, _id: userId}) => {
        const player = {
            name,
            userId
        }

        localStorage.setItem("player", JSON.stringify(player));
        setDialog(true)
    }

    const createANewOne = () => {
        setName('')
        setAlreadyExists(false)
        setError(false)
    }

    return (
        <Dialog open={open}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                {!alreadyExists && (
                    <>
                        <DialogContentText>
                            Please enter your username:
                        </DialogContentText>
                        <TextField
                            autoFocus
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            error={error}
                            helperText={error && name === "" ? 'Empty field!' : ' '}
                            margin="dense"
                            id="username"
                            label="Username"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </>
                )}
                {alreadyExists && (
                    <>
                        <DialogContentText>
                            This username already exists.
                            <br/>
                            Would you like to continue or create a new one
                        </DialogContentText>
                    </>
                )}
            </DialogContent>
            <DialogActions>
                {!alreadyExists && !isLoading && (
                    <Button onClick={login}>Login</Button>
                )}
                {alreadyExists && (
                    <>
                        <Button onClick={createANewOne}>Create a new one</Button>
                        <Button onClick={() => success({ name, _id: userId })}>Continue</Button>
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
}
export default LoginDialogComponent;
