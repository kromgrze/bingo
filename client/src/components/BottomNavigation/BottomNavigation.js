import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import RestartAlt from '@mui/icons-material/RestartAlt';

const BottomNavigationComponent = ({ drawerState, toggleDrawer, setIsLoggedIn, setReset }) => {
    const [value, setValue] = React.useState(null);

    useEffect(() => {
        if (drawerState.left) {
            setValue(0);
        } else if (drawerState.right) {
            setValue(1)
        } else {
            setValue(null)
        }
    }, [drawerState])

    return (
        <Box sx={{ width: 310 }}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    if (newValue < 2) {
                        toggleDrawer(newValue === 0 ? "left" : 'right', true)(event)
                    } else if (newValue === 2) {
                        setReset(true);
                    } else {
                        // logout
                        setValue(newValue);
                        localStorage.removeItem("player");
                        setIsLoggedIn(false);
                    }
                }}
            >
                <BottomNavigationAction label="Highscores" icon={<FormatListNumberedIcon />} />
                <BottomNavigationAction label="Add Field" icon={<AddCircleIcon />} />
                <BottomNavigationAction label="Reset" icon={<RestartAlt />} />
                <BottomNavigationAction label="Logout" icon={<LogoutIcon />} />
            </BottomNavigation>
        </Box>
    );
}

export default BottomNavigationComponent
