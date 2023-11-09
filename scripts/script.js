document.addEventListener("DOMContentLoaded", function () {
    const apiKey = 'b046cd3b7c462dff10c810f0a49e4168';
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`;
    const tvApiUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=pt-BR`;
    let scrollPosition = 0;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na solicitação da API');
            }
            return response.json();
        })
        .then(data => {
            const moviesContainer = document.getElementById('movies');
            data.results.forEach(movie => {
                const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
                const imageSrc = `${imageBaseUrl}${movie.poster_path}`;

                const movieDiv = document.createElement('div');
                movieDiv.innerHTML = `<h2>${movie.title}</h2>
                                      <img src="${imageSrc}" alt="${movie.title}"></img>
                                      <button class="detail-button">Detalhes</button>`;
                                   
                moviesContainer.appendChild(movieDiv);
            
                const detailButton = movieDiv.querySelector('.detail-button');
                detailButton.addEventListener('click', () => {
                    scrollPosition = window.scrollY;
                    showMovieDetails(movie);
                });
            });            
        })
        .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
        });
        function showMovieDetails(movie) {
            const moviesSection = document.getElementById('movies-section');
            const movieDetailsSection = document.getElementById('movie-details-section');
            const movieDetailsContent = document.getElementById('movie-details-content');
            const containerCabecalho = document.querySelector('.container-cabecalho');
            const tvShowSection = document.getElementById('tv-shows-section');
            const sectionOscar = document.querySelector('.container-oscar')
            const sectionForm = document.querySelector('.section-form');
            const footerSection = document.querySelector('.section-footer')

            const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
            const imageSrc = `${imageBaseUrl}${movie.poster_path}`;

            moviesSection.style.display = 'none';
            containerCabecalho.style.display = 'none';
            tvShowSection.style.display = 'none';
            sectionOscar.style.display = 'none';
            sectionForm.style.display = 'none';
            footerSection.style.display = 'none';

            movieDetailsSection.style.display = 'block';
            
        
            movieDetailsContent.innerHTML = `
            <div>
            <img src="${imageSrc}" alt="${movie.title}"></img>
            <div>
            <h2>${movie.title}</h2>
            <p><strong>Sinopse:</strong> ${movie.overview}</p>
            <p><strong>Data de Lançamento:</strong> ${movie.release_date}</p>
            <p><strong>Classificação:</strong> ${movie.vote_average}</p>
            <button id="back-to-movies">Voltar</button>
            </div>
            </div>
            `;
            const backToMoviesButton = document.getElementById('back-to-movies');
            backToMoviesButton.addEventListener('click', () => {
            window.scrollTo(0, scrollPosition);
            movieDetailsSection.style.display = 'none';


    
            moviesSection.style.display = 'block';
            containerCabecalho.style.display = 'block';
            tvShowSection.style.display = 'block';
            sectionOscar.style.display = 'block';
            sectionForm.style.display = 'flex';
            footerSection.style.display = 'flex';
            window.scrollTo(0, scrollPosition);
        });            
        }

        /*Get das series de TV*/
        fetch(tvApiUrl)
        .then(response =>{
            if(!response.ok) {
                throw new Error('Erro na solicitação da API');
            }
            return response.json();
        })
        .then(data=>{  
            const tvShowContainer = this.getElementById('tv-shows');
            data.results.forEach(movie =>{
                const imageTvBaseUrl =  'https://image.tmdb.org/t/p/w500';
                const imageTvUrl = `${imageTvBaseUrl}${movie.poster_path}`

                const tvShowDiv = document.createElement('div')
                tvShowDiv.innerHTML = `<h2>${movie.name}</h2>
                                       <img src=${imageTvUrl} alt="${movie.name}"></img>
                                       <button class="detail-button">Detalhes</button>
                `
                tvShowContainer.appendChild(tvShowDiv);

                const tvdetailButton = tvShowDiv.querySelector('.detail-button')
                tvdetailButton.addEventListener('click' , () => {
                    scrollPosition = window.scrollY;
                    console.log(scrollPosition)
                    showTvDetails(movie)
                })
            })
            
        })
        .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
        });
        function showTvDetails(movie) {
            const tvShowSection = document.getElementById('tv-shows-section')
            const tvShowDetailsSection = document.getElementById('tv-show-details-section')
            const tvShowDetailsContent = document.getElementById('tv-show-details-content')
            const containerCabecalho = document.querySelector('.container-cabecalho');
            const moviesSection = document.getElementById('movies-section');
            const sectionOscar = document.querySelector('.container-oscar')
            const sectionForm = document.querySelector('.section-form');
            const footerSection = document.querySelector('.section-footer')

                const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
            const imageSrc = `${imageBaseUrl}${movie.poster_path}`;

            tvShowSection.style.display = 'none';
            containerCabecalho.style.display = 'none';
            moviesSection.style.display = 'none';
            sectionOscar.style.display = 'none'
            sectionForm.style.display ='none';
            footerSection.style.display = 'none';
            
            tvShowDetailsSection.style.display = 'block'

            tvShowDetailsContent.innerHTML = `
            <div>
            <img src="${imageSrc}" alt="${movie.title}"></img>
            <div>
            <h2>${movie.name}</h2>
            <p><strong>Sinopse:</strong> ${movie.overview}</p>
            <p><strong>Data de Lançamento:</strong> ${movie.first_air_date}</p>
            <p><strong>Classificação:</strong> ${movie.vote_average}</p>
            <button id="back-to-tv-shows">Voltar</button>
            </div>
            </div>
            `;

            const backToTvButton = document.getElementById('back-to-tv-shows')
            backToTvButton.addEventListener('click' , () => {
                
                tvShowDetailsSection.style.display = 'none'

                
                moviesSection.style.display = 'block';
                containerCabecalho.style.display = 'block';
                tvShowSection.style.display = 'block';
                sectionOscar.style.display = 'block'
                sectionForm.style.display = 'flex';
                footerSection.style.display = 'flex';
                window.scrollTo(0, scrollPosition)
            })
        }        
});