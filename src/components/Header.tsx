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
    const { user, logout, image } = useAuth();

    return (

        <VStack>
            <HStack

                alignItems="center"
                px={30}
                mt={16}
            >

                <Image
                    source={{ uri: image ? `https://drive.google.com/uc?id=${image}` : "https://cdn-icons-png.flaticon.com/512/1077/1077114.png" }}
                    borderRadius={99}
                    mr={4}
                    w={20}
                    height={20}
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