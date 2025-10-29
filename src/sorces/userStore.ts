import {create} from "zustand";

export type UserProps = {
    isActive: Boolean;
    contactName: String;
    contactAvatar?: String; 
    onlineStatus: Boolean;
    lastMessage?: String;
    lastMessageTime?: String;
}


interface UserStore {
    users: UserProps[]
    addUser: (newUser: UserProps) => void
}

export const useUser = create<UserStore>((set) => ({
    users: [],
    addUser: (newUser) => 
        set(
            state=>({...state, users: [...state.users, newUser]})
        )
})) 