import { createStackNavigator } from "@react-navigation/stack";
const { Navigator, Screen } = createStackNavigator();

import { Home } from "../screens/Home";
import { Details } from "../screens/Details";
import { NewNote } from "../screens/NewNote";
import { Profile } from "../screens/Profile";

export function AppRoutes() {
    return (
        <Navigator screenOptions={{
            headerShown: false,
        }}>
            <Screen
                name="home"
                component={Home}
            />

            <Screen
                name="details"
                component={Details}
            />

            <Screen
                name="newNote"
                component={NewNote}
            />

            <Screen
                name="profile"
                component={Profile}
            />
        </Navigator>
    )

}
