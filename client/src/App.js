import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti'

import BottomNavigationComponent from "./components/BottomNavigation/BottomNavigation";
import LoginDialogComponent from "./components/LoginDialog/LoginDialog";
import DrawerComponent from "./components/Drawer/Drawer";
import useWindowDimensions from "./hooks/useWindowDimensions";
import Bingo from "./pages/Bingo";
import './App.css';

function App() {
    const [isExploding, setIsExploding] = useState(false);
    const [drawerState, setDrawerState] = useState({
        left: false,
        right: false,
    });
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const [name, setName] = useState(null);
    const [reset, setReset] = useState(false);

    const { width, height } = useWindowDimensions()

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setDrawerState({ ...drawerState, [anchor]: open });
    };

    useEffect(() => {
        // Check if user is logged in
        let player = localStorage.getItem("player");
        player = JSON.parse(player);

        if (player && player.name) {
            setName(player.name)
        } else {
            setIsLoggedIn(false);
        }
    }, [isLoggedIn])

    return (
        <div className="App">
            {isLoggedIn && (
                <>
                    <div className="bingo-container">
                        <Bingo setIsExploding={setIsExploding} reset={reset} setReset={setReset} />
                    </div>


                    <DrawerComponent toggleDrawer={toggleDrawer} anchor='left' drawerState={drawerState} />
                    <DrawerComponent toggleDrawer={toggleDrawer} anchor='right' drawerState={drawerState} />

                    <div className="nav-container">
                        <BottomNavigationComponent drawerState={drawerState} toggleDrawer={toggleDrawer} setIsLoggedIn={setIsLoggedIn} setReset={setReset} />
                    </div>
                </>
            )}
            {isExploding && (
                <Confetti
                    width={width}
                    height={height}
                    numberOfPieces={500}
                />
            )}
            {!isLoggedIn && (
                <LoginDialogComponent open={!isLoggedIn} setDialog={setIsLoggedIn} />
            )}
        </div>
    );
}

export default App;
