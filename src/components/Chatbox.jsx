import React, { useState, useEffect } from 'react';
import styles from '../styles/Chatbox.module.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:5174");

function Chatbox({
    text,
    options = ["Group Description",
        //  "Leave Group", "Delete Chat", "Mute"
    ]
}) {

    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setMenuOpen(false);  // Close menu after selection
    };

    const [message, setMessage] = useState("");
    const [list, setList] = useState([]);

    const sendMessage = (e) => {
        e.preventDefault();
        const newMessage = { text: message, isSender: true };
        setList((prevList) => [...prevList, newMessage]);
        socket.emit("send_message", { message });
    };

    useEffect(() => {
        const handleMessageReceive = (data) => {
            const newMessage = { text: data.message, isSender: false };
            setList((prevList) => [...prevList, newMessage]);
        };

        socket.on("received_message", handleMessageReceive);

        return () => {
            socket.off("received_message", handleMessageReceive);
        };
    }, []);

    return (
        <>
            <div className={styles.box}>
                <div className={styles.grpName}>
                    <h3 className={styles.head}>Group Name</h3>

                    <div>
                        <div className={`${styles.menubtn} ${styles.moreIcon}`} onClick={toggleMenu} ><MoreVertIcon sx={{ fontSize: 20 }} /></div>

                        {menuOpen && (
                            <div className={styles.menu} style={{ cursor: 'pointer' }}>
                                {options.map((option, index) => (
                                    <div
                                        className={styles.opt}
                                        key={index}
                                        onClick={() => handleOptionClick(option)}
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.separation}></div>


                <ul className={styles.chats}>
                    <li style={{ listStyle: 'none' }}>
                        {selectedOption && (
                            <div className={styles['option-content']}>
                                {selectedOption === "Group Description" && (
                                    <div className={styles['group-description']}>
                                        <h2>Group Description</h2>
                                        <p>This is the group description content.</p>
                                    </div>
                                )}
                                {/* {selectedOption === "Leave Group" && (
                        <div className={styles['leave-group']}>
                            <h2>Leave Group</h2>
                            <p>Are you sure you want to leave the group?</p>
                        </div>
                    )}
                    {selectedOption === "Delete Chat" && (
                        <div className={styles['delete-chat']}>
                            <h2>Delete Chat</h2>
                            <p>Are you sure you want to delete the chat?</p>
                        </div>
                    )}
                    {selectedOption === "Mute" && (
                        <div className={styles['mute']}>
                            <h2>Mute</h2>
                            <p>The chat has been muted.</p>
                        </div>
                    )} */}
                            </div>
                        )}
                    </li>
                    {list.map((message, index) => (
                        <li
                            style={{ listStyle: 'none' }}
                            key={index}
                            className={message.isSender ? styles.sender : styles.receiver}
                        >
                            {message.text}
                        </li>
                    ))
                    }
                </ul>

                <form id='form' className={styles.inputA} >

                    <input
                        id='input'
                        className={styles.textbox}
                        type="text"
                        placeholder='Type a message'
                        onChange={(e) => {
                            setMessage(e.target.value)
                        }} />
                    <button onClick={sendMessage} className={styles.send}>Send</button>
                </form>
            </div>
        </>
    );
}

export default Chatbox;
