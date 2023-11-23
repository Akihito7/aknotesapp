import { TouchableOpacity } from "react-native";
import {
    HStack,
    Image,
    VStack,
    Text,
} from "native-base";

import { THEME } from "../theme";
import { Ionicons } from '@expo/vector-icons';
import Profile from "../../assets/profile.png";

import { useAuth } from "../contexts/AuthContext";


export function Header() {

    const { user, logout } = useAuth();
    return (

        <VStack>
            <HStack

                alignItems="center"
                px={30}
                mt={16}
            >

                <Image
                    source={Profile}
                    borderRadius={99}
                    mr={4}
                    alt="imagem de perfil"
                />

                <VStack
                    justifyContent="center"
                    flex={1}
                >
                    <Text
                        fontSize={14}
                        color="gray.300"
                    >
                        Welcome,
                    </Text>

                    <Text
                        fontSize={16}
                        color="white.100"
                    >
                       {user?.name}
                    </Text>
                </VStack>


                <TouchableOpacity
                    onPress={logout}
                    activeOpacity={0.2}
                >

                    <Ionicons
                        name="ios-power-sharp"
                        size={28}
                        color={THEME.colors.gray[100]}
                    />
                </TouchableOpacity>

            </HStack>

            <VStack

                mt={8}
                width={"full"}
                bg={"gray.300"}
                style={{
                    height: 1,
                }}
            />
        </VStack>
    )
}