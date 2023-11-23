import { Touchable, TouchableOpacity } from "react-native";
import { HStack, Text } from "native-base";
import { AntDesign } from '@expo/vector-icons';


type PropsMarkers = {
    tag : string;
};

export function Markers({ tag } : PropsMarkers) {
    return (
        <TouchableOpacity>
            <HStack
                bg="gray.700"
                px={2}
                py={1}
                borderRadius={6}
                alignItems={"center"}
                mr={4}
                borderColor="gray.700"
                borderWidth={2}
                mb={3}
            >
                <Text
                    fontSize={14}
                    fontFamily="body"
                    color="white.100"
                    mr={2}
                >
                    {tag}
                </Text>
                <AntDesign name="close" size={24} color="red" />
            </HStack>
        </TouchableOpacity>
    )
}