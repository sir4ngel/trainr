import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ClassroomStack from "../ClassroomStack";

const HomeStackNavigator = createNativeStackNavigator();
const HomeStack = ({ navigation }) => {

    return (
        <HomeStackNavigator.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <HomeStackNavigator.Screen name="HomeIndexView" component={ClassroomStack} />
        </HomeStackNavigator.Navigator>
    );
};

export default HomeStack;