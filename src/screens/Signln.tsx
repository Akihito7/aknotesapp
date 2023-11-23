import { useEffect } from "react";
import { RobotoSlab_700Bold } from "@expo-google-fonts/roboto-slab"
import {
    VStack,
    Text,
    Input,
    Button,
    Image,
    ScrollView
} from "native-base"

import { useNavigation } from "@react-navigation/native"
import backgroundImg from "../../assets/back.png"
import { useAuth } from "../contexts/AuthContext";

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
                        <Input
                            onChangeText={onChange}
                            value={value}
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
                            placeholder="E-mail"
                            mb={4}
                            _focus={{
                                bg: "gray.700",
                                borderWidth: 1.5,
                                borderColor: "orange.700"
                            }}

                        />
                    )}

                />


                <Controller
                    name="password"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            onChangeText={onChange}
                            value={value}
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
                            placeholder="Password"
                            _focus={{
                                bg: "gray.700",
                                borderWidth: 1.5,
                                borderColor: "orange.700"
                            }}

                        />
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
