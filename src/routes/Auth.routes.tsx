import { createSwitchNavigator } from "react-navigation-switch";
const { Navigator, Screen } = createSwitchNavigator();

import { Signln } from "../screens/Signln";
import { Signup } from "../screens/Signup";


export function AuthRoutes() {
    return (
        <Navigator>
            <Screen
                name="signln"
                component={Signln}
            />

            <Screen
                name="signup"
                component={Signup}
            />
        </Navigator>
    )

}