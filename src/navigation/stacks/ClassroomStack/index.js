import React, { useContext, useState, useEffect } from "react";
import { ToastAndroid } from 'react-native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ClassroomAddView from "../../../views/classroom/Add";
import { CredentialsContext } from "../../../utils/context/CredentialsContext";
import { LoadingContext } from "../../../utils/context/LoadingContext";
import { ClassroomContext } from "../../../utils/context/ClassroomContext";
import classroomHandler from "../../../utils/handlers/ClassroomHandler";
import ClassroomView from "../../../views/classroom";
import ClassroomRoutineView from "../../../views/classroom/Routine";

const ClassroomStackNavigator = createNativeStackNavigator();
const ClassroomStack = ({ navigation }) => {
    const [classrooms, setClassrooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

    useEffect(() => {
        onGetClassrooms();
        return () => {

        }
    }, []);

    const onGetClassrooms = async () => {
        var classroomData = await classroomHandler.onGetClassrooms(storedCredentials.user.id, storedCredentials.token);
        if (classroomData.status) {
            if (classroomData.status !== 'SUCCESS') {
                ToastAndroid.show(classroomData.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
                setLoading(false);
            } else {
                classroomData = classroomData.data.map((item, index) => {
                    if (index === 0) {
                        return ({
                            id: item.id,
                            code: item.code,
                            name: item.name,
                            isSelected: true,
                            image: require('../../../../assets/images/calistenia.jpg')
                        })
                    } else {
                        return ({
                            id: item.id,
                            code: item.code,
                            name: item.name,
                            isSelected: false,
                            image: require('../../../../assets/images/calistenia.jpg')
                        })
                    }
                });
                
                // console.log(classroomData);
                setClassrooms(classroomData.reverse())
                setLoading(false);
                // console.log(classroomData);
            }
        } else {
            ToastAndroid.show('Ocurrió un error', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
            setLoading(false);
            console.log(classroomData.message);
        }
    };

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            <ClassroomContext.Provider value={{ classrooms, setClassrooms }}>
                <ClassroomStackNavigator.Navigator
                    screenOptions={{
                        headerShown: false
                    }}>
                    <ClassroomStackNavigator.Screen name="ClassroomIndexView" component={ClassroomView} />
                    <ClassroomStackNavigator.Screen name="ClassroomAddView" component={ClassroomAddView} />
                    <ClassroomStackNavigator.Screen name="ClassroomRoutineView" component={ClassroomRoutineView} />
                </ClassroomStackNavigator.Navigator>
            </ClassroomContext.Provider>
        </LoadingContext.Provider>
    );
};

export default ClassroomStack;