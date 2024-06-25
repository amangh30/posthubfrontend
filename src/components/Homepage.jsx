import React, { useState } from 'react';
import Chatbox from '../components/Chatbox';
import styles from '../styles/Homepage.module.css';

function Homepage() {
    const [isComponentVisible, setIsComponentVisible] = useState(false);

    const handleButtonClick = () => {
        setIsComponentVisible(!isComponentVisible);
    };

    return (
        <>
        <div className={styles.badaDabba}>
            <div className={styles.leftDabba}></div>
            <div className={styles.midDabba}></div>
            <div className={styles.rightDabba}>
                <div className={styles.grpChat}>
                    <div className={styles.chatBTN} onClick={handleButtonClick}>
                        {isComponentVisible ? 'Hide' : 'Show'} Group Chat
                    </div>
                    {isComponentVisible && <Chatbox />}
                </div>
            </div>
        </div>
        </>
    );
}

export default Homepage;
