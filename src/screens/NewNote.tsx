import { useState } from "react";
import { TouchableOpacity } from "react-native";
import {
    VStack,
    HStack,
    Text,
    Input,
    TextArea,
    Button,
    ScrollView,
    Toast,
    FormControl,
} from "native-base";

import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";

import { Controller, useForm, } from "react-hook-form"

import { Header } from "../components/Header";
import { Markers } from "../components/Markers";
import { AntDesign } from '@expo/vector-icons';
import { THEME } from "../theme";

import { api } from "../services/axios";
import AppError from "../utils/AppError";
import { useAuth } from "../contexts/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";

type PropsNote = {
    name: string;
    comments: string;
    links: [string];
    tags: [string];
};



export function NewNote() {
    const Schema = yup.object().shape({
        name: yup.string().required("Preencha o titulo"),
        comments: yup.string().required("Preencha a observações"),
    });

    const {
        control,
        handleSubmit,
        getValues,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(Schema)
    });

    const [importantLinks, setImportantLinks] = useState([]);
    const [tags, setTags] = useState([]);

    const { user } = useAuth();

    const { navigate } = useNavigation();


    function handleSaveLink(link: string) {
        setImportantLinks(prevState => [...prevState, link]);
        setValue("newLink", "");
    };

    function handleSaveTag(name: string) {
        setTags(prevState => [...prevState, name]);
        setValue("newMarker", "");
    };

    async function handleSaveNote({ name, comments }: PropsNote) {

        try {
            await api.post("/notes", {
                user_id: user?.id,
                name,
                description: comments,
                links: importantLinks,
                tags
            })

            reset();
            setImportantLinks([]);
            setTags([]);

            Toast.show({
                title: "Nota cadastrada",
                duration: 1000,
                backgroundColor: THEME.colors.orange[700],
            })

            navigate("home");

            navigate


        } catch (error) {
            if (error instanceof AppError) {
                Toast.show({
                    title: error.message,
                    duration: 3000,
                    bg: "red.700",
                    placement: "top",
                })
            }
            else {
                Toast.show({
                    title: "Erro interno",
                    duration: 3000,
                    bg: "red.700",
                    placement: "top",
                })
            }
        }
    }

    return (
        <VStack
            flex={1}
            bg="gray.700"
        >
            <Header />

            <VStack
                flex={1}
                mt={12}
                px={8}
                py={8}
                borderTopRadius={50}
                bg="gray.500"

            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}

                >
                    <HStack
                        alignItems="center"
                        justifyContent="space-between"
                        mb={8}
                    >
                        <Text
                            fontSize={20}
                            fontFamily="bodyRobotoSlabMedium"
                            color="white.100"
                        >
                            Criar nota
                        </Text>

                        <TouchableOpacity>
                            <Text color="gray.100">
                                Voltar
                            </Text>
                        </TouchableOpacity>
                    </HStack>

                    <Controller
                        name="name"
                        control={control}
                        render={({ field: { onChange, value } }) => {

                            const message = errors.name?.message || "Algo deu errado no campo titulo, tente novamente";

                            const invalid = !!errors.name?.message || false

                            return (
                                <FormControl isInvalid={invalid}>

                                    <Input
                                        onChangeText={onChange}
                                        value={value}
                                        bg="gray.700"
                                        borderWidth={2}
                                        borderColor="transparent"
                                        borderRadius={10}
                                        height={55}
                                        fontFamily="body"
                                        fontSize="sm"
                                        px={5}
                                        color="white.100"
                                        placeholderTextColor="gray.300"
                                        placeholder="Titulo"
                                        mb={4}
                                        _focus={{
                                            bg: "gray.700",
                                            borderWidth: 1.5,
                                            borderColor: "orange.700"
                                        }}

                                    />

                                    <FormControl.ErrorMessage mt={-2} mb={2}>
                                        {message}
                                    </FormControl.ErrorMessage>
                                </FormControl>
                            )
                        }}
                    />

                    <Controller
                        name="comments"
                        control={control}
                        render={({ field: { onChange, value } }) => {

                            const message = errors.comments?.message || "Algo deu errado nas observações, tente novamente";

                            const invalid = !!errors.comments?.message || false

                            return (
                                <FormControl isInvalid={invalid}>

                                    <TextArea
                                        onChangeText={onChange}
                                        value={value}
                                        bg="gray.700"
                                        borderWidth={2}
                                        borderColor="transparent"
                                        borderRadius={10}
                                        fontFamily="body"
                                        fontSize="sm"
                                        h={100}
                                        autoCompleteType={false}
                                        px={5}
                                        color="white.100"
                                        placeholderTextColor="gray.300"
                                        placeholder="Observações"
                                        _focus={{
                                            bg: "gray.700",
                                            borderWidth: 1.5,
                                            borderColor: "orange.700"
                                        }}

                                    />

                                    <FormControl.ErrorMessage mb={2} >
                                        {message}
                                    </FormControl.ErrorMessage>

                                </FormControl>

                            )
                        }}
                    />


                    <Text
                        mt={8}
                        fontFamily="body"
                        fontSize={16}
                        color="gray.100"
                    >
                        Links úteis
                    </Text>

                    <VStack
                        bg="gray.300"
                        mt={4}
                        mb={6}
                        style={{
                            height: 1,
                        }}>

                    </VStack>

                    {
                        importantLinks.map((link, index) => (
                            <Input
                                key={index}
                                bg="gray.700"
                                borderWidth={2}
                                borderColor="transparent"
                                borderRadius={10}
                                height={55}
                                fontFamily="body"
                                fontSize="sm"
                                px={5}
                                color="white.100"
                                placeholderTextColor="gray.300"
                                placeholder="Titulo"
                                mb={4}
                                value={link}
                                isReadOnly={true}

                                _focus={{
                                    bg: "gray.700",
                                    borderWidth: 1.5,
                                    borderColor: "orange.700"
                                }}

                            />

                        ))
                    }



                    <HStack mb={8}>
                        <Controller
                            name="newLink"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    onChangeText={onChange}
                                    value={value}
                                    borderStyle="dashed"
                                    borderWidth={2}
                                    //isReadOnly={true}
                                    placeholder="Novo link"
                                    fontSize="sm"
                                    color="white.100"
                                    px={5}
                                    position="relative"
                                    flex={1}

                                    _focus={{
                                        bg: "gray.500",
                                        borderWidth: 1.5,
                                        borderColor: "orange.700"
                                    }}
                                />

                            )}
                        />

                        <TouchableOpacity

                            onPress={() => {
                                handleSaveLink(getValues("newLink"));
                            }}

                            style={{
                                position: "absolute",
                                right: "5%",
                                top: "25%",
                            }}
                        >

                            <AntDesign
                                name="plus"
                                size={24}
                                color="yellow"
                            />
                        </TouchableOpacity>



                    </HStack>

                    <Text
                        fontFamily="body"
                        fontSize={16}
                        color="gray.100"
                    >
                        Marcadores
                    </Text>

                    <VStack
                        bg="gray.300"
                        mt={4}
                        mb={6}
                        style={{
                            height: 1,
                        }}
                    />

                    <HStack flexWrap="wrap">

                        {
                            tags.map((tag, index) => (
                                <Markers
                                    tag={tag}
                                    key={index}
                                />
                            ))
                        }

                        <HStack>
                            <Controller
                                name="newMarker"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        flexWrap="wrap"
                                        onChangeText={onChange}
                                        value={value}
                                        bg="gray.500"
                                        borderWidth={1.5}
                                        borderColor="white.100"
                                        borderRadius={6}
                                        px={2}
                                        py={1}
                                        fontFamily="body"
                                        fontSize="sm"
                                        width={48}
                                        color="white.100"
                                        placeholderTextColor="gray.100"
                                        placeholder="Novo marcador"
                                        borderStyle="dashed"

                                        mb={4}
                                        _focus={{
                                            bg: "gray.500",
                                            borderWidth: 1.5,
                                            borderColor: "orange.700"
                                        }}

                                    />
                                )}

                            />
                            <TouchableOpacity
                                onPress={() => {
                                    handleSaveTag(getValues("newMarker"))
                                }}

                                style={{
                                    position: "absolute",
                                    right: "5%",
                                    top: "15%",
                                }}
                            >

                                <AntDesign
                                    name="plus"
                                    size={24}
                                    color="yellow"
                                />
                            </TouchableOpacity>



                        </HStack>

                    </HStack>
                    <Button
                        onPress={handleSubmit(handleSaveNote)}
                        alignItems="center"
                        justifyContent="center"
                        alignSelf="center"
                        mt={8}
                        width="90%"
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
                            Salvar
                        </Text>
                    </Button>

                </ScrollView>
            </VStack>
        </VStack >
    )
}