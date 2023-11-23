import { TouchableOpacity } from "react-native";
import { HStack, VStack, Image, Input, Button, Text } from "native-base";
import { useAuth } from "../contexts/AuthContext";

import { THEME } from "../theme";
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import profile from "../../assets/profile.png"

export function Profile() {

    const { user } = useAuth();

    return (
        <VStack
            flex={1}
            bg="gray.700"


        >
            <HStack
                mt={16}
                justifyContent="space-between"
                py={8}
                px={8}
            >

                <TouchableOpacity activeOpacity={0.2}>
                    <Octicons
                        name="arrow-left"
                        size={28}
                        color={THEME.colors.gray[100]} />
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.2} >

                    <Ionicons
                        name="ios-power-sharp"
                        size={28}
                        color={THEME.colors.gray[100]}
                    />
                </TouchableOpacity>
            </HStack>


            <VStack
                flex={1}
                mt={12}
                px={8}
                py={8}
                borderTopRadius={50}
                alignItems="center"
                bg="gray.500"
            >
                <Image
                    source={profile}
                    defaultSource={profile}
                    borderRadius={99}
                    height={32}
                    width={32}
                    resizeMode="contain"
                    alt="foto de perfil"

                    position="absolute"
                    top={"-10%"}
                    left="41%"
                />

                <Input
                    mt={24}
                    bg="gray.700"
                    borderWidth={2}
                    borderColor="transparent"
                    borderRadius={10}
                    height={65}
                    fontFamily="body"
                    fontSize="sm"
                    px={5}
                    color="white.100"
                    placeholderTextColor="gray.300"
                    value={user?.name}
                    isReadOnly={true}
                    mb={4}
                    _focus={{
                        bg: "gray.700",
                        borderWidth: 1.5,
                        borderColor: "orange.700"
                    }}

                />
                <Input
                    bg="gray.700"
                    borderWidth={2}
                    borderColor="transparent"
                    borderRadius={10}
                    height={65}
                    fontFamily="body"
                    fontSize="sm"
                    px={5}
                    color="white.100"
                    placeholderTextColor="gray.300"
                    value={user?.email}
                    isReadOnly={true}
                    mb={4}
                    _focus={{
                        bg: "gray.700",
                        borderWidth: 1.5,
                        borderColor: "orange.700"
                    }}

                />
                <Input
                    mt={8}
                    type="password"
                    bg="gray.700"
                    borderWidth={2}
                    borderColor="transparent"
                    borderRadius={10}
                    height={65}
                    fontFamily="body"
                    fontSize="sm"
                    px={5}
                    color="white.100"
                    placeholderTextColor="gray.300"
                    placeholder="Current password"
                    mb={4}
                    _focus={{
                        bg: "gray.700",
                        borderWidth: 1.5,
                        borderColor: "orange.700"
                    }}

                />
                <Input

                    type="password"
                    bg="gray.700"
                    borderWidth={2}
                    borderColor="transparent"
                    borderRadius={10}
                    height={65}
                    fontFamily="body"
                    fontSize="sm"
                    px={5}
                    color="white.100"
                    placeholderTextColor="gray.300"
                    placeholder="New password"
                    mb={4}
                    _focus={{
                        bg: "gray.700",
                        borderWidth: 1.5,
                        borderColor: "orange.700"
                    }}

                />

                <Button
                    alignItems="center"
                    justifyContent="center"
                    mt={8}
                    width="full"
                    height={65}
                    bg="orange.700"
                    borderRadius={10}
                    borderWidth={0}
                    px={12}
                    py={2}

                    _pressed={{
                        opacity: "0.8",
                        bg: "orange.700"
                    }}

                >
                    <Text
                        fontFamily="heading"
                        fontSize='xl'
                    >
                        Save
                    </Text>
                </Button>



            </VStack>

        </VStack>
    )
}