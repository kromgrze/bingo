import Enzyme, {shallow} from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18'
import DialogComponent from "./Dialog";
import React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";


Enzyme.configure({adapter: new Adapter()});

describe('Dialog', () => {
    const setDialog = jest.fn();
    const setReset = jest.fn();
    let dialog;

    beforeEach(() => {
        dialog = shallow(
            <DialogComponent
                open={true}
                setDialog={setDialog}
                setReset={setReset}
                win={1}
            />
        );
    });

    it('should show 50 points for 1 line', () => {
        expect(dialog.text()).toMatch(/You have completed 1 lines!You get 50 points/);
    });

    it('should show 150 points for 2 lines', () => {
        const setDialog = jest.fn();
        const setReset = jest.fn();

        const dialog = shallow(
            <DialogComponent
                open={true}
                setDialog={setDialog}
                setReset={setReset}
                win={2}
            />
        );

        expect(dialog.text()).toMatch(/You have completed 2 lines!You get 150 points/);
    });

    it('should have a title', () => {
        expect(dialog.find(DialogTitle)).toHaveLength(1);
    })

    it('should have two buttons', () => {
        expect(dialog.find(Button)).toHaveLength(2);
    })

    it('should call handleClose function after clicking Continue button', () => {
        dialog.find(Button).at(0).simulate('click')

        expect(setDialog).toHaveBeenCalled()
    })

    it('should call handleCloseAndTest function after clicking \"New empty Board\" button', () => {
        dialog.find(Button).at(1).simulate('click')

        expect(setDialog).toHaveBeenCalled()
        expect(setReset).toHaveBeenCalled()
    })
})
