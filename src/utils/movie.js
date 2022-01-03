export function getListMovies(size,movies){
    let list_movies = []
    for (let i=0; i < size; i++){
        list_movies.push(movies[i])
    }

    return list_movies
}

export function randomMovie(movie){
    return Math.floor(Math.random(0,movie.length)*(movie.length-0))
}