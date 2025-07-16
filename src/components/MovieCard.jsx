import React from 'react'

const MovieCard = ({ movie:
    { title, id, poster_path, voter_average, release_date, original_language }
}) => {
    return (<div className='movie-card'>
        <img src={poster_path ?
            `https://image.tmdb.org/t/p/w500/${poster_path}` :
            '/no-movie.jpg'}
            alt={title}
        />
      
      
  </div>
  )
}

export default MovieCard