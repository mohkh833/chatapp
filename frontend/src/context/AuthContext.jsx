import { createContext,  useState, useContext } from "react"
export const AuthContext = createContext();


export const useAuthContext = () => {
    return useContext(AuthContext);
}
export const AuthContextProvider = ({children}) => {
    const [authUser, setAuthUser] = useState(localStorage.getItem("chat-user") ? JSON.parse(localStorage.getItem("chat-user")) : null);

    return <AuthContext.Provider value={{authUser, setAuthUser}}>
        {children}
    </AuthContext.Provider>
}