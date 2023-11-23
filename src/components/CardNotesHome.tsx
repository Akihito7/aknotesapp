import { TouchableOpacity } from "react-native";

import {
    VStack,
    Text,
    HStack,

} from "native-base"
import { Tag } from "./Tag"


type PropsNote = {
    id: string;
    name: string;
    description: string;
};

type PropsItem = {
    item: {
        note: PropsNote;
        tags: [{
            name: string;
        }]
    },

    onPress: (id: string) => void;
}

export function CardNotesHeader({ item, onPress }: PropsItem) {
    return (
        <TouchableOpacity style={{
            width: "100%"
        }}
            onPress={() => onPress(item.note.id)}
        >
            <VStack
                py={2}
                px={8}
                borderRadius={10}
                bg="gray.400"
                mb={4}

            >
                <Text
                    fontFamily="heading"
                    fontSize={16}
                    color="white.100"
                >
                    {item.note.name}
                </Text>

                <HStack mt={2} pb={2}>

                    {
                        item.tags.map((tag, index) => (
                            <Tag
                                key={index}
                                name={tag.name}
                            />
                        ))
                    }

                </HStack>

            </VStack>
        </TouchableOpacity>
    )
}