import React from 'react';
import {MenuButton, Container, Title} from './styles.js'
import {Feather} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

export default function Header(props) {

    const navigation = useNavigation();

    return(
        <Container>
            <MenuButton onPress={()=> navigation.openDrawer()}>
                <Feather name="menu" size={30} color="#FFF" />
            </MenuButton>
            <Title>{props.name}</Title>
        </Container>
    )
}