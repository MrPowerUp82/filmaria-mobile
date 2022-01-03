import React, {useEffect, useState} from 'react';
import Header from '../../components/Header/index.js';
import {Container, ListMovies} from './styles.js'
import { getMoviesSave , deleMovie } from '../../utils/storage.js';
import FavoriteItem from '../../components/FavoriteItem/index.js';
import { useNavigation, useIsFocused } from '@react-navigation/native';

export default function Movies(){

    const [movies, setMovies] = useState([])

    const navigation = useNavigation()
    const isFocused = useIsFocused()

    useEffect(()=>{
        let isActive = true

        async function getFavoriteMovies(){
            const result = await getMoviesSave('@primereact')
            if(isActive){
                setMovies(result)
            }
        }
        if(isActive){
            getFavoriteMovies()
        }
        return ()=>{isActive = false}
    }, [isFocused])

    async function handleDelete(id){
        const result = await deleMovie(id)
        setMovies(result)
    }
    function navigateDetailPage(item){
        navigation.navigate('Detail',{id:item.id})
    }

    return (
        <Container>
            <Header name="Meus Filmes"/>
            <ListMovies data={movies} showsVerticalScrollIndicator={false} keyExtractor={item=>item.id.toString()}
            renderItem={({item})=>(<FavoriteItem data={item} deleteMovie={handleDelete} navigatePage={()=>navigateDetailPage(item)} />)}
            />
        </Container>
    )
}