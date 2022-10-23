import React from 'react';
import { useState, useEffect, useRef } from 'react';

//import noPoster from '../assets/images/no-poster.jpg';

function SearchMovies(){

	const [movies, setMovies] = useState([]) 
	const [keyword, setKeyword] = useState('')
	const input = useRef()

	
	console.log(movies)
	console.log(movies.Search)
	useEffect(() => {
		console.log('%c Se monto el componente', 'color: green')
		fetch(`http://www.omdbapi.com/?s=${keyword}&apikey=${apiKey}`)
			.then(res => res.json())
			.then(data => {
				console.log(data)
				setMovies(data)
			})
			.catch(error => console.log(error))
	}, [keyword]);

	useEffect(() => {
		console.log('%c Se actualizo el componente', 'color: yellow')
	}, [movies, keyword])

	
	const searchMovies = (e) => {
		e.preventDefault()
		setKeyword(input.current.value)
		
	}

	
	console.log(keyword)
	
	// Credenciales de API
	const apiKey = 'a682d599'; // Intenta poner cualquier cosa antes para probar

	return(
		<div className="container-fluid">
			{
				apiKey !== '' ?
				<>
					<div className="row my-4">
						<div className="col-12 col-md-6">
							{/* Buscador */}
							<form onSubmit={searchMovies} method="GET">
								<div className="form-group">
									<label htmlFor="">Buscar por título:</label>
									<input ref={input} type="text" className="form-control"  />
								</div>
								<button  className="btn btn-info">Search</button>
							</form>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<h2>Películas para la palabra: {keyword}</h2>
						</div>
						{/* Listado de películas */}
						{
							movies.Search !== undefined  && movies.Search.map((movie, i) => {
								return (
									<div className="col-sm-6 col-md-3 my-4" key={i}>
										<div className="card shadow mb-4">
											<div className="card-header py-3">
												<h5 className="m-0 font-weight-bold text-gray-800">{movie.Title}</h5>
											</div>
											<div className="card-body">
												<div className="text-center">
													<img 
														className="img-fluid px-3 px-sm-4 mt-3 mb-4" 
														src={movie.Poster}
														alt={movie.Title} 
														style={{ width: '90%', height: '400px', objectFit: 'cover' }} 
													/>
												</div>
												<p>{movie.Year}</p>
											</div>
										</div>
									</div>
								)
							})
						}
					</div>
					{ movies.Error === 'Movie not found!'  && <div className="alert alert-warning text-center">No se encontraron películas</div>}
					{ movies.Error === 'Too many results.'  && <div className="alert alert-warning text-center">No se encontraron películas</div>}
				</>
				:
				<div className="alert alert-danger text-center my-4 fs-2">Eyyyy... ¿PUSISTE TU APIKEY?</div>
			}
		</div>
	)
}

export default SearchMovies;
