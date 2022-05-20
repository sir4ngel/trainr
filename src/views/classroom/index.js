import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, FlatList, RefreshControl, Pressable, ActivityIndicator, ToastAndroid } from 'react-native';
import colors from '../../../assets/Colors';
import { ClassroomContext } from '../../utils/context/ClassroomContext';
import { CredentialsContext } from '../../utils/context/CredentialsContext';
import { LoadingContext } from '../../utils/context/LoadingContext';
import classroomHandler from '../../utils/handlers/ClassroomHandler';
import routineHandler from '../../utils/handlers/RoutineHandler';

const DATA = [
    {
        id: 1,
        name: 'Calisthenics 101',
        isSelected: true,
        image: require('../../../assets/images/calistenia.jpg')
    },
    {
        id: 2,
        name: 'Acroaesthetics',
        isSelected: false,
        image: require('../../../assets/images/beachsw.jpg')
    },
    {
        id: 3,
        name: 'Acroaesthetics',
        isSelected: false,
        image: require('../../../assets/images/empuje.png')
    },
    {
        id: 4,
        name: 'Acroaesthetics',
        isSelected: false,
        image: require('../../../assets/images/futbol.jpg')
    },
    {
        id: 5,
        name: 'Acroaesthetics',
        isSelected: false,
        image: require('../../../assets/images/planche.jpg')
    }
]

const ClassroomView = (props) => {
    const {loading, setLoading} = useContext(LoadingContext);
    const { classrooms, setClassrooms } = useContext(ClassroomContext);
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext)
    const [today, setToday] = useState(new Date().getFullYear() + '/' + (new Date().getMonth() + 1).toString().padStart(2, '0') + '/' + new Date().getDate().toString().padStart(2, '0'));
    const [routine, setRoutine] = useState("");
    const [classroom_id, setclassroom_id] = useState("");
    const flatListRef = useRef();

    // const getRoutine = async() => {
    //     const data = {
    //         user_id: storedCredentials.user.id,
    //         date: today,
    //         classroom_id: classrooms ? classrooms[classrooms.length-1].id : ""
    //     }
    //     const routineData = await routineHandler.onGetRoutine(data, storedCredentials.token);
    //     console.log(routineData);
    // };
    

    const selectNewItem = (id) => {
        let classrooms1 = [...classrooms];
        const itemIndex = classrooms.findIndex((item, index) => {
            if (item.isSelected === true) {
                return item
            }
        });

        let selectedItem = { ...classrooms1[itemIndex] };
        let itemToSelect = { ...classrooms1[id] };
        selectedItem.isSelected = false;
        itemToSelect.isSelected = true;
        classrooms1[itemIndex] = selectedItem;
        classrooms1[id] = itemToSelect;
        // this.setState({ classrooms });
        setClassrooms(classrooms1);
    };

    const onRenderClassItem = ({ item, index }) => {
        return (
            <Pressable onPress={() => {
                selectNewItem(index);
                flatListRef.current.scrollToIndex({
                    index: index,
                    animated: true,
                    viewPosition: 0.5
                });
            }} key={index} style={[{ marginHorizontal: 20 }, item.isSelected && { flexDirection: 'row' }]}>
                <Image style={item.isSelected ? { height: 195, width: 195, borderRadius: 33, marginRight: 10 } : { height: 131, width: 131, borderRadius: 30, alignSelf: 'flex-end' }} source={item.image} />
                <View style={{}}>
                    {
                        item.isSelected ?
                            (
                                <View>
                                    <Text style={{ fontFamily: 'Montserrat-ExtraBold', fontSize: 40, color: colors.black }}>Do</Text>
                                    <Text style={{ fontFamily: 'Montserrat-ExtraBold', fontSize: 40, color: colors.black }}>It</Text>
                                    <Text style={{ fontFamily: 'Montserrat-ExtraBold', fontSize: 40, color: colors.black }}>Well</Text>
                                </View>
                            ) :
                            (
                                <Text style={{ fontFamily: 'Montserrat-Light', fontSize: 20, color: colors.black, alignSelf: 'flex-end' }}>Siguiente</Text>

                            )
                    }
                    <Text style={[{ color: colors.black }, item.isSelected ? { fontFamily: 'Montserrat-Regular', fontSize: 18, marginBottom: 15 } : { fontFamily: 'Montserrat-Medium', fontSize: 20, alignSelf: 'flex-end', marginBottom: 20 }]}>{item.name}</Text>
                    {
                        item.isSelected &&
                        (
                            <TouchableOpacity onPress={() => props.navigation.navigate('ClassroomRoutineView', {
                                classroom_id: item.id
                            })} style={{ elevation: 1, flexDirection: 'row', height: 66, backgroundColor: colors.gray, width: 126, borderRadius: 25, alignItems: 'center', justifyContent: 'center', marginBottom: 15 }}>
                                <Image style={{ height: 20, width: 20 }} source={require('../../../assets/icons/play.png')} resizeMode={'contain'} />
                            </TouchableOpacity>
                        )
                    }
                </View>
            </Pressable>
        );
    };
        if (loading) {
            return (
                <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center', }}>
                    <ActivityIndicator color={colors.darkText} size={'large'} />
                </View>
            );
        }
        return (
            <View style={{ flex: 1, backgroundColor: colors.background }}>
                <StatusBar barStyle='dark-content' backgroundColor={colors.white} translucent={false} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20, alignItems: 'center', }}>
                    <TouchableOpacity onPress={props.navigation.openDrawer} style={{ elevation: 1, backgroundColor: colors.input, height: 52, width: 52, borderRadius: 23, justifyContent: 'center', alignItems: 'center', }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ height: 4, width: 4, backgroundColor: colors.black, borderRadius: 2, margin: 5 }} />
                            <View style={{ height: 4, width: 4, backgroundColor: colors.black, borderRadius: 2, margin: 5 }} />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ height: 4, width: 4, backgroundColor: colors.black, borderRadius: 2, margin: 5 }} />
                            <View style={{ height: 4, width: 4, backgroundColor: colors.black, borderRadius: 2, margin: 5 }} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 20, color: colors.black }}>Clases</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('ClassroomAddView')} style={{ elevation: 1, backgroundColor: colors.input, height: 52, width: 52, borderRadius: 23, justifyContent: 'center', alignItems: 'center', }}>
                        <Image style={{ height: '50%', width: '50%' }} source={require('../../../assets/icons/add.png')} resizeMode={'contain'} />
                    </TouchableOpacity>
                </View>
                <FlatList
                    ref={flatListRef}
                    initialScrollIndex={classrooms.length - 1}
                    onScrollToIndexFailed={() => { }}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    data={classrooms}
                    renderItem={onRenderClassItem}
                    keyExtractor={(item, index) => index}
                />
                {/* <TouchableOpacity style={{ height: 40, width: 40, alignSelf: 'center', marginBottom: 5 }}>
                    <Image style={{ height: '100%', width: '100%' }} source={require('../../../assets/icons/up-arrow.png')} resizeMode={'contain'} />
                </TouchableOpacity>
                <Text style={{ color: colors.black, fontFamily: 'Montserrat-Medium', fontSize: 20, alignSelf: 'center', marginBottom: 10 }}>Ver rutina</Text>
                <View style={{ paddingHorizontal: 25, justifyContent: 'center', marginHorizontal: 20, backgroundColor: colors.gray, height: 100, borderTopLeftRadius: 38, borderTopRightRadius: 38 }}>
                    <Text style={{ color: colors.black, fontFamily: 'Montserrat-Regular', fontSize: 18 }}>10 min</Text>
                    <Text style={{ color: colors.black, fontFamily: 'Montserrat-Medium', fontSize: 20 }}>Pull ups</Text>
                </View> */}
            </View>
        );
}

export default ClassroomView;