import {create} from "zustand";

export type MessageProps = {
    messageId: String;
    chatId: string
    isSenderYou: Boolean;
    messageSenderId: String;
    messageText: String;
    messageSendTime: String; 
}


interface MessageStore {
    messages: MessageProps[]
    addMessage: (newMessage: MessageProps) => void
}

export const useMessages = create<MessageStore>((set) => ({
    messages: [],
    addMessage: (newMessage) => 
        set(
            state=>({...state, messages: [...state.messages, newMessage]})
        )
})) 