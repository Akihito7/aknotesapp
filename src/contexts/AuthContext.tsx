import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from "react"

import AsyncStorage from "@react-native-async-storage/async-storage"
import { api } from "../services/axios";
import AppError from "../utils/AppError";
import { Toast } from "native-base";



type PropsUser = {
    id: string;
    name: string;
    email: string;
    imagem: string;
    password: string;
}

type PropsAuthContext = {
    user: PropsUser | undefined
    signln: (email: string, password: string) => void;
    logout: () => void;
    setImage : (idImage : string) => void;
    image : string;
}

const AuthContext = createContext({} as PropsAuthContext);


function AuthContextProvider({ children }: { children: React.ReactNode }) {

    const CREDENTIALSLOGINASYNCSTORAGE = "@aknotes:user";
    const TOKENASYNCSTORAGE = "@aknotes:token";

    const [user, setUser] = useState<PropsUser>();
    const [image, setImage] = useState<string>("")



    async function signln(email: string, password: string) {
        try {
            const response = await api.post("/auth/signln", { email, password })
            setUser(response.data.user);

            const CREDENTIALSLOGIN = { email, password };

            await AsyncStorage.setItem(CREDENTIALSLOGINASYNCSTORAGE, JSON.stringify(CREDENTIALSLOGIN));
            await AsyncStorage.setItem(TOKENASYNCSTORAGE, JSON.stringify(response.data.token));

            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`

        } catch (error) {

            if (error instanceof AppError) {
                Toast.show({
                    title: error.message,
                    duration: 3000,
                    bg: "red.700",
                    placement: "top",
                })
            }
            else {
                Toast.show({
                    title: "Erro interno",
                    duration: 3000,
                    bg: "red.700",
                    placement: "top",
                })
            }
        }
    };

    async function tryLoginWithAsyncStorage() {

        const CREDENTIALSLOGIN = await AsyncStorage.getItem(CREDENTIALSLOGINASYNCSTORAGE) || "{}"
        const { email, password } = JSON.parse(CREDENTIALSLOGIN);

        try {
            if (CREDENTIALSLOGIN) {
                const response = await api.post("/auth/signln", { email, password })
                setUser(response.data.user);
                api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`

                const imagem = await api.get("/user/avatar");
                setImage(imagem.data)
            }
        } catch (error) {
            Toast.show({
                title: "Não foi logar com os dados de login salvos no dispositivo",
                duration: 3000,
                bg: "red.700",
                placement: "top",
            })
        }
    };

    async function logout() {
        setUser(undefined);
        await AsyncStorage.removeItem(CREDENTIALSLOGINASYNCSTORAGE);
    };

    useEffect(() => {
        tryLoginWithAsyncStorage();
        
        
    }, []);



    return (
        <AuthContext.Provider value={{
            user,
            signln,
            logout,
            setImage,
            image,

        }}>
            {children}
        </AuthContext.Provider>
    )
}



function useAuth() {
    const response = useContext(AuthContext);
    return response;
};

export { AuthContextProvider, useAuth }
