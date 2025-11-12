import { useShallow } from 'zustand/react/shallow';
import { use, useState, type ChangeEvent } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from "react-router";
import styles from "./style.module.css"
import { useMessages, type MessageProps } from '../../app/store/messageStore';
import { useUser, type UserProps } from '../../app/store/userStore';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { debugFunc, isDebugOn } from '../../shared/lib/debugUtils';
import { useRef } from 'react';
import '../../shared/assets/styles/global.css'

function Reg() {
    return (
        <div className={styles.mainBlock}>
            <div className={styles.window}>
                <div className={styles.titlebar}>
                    <img className={styles.monitorIcon} src="src\shared\assets\images\icons\Monitor.svg"></img>
                    <div className={styles.text}>Messenger 96</div>
                    <img className={styles.buttons} src="src\shared\assets\images\icons\Buttons.svg"></img>
                </div>
                <div className={styles.heading}>Registration</div>
                <div className={styles.regInputs}>
                    <div className={styles.dataInput}>
                        <div>Username:</div>
                        <input className={styles.input} type="text" placeholder="Your username"></input>
                    </div>
                    <div className={styles.dataInput}>
                        <div>Password:</div>
                        <input className={styles.input} type="text" placeholder="Your password"></input>
                    </div>
                    <div className={styles.dataInput}>
                        <div>Confirm password:</div>
                        <input className={styles.input} type="text" placeholder="Your password"></input>
                    </div>
                    <div className={styles.dataInput}>
                        <div>Select a profile photo:</div>
                        <div className={styles.photoSelect}>Open file...</div>
                    </div>
                </div>
                <div className={styles.downButtons}>
                    <div className={styles.regBtn}>More</div>
                    <div className={styles.regBtn}>Register</div>
                </div>
            </div>
            <div className={styles.clippyСontainer}>
                <img className={styles.clippy} src="src\pages\registration\assets\images\clippy.gif" alt="clippy"></img>
            </div>
        </div>        
    )
}

export default Reg