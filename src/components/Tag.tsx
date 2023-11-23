import { VStack, Text } from "native-base";

type TagProps = {
    name : string;
    size?: "m" | "g";
    mb? : number;
}
export function Tag({ name, size = "m" , ...rest}: TagProps) {

    const fontsSize = {
        "m": 12,
        "g": 16,
    };

    return (
        <VStack
            px={4}
            mr={3}
            borderRadius={5}
            bg="orange.700"
            {...rest}
        >
            <Text
                textAlign="center"
                fontFamily="bodyRobotoSlabMedium"
                fontSize={fontsSize[size]}

            >
                {name}
            </Text>
        </VStack>
    )
}