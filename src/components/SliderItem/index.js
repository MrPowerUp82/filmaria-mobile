import React from 'react';
import {Container, BannerItem, Title, RoteContainer, Rote} from './styles.js'
import {Ionicons} from '@expo/vector-icons'

export default function SliderItem({data, navigatePage}){

    return(
        <Container active={0.7} onPress={()=> navigatePage(data)}>
            <BannerItem source={{uri: data?.img}} />
            <Title numberOfLines={1}>{data?.title}</Title>
            <RoteContainer>
                <Ionicons name="md-star" size={12} color="#E7A74e" />
                <Rote>{data?.rate}/10</Rote>
            </RoteContainer>
        </Container>
    )
}