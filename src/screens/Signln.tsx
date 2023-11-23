import { useEffect } from "react";
import { RobotoSlab_700Bold } from "@expo-google-fonts/roboto-slab"
import {
    VStack,
    Text,
    Input,
    Button,
    Image,
    ScrollView,
    HStack
} from "native-base"

import { useAuth } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native"

import backgroundImg from "../../assets/back.png"
import EmailSvg from "../../assets/E-mail.svg";
import PasswordSvg from "../../assets/Senha.svg";

import { Controller, useForm } from "react-hook-form";

type PropsLogin = {
    email: string,
    password: string;
}

export function Signln() {

    const { control, handleSubmit } = useForm()

    const { signln } = useAuth();

    const { navigate } = useNavigation();

    function handleToGoSignup() {
        navigate("signup");
    }


    async function handleLogin({ email, password }: { email: string, password: string }) {
        signln(email, password)
    }

    useEffect(() => {

    }, [])
    return (

        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
        >
            <VStack
                flex={1}
                pt={40}
                paddingX={8}
                alignItems="center"

            >
                <Image
                    position="absolute"
                    source={backgroundImg}
                    defaultSource={backgroundImg}
                    alt="Pessoas treinando"
                    resizeMode="cover"
                    style={{
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        margin: 'auto', // Centraliza horizontalmente
                    }}

                />
                <Text

                    color="orange.700"
                    fontSize="gg"
                    fontFamily="heading"
                    mb={25}

                >
                    AKnotes
                </Text>
                <Text
                    px={14}
                    color="white.100"
                    fontSize="sm"
                    fontFamily="heading"
                    mb={16}
                >
                    No more losing important links, save them with just a few clicks
                </Text>

                <Controller
                    name="email"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <HStack
                            alignItems="center"
                            height={65}
                            bg="gray.700"
                            borderColor="transparent"
                            borderWidth={2}
                            borderRadius={10}
                            mb={4}
                            px={5}

                        >
                            < EmailSvg width={24} height={24} />

                            <Input
                                flex={1}
                                onChangeText={onChange}
                                value={value}
                                fontFamily="body"
                                borderColor="transparent"
                                color="white.100"
                                placeholderTextColor="gray.300"
                                placeholder="E-mail"
                                fontSize="sm"
                                _focus={{
                                    bg: "gray.700",
                                    borderWidth: 1.5,
                                    borderColor: "transparent"
                                }}

                            />

                        </HStack>
                    )}

                />


                <Controller
                    name="password"
                    control={control}
                    render={({ field: { onChange, value } }) => (

                        <HStack
                            alignItems="center"
                            height={65}
                            bg="gray.700"
                            borderColor="transparent"
                            borderWidth={2}
                            borderRadius={10}
                            mb={4}
                            px={5}
                        >
                            < PasswordSvg width={24} height={24} />

                            <Input
                                flex={1}
                                onChangeText={onChange}
                                value={value}
                                bg="gray.700"
                                fontFamily="body"
                                fontSize="sm"
                                color="white.100"
                                borderColor="transparent"
                                placeholderTextColor="gray.300"
                                placeholder="Password"
                                _focus={{
                                    bg: "gray.700",
                                    borderWidth: 1.5,
                                    borderColor: "trasparent"
                                }}

                            />
                        </HStack>
                    )}
                />


                <Button
                    onPress={handleSubmit(handleLogin)}
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
                        Logar
                    </Text>
                </Button>


                <Text
                    mt={10}
                    color="white.100"
                    fontSize="sm"
                    fontFamily="body"
                >
                    forgot your password?
                </Text>

                <Button
                    px={8}
                    mt={24}

                    bg="orange.700"
                    borderRadius={10}
                    _pressed={{
                        opacity: 0.7,
                        bg: "orange.700",
                    }}

                >

                    <Text
                        fontSize="sm"
                        fontFamily="body"
                        onPress={handleToGoSignup}

                    >
                        Not have an account yet?
                    </Text>

                </Button>
            </VStack>
        </ScrollView>
    )
}
