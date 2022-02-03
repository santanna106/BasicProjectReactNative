import React from 'react';
import {Platform} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const {Navigator,Screen} = createBottomTabNavigator();

import { Home } from '../screens/Home';


export function AppRoutes () {
    const theme = useTheme();
    return (
        <Navigator
            screenOptions={{
                headerShown:false,
                tabBarActiveTintColor:theme.colors.secundary,
                tabBarInactiveTintColor:theme.colors.text,
                tabBarLabelPosition:'beside-icon',
                tabBarStyle:{
                    height: 88,
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                }
            }}
        >
            <Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: (({size,color}) =>
                        <MaterialIcons 
                            name="format-list-bulleted" 
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
        </Navigator>
    )
}