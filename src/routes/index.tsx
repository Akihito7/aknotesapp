import { NavigationContainer } from "@react-navigation/native"
import { AuthRoutes } from "./Auth.routes"
import { AppRoutes } from "./App.routes";

import { useAuth } from "../contexts/AuthContext"

export function Routes() {

    const { user } = useAuth();

    return (
        <NavigationContainer>
            {
                user ? <AppRoutes /> : <AuthRoutes />
            }
            
        </NavigationContainer>
    )
}
