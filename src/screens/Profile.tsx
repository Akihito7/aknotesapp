import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import {
    HStack,
    VStack,
    Image,
    Input,
    Button,
    Text,
    Toast,
    FormControl,
    ScrollView
} from "native-base";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { useAuth } from "../contexts/AuthContext";

import { api } from "../services/axios";
import { useForm, Controller } from "react-hook-form"
import * as yup from "yup";

import { THEME } from "../theme";
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import PasswordSvg from "../../assets/Senha.svg";
import NomeSvg from "../../assets/Nome.svg";
import EmailSvg from "../../assets/E-mail.svg";

import profile from "../../assets/profile.png"
import AppError from "../utils/AppError";
import { yupResolver } from "@hookform/resolvers/yup";


type PasswordProps = {
    currentPassword: string;
    newPassword: string;
}
export function Profile() {

    const Schema = yup.object().shape({
        currentPassword: yup.string().min(6, "A senha deve conter no minimo 6 dígitos").required("O campo não pode estar vazio"),
        newPassword: yup.string().min(6, "A senha deve conter no minimo 6 dígitos").required("O campo não pode estar vazio")
    })
    const { user, setImage, image } = useAuth();

    const { control,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(Schema) });

    async function handleUpdatePassword({ currentPassword, newPassword }: PasswordProps) {
        try {
            await api.put("/user/update", {
                currentPassword,
                newPassword,
            });

            Toast.show({
                title: "Senha atualizada",
                duration: 3000,
                bg: THEME.colors.orange[700],
                placement: "top",
            })


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
    };

    async function pickImage() {
        let newPhoto = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            allowsMultipleSelection: false,
            aspect: [4, 4],
            quality: 1,
        })

        if (newPhoto.canceled) return;

        if (newPhoto?.assets && newPhoto.assets[0]?.uri) {

            const { uri } = newPhoto.assets[0];

            const photoInfo = await FileSystem.getInfoAsync(uri);

            if (photoInfo.size && (photoInfo.size / 1024) / 1024 > 5) {

                return Toast.show({
                    title: "Imagem muito grande, escolha uma imagem até 5MB",
                    placement: 'top',
                    bgColor: 'red.500',
                })
            }

            const fileExtension = uri.split('.').pop();

            const photoFile = {
                name: `${user!.name.split(" ").pop()}.${fileExtension}`.toLocaleLowerCase(),
                uri,
                type: `${newPhoto.assets[0].type}/${fileExtension}`
            } as any;

            const userPhotoFormUpload = new FormData();
            userPhotoFormUpload.append('avatar', photoFile);

            await api.patch('/user/avatar', userPhotoFormUpload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setImage();

        }
    }

    async function handleUpdateAvatar() {
        const response = await api.get("/user/avatar");
        setImage(response.data)
    }

    useEffect(() => {
        handleUpdateAvatar();
    }, [image])

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}

        >
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

                    <VStack
                        position="absolute"
                        bottom="100%"
                    >

                        <Image
                            source={{ uri: image ? `https://drive.google.com/uc?id=${image}` : "https://cdn-icons-png.flaticon.com/512/1077/1077114.png" }}
                            borderRadius={99}
                            height={32}
                            width={32}
                            resizeMode="contain"
                            alt="foto de perfil"
                        />



                        <TouchableOpacity
                            onPress={pickImage}
                            style={{
                                position: "absolute",
                                bottom: "0%",
                                right: "-5%",
                            }}
                        >
                            <MaterialIcons name="add-photo-alternate"
                                size={40}
                                color={THEME.colors.orange[700]}
                            />
                        </TouchableOpacity>

                    </VStack>




                    <HStack
                        alignItems="center"
                        height={65}
                        bg="gray.700"
                        borderColor="transparent"
                        borderWidth={2}
                        borderRadius={10}
                        mb={4}
                        px={5}
                        mt={24}
                    >
                        <NomeSvg height={24} width={24} />

                        <Input
                            flex={1}
                            bg="gray.700"
                            borderColor="transparent"
                            fontFamily="body"
                            fontSize="sm"
                            color="white.100"
                            placeholderTextColor="gray.300"
                            value={user?.name}
                            isReadOnly={true}
                        />

                    </HStack>

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

                        <EmailSvg height={24} width={24} />
                        <Input
                            flex={1}
                            bg="gray.700"
                            borderColor="transparent"
                            fontFamily="body"
                            fontSize="sm"
                            color="white.100"
                            placeholderTextColor="gray.300"
                            value={user?.email}
                            isReadOnly={true}
                        />

                    </HStack>

                    <Controller
                        name="currentPassword"
                        control={control}
                        render={({ field: { onChange, value } }) => {

                            const message = errors.currentPassword?.message || "Erro, tente novamente";

                            const invalid = !!errors.currentPassword?.message || false;

                            return (

                                <FormControl isInvalid={invalid} >

                                    <HStack
                                        alignItems="center"
                                        height={65}
                                        bg="gray.700"
                                        borderColor={invalid ? "red.700" : "transparent"}
                                        borderWidth={2}
                                        borderRadius={10}
                                        mb={4}
                                        px={5}
                                        mt={8}
                                    >
                                        < PasswordSvg width={24} height={24} />

                                        <Input
                                            flex={1}
                                            onChangeText={onChange}
                                            value={value}
                                            borderWidth={0}
                                            type="password"
                                            bg="gray.700"

                                            fontFamily="body"
                                            fontSize="sm"
                                            color="white.100"
                                            placeholderTextColor="gray.300"
                                            placeholder="Current password"

                                            _focus={{
                                                bg: "gray.700",
                                                borderColor: "gray.700"
                                            }}

                                        />

                                    </HStack>
                                    <FormControl.ErrorMessage mt={-2} mb={2}>
                                        {message}
                                    </FormControl.ErrorMessage>
                                </FormControl>
                            )
                        }}
                    />

                    <Controller
                        name="newPassword"
                        control={control}
                        render={({ field: { onChange, value } }) => {

                            const message = errors.newPassword?.message || "Erro, tente novamente"

                            const invalid = !!errors.newPassword?.message || false

                            return (

                                <FormControl isInvalid={invalid}>
                                    <HStack
                                        alignItems="center"
                                        height={65}
                                        bg="gray.700"
                                        borderColor={invalid ? "red.700" : "transparent"}
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
                                            type="password"
                                            bg="gray.700"
                                            borderWidth={0}
                                            fontFamily="body"
                                            fontSize="sm"
                                            color="white.100"
                                            placeholderTextColor="gray.300"
                                            placeholder="New password"

                                            _focus={{
                                                bg: "gray.700",
                                                borderColor: "gray.700"
                                            }}

                                        />
                                    </HStack>

                                    <FormControl.ErrorMessage mt={-2} mb={2}>
                                        {message}
                                    </FormControl.ErrorMessage>
                                </FormControl>
                            )
                        }}
                    />


                    <Button
                        onPress={handleSubmit(handleUpdatePassword)}
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

            </VStack >
        </ScrollView >
    )
}