import { useShallow } from 'zustand/react/shallow'
import { use, useState, type ChangeEvent } from 'react'
import { BrowserRouter } from "react-router";
import './App.css'
import { useMessages, type MessageProps } from './sorces/messageStore'
import { useUser, type UserProps } from './sorces/userStore'
import dayjs from 'dayjs' 
import { v4 as uuidv4 } from 'uuid'
import { debugFunc } from './lib/debugUtils'
import { useRef } from 'react';


// Временный массив до создания хранилища
let contactsArr: UserProps[] = [
    
    {
        isActive: false,
        contactName: 'Евгений Спехов',
        contactAvatar: 'src/assets/pfps/1pfp.jpg',
        onlineStatus: false,
        lastMessage: 'СПАСИ МЕНЯ НЕ ИГНОРЬ МНЕ ПРАВДА НУЖНА',
        lastMessageTime: '15:28'    
    },

    {
        isActive: false,
        contactName: 'Гнилозад Урсынов',
        contactAvatar: 'src/assets/pfps/2pfp.jpg',
        onlineStatus: false,
        lastMessage: 'Когда деньги вернёшь?',
        lastMessageTime: '09:11'
    },

    {
        isActive: false,
        contactName: 'Джо_Два вСырном',
        contactAvatar: 'src/assets/pfps/3pfp.png',
        onlineStatus: true,
        lastMessage: 'Хм на миндальном молоке',
        lastMessageTime: '12:69'
    },

    {
        isActive: true,
        contactName: 'Альц Геймер',
        contactAvatar: 'src/assets/pfps/4pfp.png',
        onlineStatus: true,
        lastMessage: 'КТО ЗДЕСЬ?',
        lastMessageTime: '22:54'
    },

    {
        isActive: false,
        contactName: 'Бараклайд Де Толли',
        contactAvatar: 'src/assets/pfps/5pfp.png',
        onlineStatus: false,
        lastMessage: 'Здравствуйте мои соплеменники, хотел передать вам письмо, сейчас',
        lastMessageTime: '06:07'
    },

    {
        isActive: false,
        contactName: 'Гнег',
        contactAvatar: 'src/assets/pfps/6pfp.png',
        onlineStatus: true,
        lastMessage: '3,1415926535897932384626433832795',
        lastMessageTime: '04:43'
    },

    {
        isActive: false,
        contactName: 'Хорлок Шелмс',
        contactAvatar: 'src/assets/pfps/7pfp.png',
        onlineStatus: false,
        lastMessage: ':0',
        lastMessageTime: '07:07'
    },

    {
        isActive: false,
        contactName: 'Не придумал',
        contactAvatar: 'src/assets/pfps/8pfp.png',
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
        <div className={props.isActive ? 'contactActive' : 'contact'}>
            <div className="contactImg" style={{ backgroundImage: `url(${props.contactAvatar})`, backgroundSize: '57px 57px' }}></div>
            <div className="contactMsg">
                <div className="contactInfoText">{props.contactName}</div>
                <div className="contactOnlineStatus">{props.lastMessage}</div>
            </div>
            <div className="contactTime">
                <div className="contactInfoText">{props.onlineStatus ? "online" : "offline"}</div>
                <div className="contactOnlineStatus">{props.lastMessageTime}</div>
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
        console.log('value is:', event.target.value);
    }

    return (
        <div className="nav">
            <div className="title">
                <div className="titlebar">
                    <img className="monitorIcon" src="src\assets\Monitor.svg"></img>
                    <div className="text">Messenger 96</div>
                    <img className="buttons" src="src\assets\Buttons.svg"></img>
                </div>
                <div className="searchBar">
                    <input 
                        className="searchInput" 
                        placeholder="Search" 
                        type="search" 
                        onChange={handleSearch}
                        value={searchValue}
                    ></input>
                </div>
            </div>
            <div className="contactsNav">
                {contactsArr.map(el => <User {...el}/>)}
            </div>
        </div>
    )
}



const Message = (props: MessageProps) => {
    return (
        <div className={props.isSenderYou ? 'messageFromYou' : 'message'}>
            <div className="messageUp">
                <div className="messageUserName">{props.messageSenderId}</div>
                <div className="messageTime">{props.messageSendTime}</div>
            </div>
            <div className="messageDown">{props.messageText}</div>
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

    // Для клика
    const handleClick = (event: MouseEvent) => {
        handleSendMessage()
        debugFunc('click on send button', 'debug')
    }

    // Для Enter
    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage()
            debugFunc('Enter key pressed', 'debug')
        }
    }

    return (
        <div>
            <div className="messageSend">
                <div className="messageWrite">
                    <textarea
                        className="messageInput"
                        placeholder="Type a message..."
                        onChange={handleChange}
                        value={message}
                        onKeyPress={handleKeyPress}  
                        ref={textareaRef} 
                    />
                </div> 
                <div 
                    className="sendButton" 
                    onClick={handleClick}
                >
                    <div className='sendWord'>Send</div>
                </div>
            </div>
        </div>
    )

}




function App() {

    const {messages} = useMessages(useShallow(state=>({
        messages: state.messages
    })))
    
    return (
        <div className="mainBlock">
            <Nav></Nav>
            <div className="chat">
                <div className="contactInfo">
                    <div className="userImg"></div>
                    <div className="userInfo">
                        <div className="userInfoText">User</div>
                        <div className="userOnlineStatus">Offline</div>
                    </div>
                </div>
                <div className="chatWindow">
                    {messages.map(mess => <Message {...mess}/>)}
                </div>
                <Messages></Messages>
            </div>
        </div>
    )
}

export default App