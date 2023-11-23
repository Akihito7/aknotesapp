import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const { Navigator, Screen } = createBottomTabNavigator();

import { Home } from "../screens/Home";
import { Details } from "../screens/Details";
import { NewNote } from "../screens/NewNote";
import { Profile } from "../screens/Profile";
import { THEME } from "../theme";

import HomeSvg from "../../assets/home.svg"
import PlusSvg from "../../assets/plus.svg"
import ProfileSvg from "../../assets/profile.svg"

export function AppRoutes() {
    return (
        <Navigator screenOptions={{
            headerShown: false,
            tabBarInactiveTintColor: `${THEME.colors.white[100]}`,
            tabBarActiveTintColor: `${THEME.colors.orange[700]}`,
            tabBarLabelPosition: "beside-icon",
            tabBarStyle: {
                borderColor: `${THEME.colors.orange[700]}`,
                backgroundColor: `${THEME.colors.orange[700]}`,
                height: 50,
                paddingHorizontal : 20,
                paddingBottom: 5,

            },
        
        }}>
            <Screen
                name="home"
                component={Home}
                options={{
                    tabBarLabel : "",
                    tabBarIcon: () => (
                        <HomeSvg
                            width={24}
                            height={24}
                        />
                    )
                }}

            />

            <Screen
                name="details"
                component={Details}
                options={{

                    tabBarButton: () => null
                }}

            />

            <Screen
                name="newNote"
                component={NewNote}
                options={{
                    tabBarLabel : "",
                    tabBarIcon: () => (
                        <PlusSvg
                            width={24}
                            height={24}
                        />
                    )
                }}
            />

            <Screen
                name="Perfil"
                component={Profile}

                options={{
                    tabBarLabel : "",
                    tabBarIcon: () => (
                        <ProfileSvg
                            width={24}
                            height={24}
                        />
                    )
                }}

            />
        </Navigator>
    )

}

