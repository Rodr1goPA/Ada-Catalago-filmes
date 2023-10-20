document.addEventListener("DOMContentLoaded", function () {
    const apiKey = 'b046cd3b7c462dff10c810f0a49e4168';
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
    const tvApiUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`;
    
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

            moviesSection.style.display = 'none';
            movieDetailsSection.style.display = 'block';
        
            movieDetailsContent.innerHTML = `
                <h2>${movie.title}</h2>
                <p><strong>Sinopse:</strong> ${movie.overview}</p>
                <p><strong>Data de Lançamento:</strong> ${movie.release_date}</p>
                <p><strong>Classificação:</strong> ${movie.vote_average}</p>
            `;
            const backToMoviesButton = document.getElementById('back-to-movies');
        backToMoviesButton.addEventListener('click', () => {

            movieDetailsSection.style.display = 'none';
    
            moviesSection.style.display = 'block';
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

            tvShowSection.style.display = 'none'
            tvShowDetailsSection.style.display = 'block'

            tvShowDetailsContent.innerHTML = `
            <h2>${movie.name}</h2>
            <p><strong>Sinopse:</strong> ${movie.overview}</p>
            <p><strong>Data de Lançamento:</strong> ${movie.first_air_date}</p>
            <p><strong>Classificação:</strong> ${movie.vote_average}</p>
            `;

            const backToTvButton = document.getElementById('back-to-tv-shows')
            backToTvButton.addEventListener('click' , () => {
                tvShowDetailsSection.style.display = 'none'
                tvShowSection.style.display = 'block'
            })
        }
});


let currentIndex = 0;
const numCards = document.querySelectorAll('.movie-card').length;
const carousel = document.querySelector('.carousel');

function showNextCard() {
  if (currentIndex < numCards - 1) {
    currentIndex++;
    updateCarousel();
  }
}

function showPreviousCard() {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
}

function updateCarousel() {
  const cardWidth = document.querySelector('.movie-card').offsetWidth;
  const translateValue = -currentIndex * cardWidth;
  carousel.style.transform = `translateX(${translateValue}px)`;
}

// Adicione event listeners aos botões "Próximo" e "Anterior" (ou qualquer mecanismo que você queira usar para navegar)
document.getElementById('next-button').addEventListener('click', showNextCard);
document.getElementById('previous-button').addEventListener('click', showPreviousCard);
