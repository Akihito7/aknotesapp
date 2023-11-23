import { TouchableOpacity } from "react-native";
import {
    VStack,
    Text,
    Link,
    HStack,
    Button,
    ScrollView

} from "native-base";

import { useRoute, useNavigation } from "@react-navigation/native"

import { Header } from "../components/Header";
import { Tag } from "../components/Tag";
import { useEffect, useState } from "react";
import { api } from "../services/axios";


type PropsNote = {
    id: string;
    name: string;
    description: string;
}

type PropsItem = {
    note: PropsNote,
    links: [{ url: string; }]
    tags: [{ name: string }]
}

export function Details() {

    const { navigate } = useNavigation();
    const route = useRoute();
    const { noteId } = route.params;

    const [item, setItem] = useState<PropsItem>();

    async function getNote() {
        try {
            const response = await api.get(`/notes/unique-note/${noteId}`)
            console.log(response.data.links);
            setItem(response.data);
        } catch (error) {
            console.log(error)
        }
    };

    async function handleDeleteNote() {
        try {
            await api.delete(`/notes/${noteId}`);
            navigate("home");
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getNote();

    }, [noteId])
    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}

        >
            <VStack
                flex={1}
                bg="gray.700"
            >
                <Header />

                <VStack
                    flex={1}
                    px={8}
                    py={8}
                >
                    <TouchableOpacity
                        onPress={handleDeleteNote}
                    >
                        <Text
                            alignSelf="flex-end"
                            color="orange.700"
                            fontSize={14}
                            fontFamily="body"
                        >
                            Excluir nota</Text>
                    </TouchableOpacity>

                    <Text
                        color="white.100"
                        fontSize={20}
                        fontFamily="heading"
                        mb={8}
                        mt={10}
                    >
                        {item?.note.name}
                    </Text>

                    <Text
                        color="white.100"
                        fontSize={16}
                        fontFamily="heading"
                    >
                        {item?.note.description}
                    </Text>

                    <Text
                        fontFamily="body"
                        fontSize={16}
                        color={"gray.100"}
                        mt={8}
                    >
                        Link úteis
                    </Text>

                    <HStack
                        bg="gray.300"
                        style={{ height: 1 }}
                        mt={4}
                        mb={6}
                    />

                    {
                        item?.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url}
                                mb={2}
                                _text={{
                                    color: "white.100",
                                    fontSize: 12,
                                    fontFamily: "body",
                                }}

                            >
                                {link.url}

                            </Link>

                        ))
                    }


                    <Text
                        fontFamily="body"
                        fontSize={16}
                        color={"gray.100"}
                        mt={8}
                    >
                        Marcadores
                    </Text>

                    <HStack
                        bg="gray.300"
                        style={{ height: 1 }}
                        mt={4}
                        mb={6}
                    />

                    <HStack
                        flexWrap={"wrap"}

                    >
                        {
                            item?.tags.map((tag, index) => (
                                <Tag
                                    key={index}
                                    name={tag.name}
                                    size="g"
                                    mb={3}
                                />
                            ))
                        }
                    </HStack>

                    <Button
                        alignItems="center"
                        justifyContent="center"
                        mt={8}
                        width="90%"
                        alignSelf="center"
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
                            Voltar
                        </Text>
                    </Button>
                </VStack>
            </VStack>
        </ScrollView>


    )
}