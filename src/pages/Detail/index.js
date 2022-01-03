import React, {useEffect, useState} from 'react';
import {Container, Header, HeaderButton,Banner, Title, ButtonLink, ContentArea, Rate, ListGenres, Description} from './styles.js'
import {Feather, Ionicons} from '@expo/vector-icons'
import api from '../../services/api'
import { useNavigation, useRoute } from '@react-navigation/native';
import Stars from 'react-native-stars'
import Genres from '../../components/Genres/index.js';
import { ScrollView, Modal } from 'react-native';
import ModalLink from '../../components/ModalLink/index.js';
import { saveMovie, hasMovie, deleMovie } from '../../utils/storage.js';

export default function Detail(){

    const [movie, setMovie] = useState({})
    const [openLink,setOpenLink] = useState(false)
    const [favorite,setFavorite] = useState(false)

    const navigation = useNavigation();
    const route = useRoute();

    useEffect(()=>{
        const ac = new AbortController()
        let isActive = true
        async function getMovie(){
            const response = await api.get(`filmes/${route.params?.id}`).catch((error)=>{console.log(error)})

           if(isActive){
               setMovie(response.data)
               const isFavorite = await hasMovie(response.data)
               setFavorite(isFavorite)
           }
        }
        if(isActive){
            getMovie()
        }

        return () =>{
            isActive = false
            ac.abort()
        }
    },[])

    async function favoriteMovie(movie){

        if (favorite){
            await deleMovie(movie.id)
            setFavorite(false)
        }else{
            await saveMovie('@primereact',movie)
            setFavorite(true)
        }
    }

    return(
        <Container>
            <Header>
                <HeaderButton onPress={()=>navigation.goBack()}>
                    <Feather name="arrow-left" size={28} color="#FFF"/>
                </HeaderButton>
                <HeaderButton onPress={()=>favoriteMovie(movie)}>
                    {favorite ? (
                        <Ionicons name="bookmark" size={28} color="#FFF"/>
                    ):(
                        <Ionicons name="bookmark-outline" size={28} color="#FFF"/>
                    )}
                </HeaderButton>
            </Header>
            <Banner source={{uri: movie.img}} resizeMethod="resize" />
            <ButtonLink onPress={()=>setOpenLink(true)}>
                <Feather name="play" size={24} color="#FFF" />
            </ButtonLink>
            <Title numberOfLines={2}>{movie.title}</Title>
            <ContentArea>
                <Stars default={parseFloat(movie.rate)} count={10} half={true} starSize={20} fullStar={<Ionicons name="md-star" size={24} color="#E7A74e" />}
                emptyStar={<Ionicons name="md-star-outline" size={24} color="#E7A74e" />}
                halfStar={<Ionicons name="md-star-half" size={24} color="#E7A74e" />}
                disable={true}
                />
                <Rate>{movie.rate}/10</Rate>
            </ContentArea>
            <Title>Descrição</Title>
            <ScrollView showVerticalScrollIndicator={false}>
                <Description>{movie.sinopse}</Description>
            </ScrollView>
            <Modal animationType='slide' transparent={true} visible={openLink}>
                <ModalLink link={movie?.link} title={movie?.title} closeModal={()=> setOpenLink(false)}/>
            </Modal>
        </Container>
    )
}