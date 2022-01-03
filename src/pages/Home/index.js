import React, {useEffect, useState} from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import {Container, SearchContainer, SearchButton, Input, Title, Banner, BannerButton, SliderMovie} from './styles.js';
import Header from '../../components/Header/index.js';
import {Feather} from '@expo/vector-icons'
import SliderItem from '../../components/SliderItem'
import api from '../../services/api'
import {randomMovie} from '../../utils/movie.js';
import { useNavigation } from '@react-navigation/native';

export default function Home(){

    const [nowMovies,setNowMovies] = useState([])
    const [banner,setBanner] = useState({})
    const [loading,setLoading] = useState(true)

    const [input, setInput] = useState('')
    
    const navigation = useNavigation()

    useEffect(()=>{
        let isActive = true;
        const ac = new AbortController()
        async function getMovies(){
            const nowData = await api.get('filmes')


            if(isActive){
                // setNowMovies(getListMovies(5,nowData.data))
                setNowMovies(nowData.data)
                setBanner(nowData.data[randomMovie(nowData.data)])
                setLoading(false)
            }
        }
        if(isActive){
            getMovies()
        }
        return () =>{
            isActive = false
            ac.abort()
        }
    }, [])

    function navigateDetailPage(item){
        navigation.navigate('Detail',{id:item.id})
    }

    function handleSearchMovie(){
       if (input === ''){
           alert('Preencha o campo')
           retunr
       }
       navigation.navigate('Search',{search: input})
       setInput('')
    }


    if(loading){
        return(
            <Container>
                <ActivityIndicator style={{
                    flex: 1,
                    justifyContent: 'center'
                }} size="large" color="#FFF" />
            </Container>
        )
    }

    return (
        <Container>
            <Header name="Filmaria"/>
            <SearchContainer>
                <Input placeholder="Ex. Vingadores" placeholderTextColor="#ddd" value={input} onChangeText={(text)=>setInput(text)}/>
                <SearchButton onPress={handleSearchMovie}>
                    <Feather name="search" size={30} color="#FFF" />
                </SearchButton>
            </SearchContainer>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Title>Em Cartaz</Title>
                <BannerButton active={0.9} onPress={()=>navigateDetailPage(banner)}>
                    <Banner resizeMethod="resize" source={{uri: banner?.img}} />
                </BannerButton>
                <SliderMovie showsHorizontalScrollIndicator={false} horizontal={true} data={nowMovies} renderItem={({item})=><SliderItem data={item} navigatePage={()=> navigateDetailPage(item)}/>} keyExtractor={(item)=>item.id.toString()} />
                </ScrollView>
        </Container>
    )
}