import { NativeBaseProvider } from "native-base";
import { THEME } from "./src/theme";

import { useFonts } from "expo-font";
import { Roboto_400Regular } from "@expo-google-fonts/roboto";

import {
  RobotoSlab_400Regular,
  RobotoSlab_500Medium,
  RobotoSlab_700Bold,
} from "@expo-google-fonts/roboto-slab";

import { Routes } from "./src/routes"
import { SpinnerLoading } from "./src/components/SpinnerLoading";

import { AuthContextProvider } from "./src/contexts/AuthContext";

export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    RobotoSlab_400Regular,
    RobotoSlab_500Medium,
    RobotoSlab_700Bold,

  });



  return (
    <NativeBaseProvider theme={THEME}>

      <AuthContextProvider>
        {
          fontsLoaded ? <Routes /> : <SpinnerLoading />
        }
      </AuthContextProvider>
    </NativeBaseProvider>

  );
}
