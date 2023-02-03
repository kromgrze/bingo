import React, { useEffect, useState } from 'react'
import shuffle from 'shuffle-array'
import classnames from 'classnames'

import DialogComponent from "../../components/Dialog/Dialog";
import trackerApi from "../../api/tracker";
import styles from './Bingo.module.css'

const Bingo = ({ setIsExploding, reset, setReset }) => {
    const initialFieldSetValue =  {
        checked: {
            12: true
        },
        winFields: {}
    }
    const [data, setData] = useState(null);
    const [fieldState, setFieldState] = useState(initialFieldSetValue);
    const [win, setWin] = useState(0)
    const [dialogOpen, setDialogOpen] = useState(false);
    const [userData, setUserData] = useState(null)
    const [fields, setFields] = useState(null)

    useEffect(() => {
        getFields()
        setFieldState(initialFieldSetValue);
        setReset(false)
        getUserData();
    }, [reset])

    useEffect(() => {
        if (fields && fields.length) {
            setData(shuffle(fields).reduce(
                (acc, value, index) => ({...acc, [index]: index === 12 ? 'DEFINED' : value}),
                {}
            ));
        }
    }, [fields])

    const onClickField = id => {
        setFieldState(state => ({
           ...state,
           checked:{
               ...state.checked,
               [id]: !state.checked[id]
           }
        }))
    }

    const getFields = async () => {
        try {
            const response = await trackerApi.get('/api/fields/getAll');
            // console.log('response2', response)

            if (response.status === 200) {
                // setFields
                let newFields = []

                response.data.forEach(item => {
                    newFields.push(item.text)
                })
                newFields = shuffle(newFields).slice(0, 25)

                if (newFields.length < 25) {
                    const diff = 25 - newFields.length;
                    for (let i = 0; i < diff; i++) {
                        newFields.push(i)
                    }
                }
                setFields(newFields)
            }
        } catch (e) {
            console.log('Error', e)
        }
    }

    useEffect(() => {
        checkIfWholeLine()
    }, [fieldState.checked])

    useEffect(() => {
        if (!dialogOpen) {
            setIsExploding(false)
        }
    }, [dialogOpen])

    useEffect( () => {
        if (Object.entries(fieldState.winFields).length && win) {
            setIsExploding(true)
            setDialogOpen(true)
            updateScores();
        }
    }, [fieldState.winFields, win])

    const getUserData = () => {
        let player = localStorage.getItem("player");
        setUserData(JSON.parse(player));
    }

    const updateScores = async () => {
        try {
            await trackerApi.post('/api/scores', {
                userId: userData.userId,
                points: win === 1 ? 50 : (win + 1) * 50
            })
        } catch (e) {
            console.log('Error', e)
        }
    }

    const checkIfWholeLine = () => {
        const index = [0, 1, 2, 3, 4];
        let wins = 0

        index.forEach(row => {
            if (
                index.every(column => fieldState.checked[row * 5 + column]) &&
                !index.every(column => fieldState.winFields[row * 5 + column])
            ) {
                index.forEach(column => {
                    setFieldState(state => ({
                        ...state,
                        winFields: {
                            ...state.winFields,
                            [row * 5 + column]: true
                        }
                    }))
                })
                wins++;
            }
        })

        index.forEach(column => {
            if (
                index.every(row => fieldState.checked[row * 5 + column]) &&
                !index.every(row => fieldState.winFields[row * 5 + column])
            ) {
                index.forEach(row => {
                    setFieldState(state => ({
                        ...state,
                        winFields: {
                            ...state.winFields,
                            [row * 5 + column]: true
                        }
                    }))
                })
                wins++;
            }
        })

        if (
            index.every(index => fieldState.checked[index * 5 + index]) &&
            !index.every(index => fieldState.winFields[index * 5 + index])
        ) {
            index.forEach(index => {
                setFieldState(state => ({
                    ...state,
                    winFields: {
                        ...state.winFields,
                        [index * 5 + index]: true
                    }
                }))
            })
            wins++;
        }

        if (
            index.every(index => fieldState.checked[index * 5 + 4 - index]) &&
            !index.every(index => fieldState.winFields[index * 5 + 4 - index])
        ) {
            index.forEach(index => {
                setFieldState(state => ({
                    ...state,
                    winFields: {
                        ...state.winFields,
                        [index * 5 + 4 - index]: true
                    }
                }))
            })
            wins++;
        }

        setWin(wins);
    }

    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                {data && (
                    Object.keys(data).map(id => (
                        <div
                            key={id}
                            className={classnames(styles.cell, {
                                [styles.checked]: fieldState.checked[id],
                                [styles.win]: fieldState.winFields[id]
                            })}
                            onClick={() => onClickField(id)}
                        >
                            { data[id] }
                        </div>
                    ))
                )}
                <DialogComponent open={dialogOpen} setDialog={setDialogOpen} win={win} setReset={setReset} />
            </div>
        </div>
    )
}

export default Bingo;
