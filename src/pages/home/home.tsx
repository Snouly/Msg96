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



// Временный массив до создания хранилища
let contactsArr: UserProps[] = [

    {
        isActive: false,
        contactName: 'Евгений Спехов',
        contactAvatar: 'src/shared/assets/images/pfps/1pfp.jpg',
        onlineStatus: false,
        lastMessage: 'СПАСИ МЕНЯ НЕ ИГНОРЬ МНЕ ПРАВДА НУЖНА',
        lastMessageTime: '15:28'    
    },

    {
        isActive: false,
        contactName: 'Гнилозад Урсынов',
        contactAvatar: 'src/shared/assets/images/pfps/2pfp.jpg',
        onlineStatus: false,
        lastMessage: 'Когда деньги вернёшь?',
        lastMessageTime: '09:11'
    },

    {
        isActive: false,
        contactName: 'Джо_Два вСырном',
        contactAvatar: 'src/shared/assets/images/pfps/3pfp.png',
        onlineStatus: true,
        lastMessage: 'Хм на миндальном молоке',
        lastMessageTime: '12:69'
    },

    {
        isActive: true,
        contactName: 'Альц Геймер',
        contactAvatar: 'src/shared/assets/images/pfps/4pfp.png',
        onlineStatus: true,
        lastMessage: 'КТО ЗДЕСЬ?',
        lastMessageTime: '22:54'
    },

    {
        isActive: false,
        contactName: 'Бараклайд Де Толли',
        contactAvatar: 'src/shared/assets/images/pfps/5pfp.png',
        onlineStatus: false,
        lastMessage: 'Здравствуйте мои соплеменники, хотел передать вам письмо, сейчас',
        lastMessageTime: '06:07'
    },

    {
        isActive: false,
        contactName: 'Гнег',
        contactAvatar: 'src/shared/assets/images/pfps/6pfp.png',
        onlineStatus: true,
        lastMessage: '3,1415926535897932384626433832795',
        lastMessageTime: '04:43'
    },

    {
        isActive: false,
        contactName: 'Хорлок Шелмс',
        contactAvatar: 'src/shared/assets/images/pfps/7pfp.png',
        onlineStatus: false,
        lastMessage: ':0',
        lastMessageTime: '07:07'
    },

    {
        isActive: false,
        contactName: 'Не придумал',
        contactAvatar: 'src/shared/assets/images/pfps/8pfp.png',
        onlineStatus: false,
        lastMessage: 'Всё, нет идей',
        lastMessageTime: '00:00'
    },    
]

// теперь в userStorage.ts
// type ContactProps = {
//     isActive: Boolean;
//     contactName: String;
//     contactAvatar?: String; 
//     onlineStatus: Boolean;
//     lastMessage?: String;
//     lastMessageTime?: String; 
// }

const User = (props: UserProps) => {
    return (
        <div className={props.isActive ? styles.contactActive : styles.contact}>
            <div className={styles.contactImg} style={{ backgroundImage: `url(${props.contactAvatar})`, backgroundSize: '57px 57px' }}></div>
            <div className={styles.contactMsg}>
                <div className={styles.contactInfoText}>{props.contactName}</div>
                <div className={styles.contactOnlineStatus}>{props.lastMessage}</div>
            </div>
            <div className={styles.contactTime}>
                <div className={styles.contactInfoText}>{props.onlineStatus ? "online" : "offline"}</div>
                <div className={styles.contactOnlineStatus}>{props.lastMessageTime}</div>
            </div>
        </div>
    )
}



const Users = () => {

    const {users, addUser} = useUser(useShallow(state=>({
        users: state.users,
        addUser: state.addUser
    })))

    const [user, setUser] = useState('');
}



const Nav = () => {

    const [searchValue, serSearchValue] = useState('');
    
    const handleSearch = event => {
        serSearchValue(event.target.value);
        debugFunc(`search value is: ${event.target.value}`, 'debug')
    }

    const filteredUsers = contactsArr.filter(user => 
        user.contactName.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <div className={styles.nav}>
            <div className={styles.title}>
                <div className={styles.titlebar}>
                    <img className={styles.monitorIcon} src="src\shared\assets\images\icons\Monitor.svg"></img>
                    <div className={styles.text}>Messenger 96</div>
                    <img className={styles.buttons} src="src\shared\assets\images\icons\Buttons.svg"></img>
                </div>
                <div className={styles.searchBar}>
                    <input 
                        className={styles.searchInput} 
                        placeholder="Search" 
                        type="search" 
                        onChange={handleSearch}
                        value={searchValue}
                    ></input>
                </div>
            </div>
            <div className={styles.contactsNav}>
                {filteredUsers.map(el => <User key={el.id} {...el}/>)}
            </div>
        </div>
    )
}



const Message = (props: MessageProps) => {
    
    return (
        <div className={props.isSenderYou ? styles.messageFromYou : styles.message}>
            <div className={styles.messageUp}>
                <div className={styles.messageUserName}>{props.messageSenderId}</div>
                <div className={styles.messageTime}>{props.messageSendTime}</div>
            </div>
            <div className={styles.messageDown}>{props.messageText}</div>
        </div>       
    )
}



const Messages = () => {
    const {messages, addMessage} = useMessages(useShallow(state=>({
        messages: state.messages,
        addMessage: state.addMessage
    })))

    const [message, setMessage] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null); 
    
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.target.value)
    }

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            addMessage({
                messageId: uuidv4(), 
                chatId: uuidv4(), 
                isSenderYou: true, 
                messageSenderId: `убери это ---> ${uuidv4()}`, 
                messageText: message,  
                messageSendTime: `${dayjs().format('HH:mm')}`
            })
            setMessage("")

            if (textareaRef.current) {
                textareaRef.current.focus();
            }

            debugFunc('message sended', 'debug')
        }
    }

    // Click
    const handleClick = (event: MouseEvent) => {
        handleSendMessage()
        debugFunc('click on send button', 'debug')
    }

    // Enter
    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage()
            debugFunc('enter key pressed', 'debug')
        }
    }

    return (
        <div>
            <div className={styles.messageSend}>
                <div className={styles.messageWrite}>
                    <textarea
                        className={styles.messageInput}
                        placeholder="Type a message..."
                        onChange={handleChange}
                        value={message}
                        onKeyPress={handleKeyPress}  
                        ref={textareaRef} 
                    />
                </div> 
                <div 
                    className={styles.sendButton} 
                    onClick={handleClick}>
                    <div className={styles.sendWord}>Send</div>
                </div>
            </div>
        </div>
    )
}



const DebugPanel = () => {

    const navigate = useNavigate()

    const handleWrongPage = () => {
        navigate("/wrongPage")
    }

    const handleRegisterPage = () => {
        navigate("/reg")
    }
    
    if(isDebugOn()) {
        return(
                <div className={styles.debugButtons}>
                    {[
                        {
                            str: "wrongPage",    
                            onClick: handleWrongPage
                        },
                        {
                            str: "registration",
                            onClick: handleRegisterPage
                        }
                        ].map(el => <div className={styles.debugButton} onClick={el.onClick}>{el.str}</div>
                    )}
            </div>
        )
    }   

}



function Home() {
    
    const {messages} = useMessages(useShallow(state=>({
        messages: state.messages
    })))
    

    return (
        <div className={styles.mainBlock}>            

            <DebugPanel></DebugPanel>

            <Nav></Nav>

            <div className={styles.chat}>

                <div className={styles.contactInfo}>
                    <div className={styles.userImg}></div>
                    <div className={styles.userInfo}>
                        <div className={styles.userInfoText}>User</div>
                        <div className={styles.userOnlineStatus}>Offline</div>
                    </div>
                </div>
            
                <div className={styles.chatWindow}>
                    {messages.map(mess => <Message {...mess}/>)}
                </div>

                <Messages></Messages>
            
            </div>

        </div>
    )
}

export default Home