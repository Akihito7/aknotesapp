import { VStack, Spinner } from "native-base"

export function SpinnerLoading() {
    return (
        <VStack
            flex={1}
            alignItems="center"
            justifyContent="center"
        >
            <Spinner
               size={50}
            />
        </VStack>
    )

}