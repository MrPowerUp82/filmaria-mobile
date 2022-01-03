import React, {useState, useEffect} from 'react';
import {Container, ListMovies} from './styles.js'
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api.js';
import SearchItem from '../../components/SearchItem/index.js'
import {ActivityIndicator } from 'react-native';

export default function Search(){

    const [movie, setMovie] = useState([])
    const [loading, setLoading] = useState(true)

    const navigation = useNavigation()

    const route = useRoute()

    useEffect(()=>{
        let isActive= true
        async function getSearchMovie(){
            const response = await  api.get(`/search/filmes/${route?.params?.search}/`)
            if (isActive){
                setMovie(response.data)
                setLoading(false)
            }
        }

        if (isActive){
            getSearchMovie()
        }
        
        return ()=>{isActive = false}
    }, [])

    if (loading){
        return(
            <Container>
                <ActivityIndicator style={{
                    flex: 1,
                    justifyContent: 'center'
                }} size="large" color="#FFF" />
            </Container>
        )
    }

    function navigateDetailPage(item){
        navigation.navigate('Detail',{id:item.id})
    }

    return(
        <Container>
            <ListMovies data={movie} showsVerticalScrollIndicator={false} keyExtractor={(item)=>item.id.toString()}
            renderItem={({item})=><SearchItem data={item} navigatePage={()=>navigateDetailPage(item)} />}
            />
        </Container>
    )
}