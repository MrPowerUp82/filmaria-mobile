import React from 'react';
import { Container, Banner, RateContainer, Title, Rate } from './styles.js';

import {Ionicons} from '@expo/vector-icons'

export default function SearchItem({data, navigatePage}){

    function detailPage(){
        if(data.release_date === ''){
            alert('Filme sem data')
            return
        }
        navigatePage(data)
    }

    return(
        <Container activeOpacity={0.7} onPress={detailPage}>
            {data?.img ? (
                <Banner resizeMethod="resize" source={{uri: data.img}} />
            ):(
                <Banner resizeMethod="resize" source={require('../../assets/not-found.jpg')} />
            )}
            <Title>{data?.title}</Title>
            <RateContainer>
                <Ionicons name="md-star" size={12} color="#E7A74e"/>
                <Rate>{data?.rate}/10</Rate>
            </RateContainer>
        </Container>
    )
}