import React from 'react';
import { View, Image } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import colors from '../../../assets/Colors';
import HomeStack from '../stacks/HomeStack'
import { DrawerContent } from '../../views/DrawerContent';


const DrawerNavigator = createDrawerNavigator();
function DrawerScreen() {
    return (
        <DrawerNavigator.Navigator drawerContent={(props) => <DrawerContent {...props} />} screenOptions={{
            headerShown: false, drawerActiveBackgroundColor: colors.primaryTitle, drawerActiveTintColor: colors.white, drawerInactiveTintColor: colors.primaryTitle, drawerLabelStyle: {
                marginLeft: -25, fontFamily: 'Montserrat-Medium', fontSize: 15
            }
        }} >
            <DrawerNavigator.Screen name='HomeStack' component={HomeStack} options={{
                title: 'Inicio', drawerIcon: ({ color }) => (
                    <View style={{ height: 22, width: 22, marginRight: 5 }}>
                        <Image style={{ height: '100%', width: '100%', tintColor: color }} source={require('../../../assets/icons/house.png')} resizeMode='contain'></Image>
                    </View>
                )
            }} />
        </DrawerNavigator.Navigator>
    );
}

export default DrawerScreen;