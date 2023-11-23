import {
    ScrollView,
    Image,
    VStack,
    Text,
    Input,
    Button,
    FormControl
} from "native-base";

import * as yup from "yup";

import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native"
import { yupResolver } from '@hookform/resolvers/yup'

import backgroundImg from "../../assets/back.png"
import { api } from "../services/axios";

type PropSignup = {
    fullName: string;
    username: string;
    email: string;
    password: string;
    passwordAgain: string
};

export function Signup() {

    const { navigate } = useNavigation();

    const schema = yup.object().shape({
        fullName: yup.string().required("Informe seu nome completo"),
        username: yup.string().required("Informe seu username"),
        email: yup.string().required("Informe seu e-mail").email("Informe um e-mail válido"),
        password: yup.string().required("Informe sua senha").min(6, "A senha deve conter no mínimo 6 digítos"),
        passwordAgain: yup.string().required().oneOf([yup.ref('password')], "As senhas precisam ser iguais")
    });

    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });


    async function onSubmit({ fullName, email, password }: PropSignup) {

        try {
            await api.post("/auth/signup", {
                name: fullName,
                email,
                password,
            });

            reset();
            handleToGoSignln();
        } catch (error) {
            console.log(error)
        }
    };

    function handleToGoSignln() {
        navigate("signln");
    };

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
                        margin: 'auto',
                    }}

                />
                <Text
                    color="orange.700"
                    fontSize="gg"
                    fontFamily="heading"
                    mb={30}

                >
                    AKnotes
                </Text>

                <Controller
                    name="fullName"
                    control={control}
                    render={({ field: { onChange, value } }) => {

                        const errorMessage = errors.fullName?.message || "erro"
                        const invalid = !!errors.fullName?.message || false

                        return (
                            <FormControl isInvalid={invalid} mb={2}>
                                <Input
                                    onChangeText={onChange}
                                    value={value}
                                    autoCapitalize="words"
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
                                    placeholder="Full name"
                                    mb={4}
                                    _focus={{
                                        bg: "gray.700",
                                        borderWidth: 1.5,
                                        borderColor: "orange.700"
                                    }}
                                />

                                <FormControl.ErrorMessage>
                                    {errorMessage}
                                </FormControl.ErrorMessage>
                            </FormControl>
                        )
                    }}
                />

                <Controller
                    name="username"
                    control={control}
                    render={({ field: { onChange, value } }) => {

                        const errorMessage = errors.username?.message || "erro"
                        const invalid = !!errors.username?.message || false

                        return (

                            <FormControl isInvalid={invalid} mb={2}>
                                <Input
                                    onChangeText={onChange}
                                    value={value}
                                    autoCapitalize="none"
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
                                    placeholder="Username"
                                    mb={4}
                                    _focus={{
                                        bg: "gray.700",
                                        borderWidth: 1.5,
                                        borderColor: "orange.700"
                                    }}

                                />

                                <FormControl.ErrorMessage>
                                    {errorMessage}
                                </FormControl.ErrorMessage>

                            </FormControl>

                        )
                    }}
                />

                <Controller
                    name="email"
                    control={control}
                    render={({ field: { onChange, value } }) => {
                        const errorMessage = errors.email?.message || "erro"
                        const invalid = !!errors.email?.message || false

                        return (
                            <FormControl isInvalid={invalid} mb={2}>
                                <Input
                                    onChangeText={onChange}
                                    value={value}
                                    keyboardType="email-address"
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
                                <FormControl.ErrorMessage>
                                    {errorMessage}
                                </FormControl.ErrorMessage>

                            </FormControl>
                        )
                    }}
                />

                <Controller
                    name="password"
                    control={control}
                    render={({ field: { onChange, value } }) => {

                        const errorMessage = errors.password?.message || "erro"
                        const invalid = !!errors.password?.message || false

                        return (

                            <FormControl isInvalid={invalid} mb={2}>
                                <Input
                                    onChangeText={onChange}
                                    value={value}
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
                                    placeholder="Password"
                                    mb={4}
                                    _focus={{
                                        bg: "gray.700",
                                        borderWidth: 1.5,
                                        borderColor: "orange.700"
                                    }}

                                />

                                <FormControl.ErrorMessage>
                                    {errorMessage}
                                </FormControl.ErrorMessage>
                            </FormControl>
                        )
                    }}
                />

                <Controller
                    name="passwordAgain"
                    control={control}
                    render={({ field: { onChange, value } }) => {

                        const errorMessage = errors.passwordAgain?.message || "erro"
                        const invalid = !!errors.passwordAgain?.message || false

                        return (
                            <FormControl isInvalid={invalid} mb={2}>
                                < Input
                                    onChangeText={onChange}
                                    value={value}
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
                                    placeholder="Password again"
                                    mb={4}
                                    _focus={{
                                        bg: "gray.700",
                                        borderWidth: 1.5,
                                        borderColor: "orange.700"
                                    }}

                                />
                                <FormControl.ErrorMessage>
                                    {errorMessage}
                                </FormControl.ErrorMessage>
                            </FormControl>
                        )
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

                    onPress={handleSubmit(onSubmit)}

                >
                    <Text
                        fontFamily="heading"
                        fontSize='xl'
                    >
                        Register
                    </Text>
                </Button>


                <Button
                    px={8}
                    mt={16}


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

                        onPress={handleToGoSignln}

                    >
                        Already have an account?
                    </Text>

                </Button>
            </VStack>
        </ScrollView >
    )
}