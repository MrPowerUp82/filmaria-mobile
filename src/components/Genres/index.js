import React from 'react';
import {Container,Name} from './styles.js'

export default function Genres({data}){
    return(
        <Container>
            <Name>{data.name}</Name>
        </Container>
    )
}