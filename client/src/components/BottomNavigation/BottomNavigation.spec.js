import renderer from 'react-test-renderer';
import BottomNavigationComponent from "./BottomNavigation";
import React from "react";

describe('Bottom Navigation', () => {
    it('drawer state', () => {
        const toggleDrawer = jest.fn();
        const setIsLoggedIn = jest.fn()
        const setReset = jest.fn()

        const component = renderer.create(
            <BottomNavigationComponent drawerState={null} toggleDrawer={toggleDrawer} setIsLoggedIn={setIsLoggedIn} setReset={setReset} />
        );

        expect(component.toJSON()).toMatchSnapshot();

        renderer.act(() => {
            component.toJSON().props.drawerState = { left: true }
        })
        expect(component.toJSON()).toMatchSnapshot()

        renderer.act(() => {
            component.toJSON().props.drawerState = { left: false, right: true }
        })
        expect(component.toJSON()).toMatchSnapshot()
    });
})

