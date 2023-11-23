import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
    VStack,
    Input,
    Text,
    FlatList
} from "native-base";

import { Header } from "../components/Header";
import { CardNotesHeader } from "../components/CardNotesHome";

import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/axios";
import { useNavigation } from "@react-navigation/native"

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
            console.log(error)
        }
    }

    function handleToGoDetaislNote(noteId: string) {
        navigate("details", {
            noteId
        });
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


            </VStack>

        </VStack>
    )
}