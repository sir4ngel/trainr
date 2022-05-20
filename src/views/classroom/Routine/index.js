import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, Linking, ToastAndroid } from 'react-native';
import colors from '../../../../assets/Colors';
import { CredentialsContext } from '../../../utils/context/CredentialsContext';
import routineHandler from '../../../utils/handlers/RoutineHandler';

const ClassroomRoutineView = (props) => {
    const [today, setToday] = useState(new Date().getFullYear() + '/' + (new Date().getMonth() + 1).toString().padStart(2, '0') + '/' + new Date().getDate().toString().padStart(2, '0'));
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const [routine, setRoutine] = useState({});
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getRoutine();
        return () => {
        }
    }, [])

    const getRoutine = async () => {
        const data = {
            user_id: storedCredentials.user.id,
            date: today,
            classroom_id: props.route.params.classroom_id
        }
        const routineData = await routineHandler.onGetRoutine(data, storedCredentials.token);
        if (routineData.status) {
            if (routineData.status !== 'SUCCESS') {
                setLoading(false);
            } else {
                setRoutine(routineData.data.pivot);
                setExercises(JSON.parse(routineData.data.pivot.exercises));
                console.log(routineData.data.pivot.exercises);
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    const goToURI = (URI) => {
        try {
            Linking.openURL(URI).catch((error) => console.log(error));
        } catch (error) {
            ToastAndroid.show(error, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
        }
    };

    const onRenderExerciseItem = ({ item }) => (
        <View style={{ marginBottom: 10, backgroundColor: colors.white, elevation: 2, justifyContent: 'center', padding: 10, borderRadius: 10, marginHorizontal: 10 }}>
                <View>
                    <Text style={{ color: colors.primaryTitle, fontFamily: 'Montserrat-Medium' }}>{item.name}</Text>
                    <Text style={{ color: colors.primaryTitle, fontFamily: 'Montserrat-Medium' }}>{item.pivot.reps} reps x {item.pivot.sets} series</Text>
                    {
                        JSON.parse(item.pivot.weights).map((item, index) => (
                            <Text key={index} style={{ color: colors.primaryTitle, fontFamily: 'Montserrat-Medium' }}>{item.weight === -1 ? 'Bodyweight' : item.weight === 0 ? 'Sin peso' : item.weight + item.unity}</Text>
                        ))
                    }
                </View>
                <TouchableOpacity style={{ position: 'absolute', right: 0, backgroundColor: 'white', elevation: 3, borderRadius: 30, padding: 10, marginRight: 10}} onPress={() => goToURI(item.url)}>
                    <Image style={{ height: 15, width: 15 }} source={require('../../../../assets/icons/play.png')} resizeMode={'contain'} />
                </TouchableOpacity>
        </View>
    )

    if (loading) {
        return (
            <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center', }}>
                <ActivityIndicator color={colors.darkText} size={'large'} />
            </View>
        );
    }
    return (
        <View style={{ flex: 1, backgroundColor: colors.background, paddingHorizontal: 10 }}>
            <View style={{ marginHorizontal: 10}}>
                <TouchableOpacity onPress={props.navigation.goBack} style={{ height: 30, width: 30, backgroundColor: colors.white, borderRadius: 15, elevation: 5, justifyContent: 'center', alignItems: 'center', marginVertical: 15 }}>
                    <Image style={{ height: '70%', width: '70%' }} source={require('../../../../assets/icons/close.png')} resizeMode={'contain'} />
                </TouchableOpacity>
            </View>
            <Text style={{ color: colors.primaryTitle, fontFamily: 'Montserrat-Bold', fontSize: 22, marginBottom: 10, marginHorizontal: 10 }}>{routine.name}</Text>
            {
                exercises.length > 0 ?
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={exercises}
                        renderItem={onRenderExerciseItem}
                        keyExtractor={(item, index) => index}
                    /> :
                    <Text style={{ color: colors.primaryTitle }}>No tienes asignada una rutina</Text>
            }
        </View>
    );
}

export default ClassroomRoutineView;