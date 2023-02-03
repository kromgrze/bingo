import React, {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import randomColor from 'randomcolor'

import trackerApi from "../../api/tracker";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';


const DrawerComponent = ({ toggleDrawer, anchor, drawerState: state }) => {
    const getScores = async () => {
        try {
            const response = await trackerApi.get('/api/scores')
            const usersArray = []

            response.data.forEach(data => {
                usersArray.push({
                    points: data.points,
                    username: data._player.name
                })
            })
            setUsers(usersArray)
        } catch (e) {
            console.log('Error', e)
        }
    }
    const setAvatarName = (name) => {
        const item = name.split(' ')

        if (item.length === 1) {
            return item[0].split('').splice(0,2).join('');
        } else {
            return item[0].split('').splice(0,1).join('') + item[1].split('').splice(0,1).join('');
        }
    }

    const [users, setUsers] = useState(null)
    const [fields, setFields] = useState(null)

    const [field, setField] = useState('')
    const [error, setError] = useState(false)

    const addField = async () => {
        if (field.trim().length) {
            try {
                let player = localStorage.getItem("player");
                player = JSON.parse(player);

                const response = await trackerApi.post('/api/fields', {
                    text: field.trim(),
                    userId: player.userId
                });
                // console.log('response1', response)

                setError(false)

                if (response.status === 201) {
                    // refresh list
                    setField('')
                    getFields()
                }
            } catch (e) {
                console.log('Error', e)
            }
        } else {
            setError(true)
        }
    }

    const getFields = async () => {
        try {
            let player = localStorage.getItem("player");
            player = JSON.parse(player);

            const response = await trackerApi.get(`/api/fields/${player.userId}`);
            // console.log('response2', response)

            if (response.status === 200) {
                // setFields
                const newFields = []

                response.data.forEach(item => {
                    newFields.push({
                        _id: item._id,
                        text: item.text
                    })
                })
                setFields(newFields)
                // console.log('RE??', fields)
            }
        } catch (e) {
            console.log('Error', e)
        }
    }

    const removeField = async (id) => {
        try {
            const response = await trackerApi.delete(`/api/fields/${ id }`);

            if (response.status === 200) {
                getFields();
            }
        } catch (e) {
            console.log('Error', e)
        }
    }

    useEffect(() => {
        if (state.left) {
            getScores();
        } else if (state.right) {
            getFields();
        }
    }, [state])

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            // onClick={toggleDrawer(anchor, false)}
            // onKeyDown={toggleDrawer(anchor, false)}
        >
            {anchor === 'left' && (
                <>
                    <Typography
                        style={{ marginLeft: 20 }}
                        sx={{ mt: 4, mb: 2 }}
                        variant="h6"
                        component="div"
                    >
                        Highscores
                    </Typography>
                    <List dense={false}>
                        {users && (
                            users.map(user => {
                             return (
                                <ListItem key={user.username}>
                                    <ListItemAvatar>
                                        <Avatar sx={{bgcolor: randomColor()}}>{setAvatarName(user.username)}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={user.username}
                                        secondary={user.points}
                                    />
                                </ListItem>
                             )
                            })
                        )}
                    </List>
                </>
            )}

            {anchor === 'right' && (
                <>
                    <Typography
                        style={{ marginLeft: 20 }}
                        sx={{ mt: 4, mb: 2 }}
                        variant="h6"
                        component="div"
                    >
                        Your fields
                    </Typography>
                    <div style={{ margin: 20 }}>
                        <TextField
                            autoFocus
                            value={field}
                            onChange={(e) => setField(e.target.value)}
                            error={error}
                            helperText={error && field === "" ? 'Empty field!' : ' '}
                            margin="dense"
                            id="field"
                            label="Field"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <Button onClick={addField}>Add Field</Button>
                    </div>
                    <List dense={false}>
                        {fields && (
                            fields.map((field, index) => {
                                return (
                                    <ListItem key={index}
                                      secondaryAction={
                                          <IconButton
                                              edge="end"
                                              aria-label="delete"
                                              onClick={() => removeField(field._id)}
                                          >
                                              <DeleteIcon />
                                          </IconButton>
                                      }
                                    >
                                        <ListItemText
                                            primary={field.text}
                                        />
                                    </ListItem>
                                )
                            })
                        )}
                    </List>
                </>
            )}
        </Box>
    );

    return (
        <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
        >
            {list(anchor)}
        </Drawer>
    );
}
export default DrawerComponent;
