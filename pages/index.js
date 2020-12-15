import React from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Icon from 'react-icons-kit/'
import { x } from 'react-icons-kit/feather'
let interval;

export default function Home() {
    const [cycle, setCycle] = React.useState(2);
    const [isRunning, setisRunning] = React.useState(false);
    const [isMoved, setisMoved] = React.useState(false);
    const [timer, setTimer] = React.useState(0);

    const toggleCycle = (count) => {
        return setCycle(count);
    };
    const startCounter = () => {
        let time = cycle.toString().length > 1 ? cycle : "0" + cycle;
        setTimer((oldtime) => time + ":00");
        let timed = cycle * 60,
            minutes,
            seconds;
        interval = setInterval(() => {
            minutes = parseInt(timed / 60, 10);
            seconds = parseInt(timed % 60, 10);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            setTimer(
                minutes.toString().length > 1
                    ? minutes + ":" + seconds
                    : "0" + minutes + ":" + seconds
            );
            if (--timed < 0) {
                timed = cycle * 60;
            }
            let time =
                minutes.toString().length > 1
                    ? minutes + ":" + seconds
                    : "0" + minutes + ":" + seconds;
            if (time === "00:00") {
                clearInterval(interval);
                setisRunning(false);
            }
        }, 1000);
    };
    const mouseMove = () => {
        if (isRunning) {
            clearInterval(interval);
            startCounter();
            setisMoved(true);
            setTimer("00:00");
        }
    };
    const close = (e) => {
        if (e.key == "Escape") {
            setRunning(false);
            setisMoved(false);
            clearInterval(interval);
        }
        else {
            setisMoved(false);
            clearInterval(interval);
        }
    }
    return (
        <div className={styles.container} onMouseMove={mouseMove} onKeyDown={close}>
            <Head>
                <title>Focus</title>
                <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
                <link rel="manifest" href="/images/site.webmanifest" />
                <meta name="msapplication-config" content="/images/browserconfig.xml" />
                <meta name="msapplication-TileColor" content="#fff" />
                <meta name="theme-color" content="#fff"></meta>
            </Head>
            {isMoved && <button className={styles.button} onClick={() => {
                document.exitFullscreen().then(() => {
                    setisMoved(false);
                    clearInterval(interval);
                    setisRunning(false);
                })
            }}> <Icon icon={x} /></button>}
            {isRunning &&
                <>
                    <div
                        style={{
                            fontSize: "36px"
                        }}
                    >
                        {timer}
                    </div>
                    <span>Do not move the cursor, stay back and take a break!</span>
                </>
            }
            {!isRunning && <>
                <Image
                    src="/images/resources.png"
                    alt="Picture of the author"
                    width={300}
                    height={300}
                />
                <div className={styles.flex}>
                    <button
                        className={styles.button}
                        onClick={() => {
                            toggleCycle(2);
                        }}
                        style={{ border: `1px solid ${cycle === 2 ? "orange" : "#aaa"}` }}
                    >
                        2 minutes
                                </button>
                    <button
                        onClick={() => {
                            toggleCycle(5);
                        }}
                        className={styles.button}
                        style={{ border: `1px solid ${cycle === 5 ? "orange" : "#aaa"}` }}
                    >
                        5 minutes
                                </button>
                    <button
                        onClick={() => {
                            toggleCycle(10);
                        }}
                        className={styles.button}
                        style={{
                            border: `1px solid ${cycle === 10 ? "orange" : "#aaa"}`
                        }}
                    >
                        10 minutes
                                </button>
                </div>
                <button
                    onClick={() => {
                        document.documentElement.requestFullscreen().then(() => {
                            setisRunning((wasrunning) => !wasrunning);
                            startCounter();
                        })
                    }}
                    style={{
                        marginTop: "10px",
                        cursor: "pointer",
                        fontSize: "18px",
                        background: "orange",
                        border: "none",
                        padding: "5px 10px"
                    }}
                >
                    Focus now
                            </button>
            </>
            }

        </div>
    );
}
