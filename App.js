import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import React, {useEffect, useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {View, Text, TouchableOpacity} from 'react-native';

export const PopUpComponent: React.FC = ({show}) => {
    return (
        <View style={{
            position: 'absolute',
            width: '100%',
            top: 50,
            left: 0,
        }}>
            {show && (
                <Animated.View entering={FadeIn.duration(1500)} exiting={FadeOut} style={{
                    backgroundColor: 'white',
                    paddingVertical: 20,
                    paddingHorizontal: 20,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    borderRadius: 12,
                    borderColor: 'black',
                    borderWidth: 1,
                    marginHorizontal: 16,
                }}>
                    <Text>Complete</Text>
                </Animated.View>
            )}
        </View>
    );
};

function HomeScreen() {
    const {navigate} = useNavigation();
    const navigateToSecond = () => {
        navigate('Second');
    }

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Home Screen</Text>
            <TouchableOpacity onPress={navigateToSecond}>
                <Text style={{backgroundColor: 'purple', paddingVertical: 12, paddingHorizontal: 12}}>Next Screen</Text>
            </TouchableOpacity>
        </View>
    );
}

function SecondScreen({showPopup}) {
    const {navigate} = useNavigation();
    const navigateToHome = () => {
        showPopup();
        navigate('Home');
    }

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Second Screen</Text>
            <TouchableOpacity onPress={navigateToHome}>
                <Text style={{backgroundColor: 'pink', paddingVertical: 12, paddingHorizontal: 12}}>Next Screen</Text>
            </TouchableOpacity>
        </View>
    );
}

const Stack = createNativeStackNavigator();

function App() {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    useEffect(() => {
        if (isPopupVisible) {
            setTimeout(() => {
                setIsPopupVisible(false);
            }, 3000);
        }
    }, [isPopupVisible]);

    const showPopup = () => setIsPopupVisible(true);

    const SecondScreenComponent = () => <SecondScreen showPopup={showPopup} />;

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Second" component={SecondScreenComponent}/>
                </Stack.Navigator>
            </NavigationContainer>
            <PopUpComponent show={isPopupVisible}/>
        </>
    );
}

export default App;
