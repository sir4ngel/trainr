import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ToastAndroid } from 'react-native';
import colors from '../../../../assets/Colors';
import { ClassroomContext } from '../../../utils/context/ClassroomContext';
import { CredentialsContext } from '../../../utils/context/CredentialsContext';
import { LoadingContext } from '../../../utils/context/LoadingContext';
import classroomHandler from '../../../utils/handlers/ClassroomHandler';

const ClassroomAddView = (props) => {
    const [code, setCode] = useState("");
    const {loading, setLoading} = useContext(LoadingContext);
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const { classrooms, setClassrooms } = useContext(ClassroomContext)

    const onGetClassrooms = async () => {
        var classroomData = await classroomHandler.onGetClassrooms(storedCredentials.user.id, storedCredentials.token);
        if (classroomData.status) {
            if (classroomData.status !== 'SUCCESS') {
                ToastAndroid.show(classroomData.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
                props.navigation.goBack();
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
                setClassrooms(classroomData.reverse());
                props.navigation.goBack();
                setLoading(false);
                // console.log(classroomData);
            }
        } else {
            ToastAndroid.show('Ocurrió un error', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
            props.navigation.goBack();
            setLoading(false);
            console.log(classroomData.message);
        }
    };

    const onHandleJoinButton = async () => {
        if (!code) {
            ToastAndroid.show('Escribe un código para continuar', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
        }
        else {
            try {
                const data = {
                    code: code,
                    user_id: storedCredentials.user.id
                }
                const classroomData = await classroomHandler.onEnterClassroom(data, storedCredentials.token);
                if (classroomData.status) {
                    if (classroomData.status === 'ERROR') {
                        ToastAndroid.show(classroomData.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
                        props.navigation.goBack();
                    } else {
                        ToastAndroid.show(classroomData.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
                        setLoading(true);
                        onGetClassrooms();
                    }
                } else {
                    ToastAndroid.show('Ocurrió algun error', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
                    console.log(classroomData);
                }
            } catch (error) {
                ToastAndroid.show('Ocurrió algun error', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
                console.log(error);
            }
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <View style={{ paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 15 }}>
                    <TouchableOpacity onPress={props.navigation.goBack} style={{ height: 30, width: 30, backgroundColor: colors.background, borderRadius: 15, elevation: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ height: '70%', width: '70%' }} source={require('../../../../assets/icons/close.png')} resizeMode={'contain'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onHandleJoinButton} style={{ backgroundColor: colors.primaryTitle, borderRadius: 5, elevation: 5, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                        <Text style={{ color: colors.white, fontFamily: 'Montserrat-ExtraBold' }}>Unirse</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ marginBottom: 20, color: colors.primaryTitle, fontSize: 25, fontFamily: 'Montserrat-ExtraBold' }}>Unirse a una clase</Text>
                <TextInput onChangeText={(value) => setCode(value)} style={{ borderWidth: 1, backgroundColor: '#F3F3F3', borderColor: '#F5F5F5', paddingHorizontal: 20, color: colors.primaryTitle, fontFamily: 'Montserrat-Medium' }} placeholder={'Código de la clase'} placeholderTextColor={'gray'} />
                <Text style={{ color: colors.primaryTitle, fontFamily: 'Montserrat-Regular', marginBottom: 20 }}>Tu Trainer deberá proporcionarte el código de clase para poder unirte.</Text>
            </View>
        </View>
    );
}

export default ClassroomAddView;