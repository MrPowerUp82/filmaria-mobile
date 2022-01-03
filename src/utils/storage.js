import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getMoviesSave(key){
    const myMovies = await AsyncStorage.getItem(key)

    let movies = JSON.parse(myMovies) || []
    return movies

}

export async function saveMovie(key, newMovie){
    let movie = await getMoviesSave(key)

    const hasMovie = movie.some(item => item.id === newMovie.id)

    if(hasMovie){
        return
    }
    movie.push(newMovie)

    await AsyncStorage.setItem(key, JSON.stringify(movie))
}

export async function deleMovie(id){
    let movies = await getMoviesSave('@primereact')

    let myMovies = movies.filter(item =>{
        return item.id !== id
    })
    await AsyncStorage.setItem('@primereact', JSON.stringify(myMovies))
    return myMovies
}

export async function hasMovie(movie){
    let movies = await getMoviesSave('@primereact')

    const hasMovie= movies.find(item=> item.id === movie.id)

    if(hasMovie){
        return true
    }

    return false
}