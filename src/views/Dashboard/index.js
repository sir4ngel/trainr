import React from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image } from 'react-native';
import colors from '../../../assets/Colors';

const DashboardView = (props) => {
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle='dark-content' backgroundColor={colors.white} translucent={false} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 30 }}>
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
            </View>
            <View style={{ marginHorizontal: 20 }}>
                <Text style={{ color: colors.secondaryTitle, fontSize: 40, fontFamily: 'Montserrat-Bold' }}>Hola,</Text>
                <Text style={{ color: colors.primaryTitle, fontSize: 40, fontFamily: 'Montserrat-Bold', marginBottom: 45 }}>Angel</Text>
                <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 25, color: colors.primaryTitle }}>Tu semana</Text>
            </View>
            <View style={{ flexDirection: 'row', marginHorizontal: 20, justifyContent: 'space-between', marginTop: 30 }}>
                <View style={{ height: 222, width: 139, backgroundColor: colors.blue, borderRadius: 38, justifyContent: 'space-evenly', alignItems: 'center', }}>
                    <View style={{ backgroundColor: colors.white, height: 50, width: 50, borderRadius: 18, justifyContent: 'center', alignItems: 'center', }}>
                        <Image style={{ height: '80%', width: '80%' }} source={require('../../../assets/icons/fire.png')} resizeMode={'contain'} />
                    </View>
                    <View style={{ alignItems: 'center', }}>
                        <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 25, color: colors.primaryTitle }}>2,154</Text>
                        <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 18, color: '#7A7A7A' }}>kcal</Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'space-between', }}>
                    <View style={{ height: 100, width: 200, backgroundColor: colors.green, borderRadius: 38, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', }}>
                        <View style={{ backgroundColor: colors.white, height: 50, width: 50, borderRadius: 18, justifyContent: 'center', alignItems: 'center', }}>
                            <Image style={{ height: '60%', width: '60%' }} source={require('../../../assets/icons/hourglass.png')} resizeMode={'contain'} />
                        </View>
                        <View style={{}}>
                            <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 25, color: colors.primaryTitle }}>16h</Text>
                            <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 18, color: '#7A7A7A' }}>tiempo total</Text>
                        </View>
                    </View>
                    <View style={{ height: 100, width: 200, backgroundColor: colors.gray, borderRadius: 38, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', }}>
                        <View style={{ backgroundColor: colors.white, height: 50, width: 50, borderRadius: 18, justifyContent: 'center', alignItems: 'center', }}>
                            <Image style={{ height: '60%', width: '60%' }} source={require('../../../assets/icons/bicep.png')} resizeMode={'contain'} />
                        </View>
                        <View style={{}}>
                            <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 25, color: colors.primaryTitle }}>107</Text>
                            <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 18, color: '#7A7A7A' }}>ejercicios</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ marginHorizontal: 20 }}>
                <View style={{ width: '100%', height: 122, borderWidth: 1, borderColor: colors.gray, borderRadius: 38, marginTop: 42, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, justifyContent: 'space-between', }}>
                    <View style={{}}>
                        <Text style={{ fontFamily: 'Montserrat-Medium', color: colors.secondaryTitle, fontSize: 15 }}>Más activo</Text>
                        <Text style={{ fontFamily: 'Montserrat-Bold', color: colors.primaryTitle, fontSize: 18 }}>Jueves</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ alignItems: 'center', marginRight: 10, justifyContent: 'flex-end' }}>
                            <View style={{ height: 60, width: 25, backgroundColor: colors.gray, borderRadius: 10 }} />
                            <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 8, color: colors.secondaryTitle }}>lu</Text>
                        </View>
                        <View style={{ alignItems: 'center', marginRight: 10, justifyContent: 'flex-end' }}>
                            <View style={{ height: 40, width: 25, backgroundColor: colors.gray, borderRadius: 10 }} />
                            <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 8, color: colors.secondaryTitle }}>ma</Text>
                        </View>
                        <View style={{ alignItems: 'center', marginRight: 10, justifyContent: 'flex-end' }}>
                            <View style={{ height: 60, width: 25, backgroundColor: colors.gray, borderRadius: 10 }} />
                            <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 8, color: colors.secondaryTitle }}>mi</Text>
                        </View>
                        <View style={{ alignItems: 'center', marginRight: 10, justifyContent: 'flex-end' }}>
                            <View style={{ height: 75, width: 25, backgroundColor: colors.blue, borderRadius: 10 }} />
                            <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 8, color: colors.secondaryTitle }}>ju</Text>
                        </View>
                        <View style={{ alignItems: 'center', marginRight: 10, justifyContent: 'flex-end' }}>
                            <View style={{ height: 60, width: 25, backgroundColor: colors.gray, borderRadius: 10 }} />
                            <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 8, color: colors.secondaryTitle }}>vi</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default DashboardView;