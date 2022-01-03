import React from 'react';
import {Feather} from '@expo/vector-icons'
import { BackButton, Name } from './styles';
import {WebView} from 'react-native-webview';



export default function ModalLink({link, title, closeModal}){
    return(
            <>
            <BackButton onPress={closeModal}>
                <Feather name="x" size={35} color="#fff" />
                <Name>{title}</Name>
            </BackButton>
            <WebView
 javaScriptEnabled={true}
 scrollEnabled={false}
 allowsFullscreenVideo={true}
 source={{uri: link}}
/>

            </>
    )
}
