document.addEventListener("DOMContentLoaded", function () {
    // Recupere o termo de pesquisa da URL
    const params = new URLSearchParams(window.location.search);
    const searchTerm = params.get("query");

    // Verifique se há um termo de pesquisa válido
    if (searchTerm) {
        // Chame a função para fazer a pesquisa usando o termo recuperado
        searchMovies(searchTerm);
    } else {
        // Caso contrário, exiba uma mensagem de erro ou redirecione para a página de pesquisa
        // window.location.href = "search.html";  // Redireciona para a página de pesquisa, se necessário
        const movieList = document.getElementById("movieList");
        movieList.textContent = "Nenhum termo de pesquisa fornecido.";
    }
});

function searchMovies(query) {
    const apiKey = 'b046cd3b7c462dff10c810f0a49e4168';
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            displayResults(data.results);
        })
        .catch((error) => {
            console.error("Erro na solicitação à API: ", error);
        });
}

function displayResults(results) {
    const movieList = document.getElementById("movieList");
    if (results.length === 0) {
        movieList.textContent = "Nenhum filme encontrado.";
    } else {
        results.forEach((movie) => {
            const movieLink = document.createElement("a");
            movieLink.href = `movie_details.html?id=${movie.id}`;
            movieLink.textContent = movie.title;
            movieLink.style.display = "block";
            movieList.appendChild(movieLink);
        });
    }
}