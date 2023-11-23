import { extendTheme } from "native-base";

export const THEME = extendTheme({
    colors: {
        gray: {
            700: "#232129",
            500: "#312E38",
            400 :"#3E3B47",
            300: "#666360",
            100: "#999591",
        },

        orange: {
            700: "#FF9000"
        },

        white: {
            100: "#F4EDE8"
        }
    },

    fonts : {
        heading : "RobotoSlab_700Bold",
        body: "RobotoSlab_400Regular",
        bodyRobotoSlabMedium : "RobotoSlab_500Medium",

    },

    fontSizes: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 20,
        gg : 30,
    },
});