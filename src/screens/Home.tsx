import { TouchableOpacity } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
    VStack,
    Input,
    Text,
    FlatList,
    Toast,
} from "native-base";

import { Header } from "../components/Header";
import { CardNotesHeader } from "../components/CardNotesHome";
import PlusSvg from "../../assets/plus.svg"

import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/axios";
import { useNavigation } from "@react-navigation/native"
import AppError from "../utils/AppError";
import { THEME } from "../theme";

type PropsItem = {
    note: {
        id: string;
        name: string;
        description: string;
    },
    tags: [{
        name: string;
    }]
}

export function Home() {

    const { user } = useAuth();
    const [notes, setNotes] = useState<PropsItem[]>([]);

    const { navigate } = useNavigation();

    async function getNotes() {
        try {
            const response = await api.get(`/notes/${user?.id}`);
            setNotes(response.data)
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

    function handleToGoDetaislNote(noteId: string) {
        navigate("details", {
            noteId
        });
    }
    
    function handleToGoNewNote(){
        navigate("newNote");
    }

    useFocusEffect(useCallback(() => {
        getNotes();
    }, []));

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
                alignItems="center"
                bg="gray.500"
            >
                <Input
                    bg="gray.700"
                    borderWidth={2}
                    borderColor="transparent"
                    borderRadius={10}
                    height={50}
                    fontFamily="body"
                    fontSize="sm"
                    px={5}
                    color="white.100"
                    placeholderTextColor="gray.300"
                    placeholder="Pesquise pelo título"
                    _focus={{
                        bg: "gray.700",
                        borderWidth: 1.5,
                        borderColor: "orange.700"
                    }}

                />

                <Text
                    mt={8}
                    color="white.100"
                    fontFamily="body"
                    fontSize="md"
                    mb={6}

                >
                    Links importantes
                </Text>

                <FlatList
                    data={notes}
                    keyExtractor={item => item.note.id}
                    renderItem={({ item }) => (

                        <CardNotesHeader
                            onPress={handleToGoDetaislNote}
                            item={item}
                        />
                    )}



                    w="full"
                    showsVerticalScrollIndicator={false}

                />

                <TouchableOpacity
                    onPress={handleToGoNewNote}
                    style={{
                    width : 64,
                    height : 64,
                    borderRadius : 99,
                    backgroundColor : THEME.colors.orange[700],
                    alignItems : "center",
                    justifyContent : "center",
                    position : "absolute",
                    bottom : "7%",
                    right : "7%"

                    }}
                
                >
                    <PlusSvg width={24} height={24} />
                </TouchableOpacity>

            </VStack>

        </VStack>
    )
}