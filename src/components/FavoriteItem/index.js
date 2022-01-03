import React from 'react';
import {Container, Title, RateContainer, Rate, ActionContainer, ButtonDelete,ButtonDetail} from './styles.js'
import {Ionicons, Feather} from '@expo/vector-icons'

export default function FavoriteItem({data, deleteMovie, navigatePage}){
    return(
        <Container>
            <Title size={22}>{data.title}</Title>
            <RateContainer>
                <Ionicons name="md-star" size={18} color="#E7A74e"/>
                <Rate>{data.rate}/10</Rate>
            </RateContainer>
            <ActionContainer>
                <ButtonDetail onPress={()=>navigatePage(data)}>
                    <Title size={14}>Ver Detalhes</Title>
                </ButtonDetail>
                <ButtonDelete onPress={()=>deleteMovie(data.id)}>
                    <Feather name="trash" size={24} color="#fff" />
                </ButtonDelete>
            </ActionContainer>
        </Container>
    )
}