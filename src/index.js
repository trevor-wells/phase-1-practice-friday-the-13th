const movieList = document.getElementById("movie-list")
const movieImg = document.getElementById("detail-image")
const movieTitle = document.getElementById("title")
const movieRelease = document.getElementById("year-released")
const movieDescription = document.getElementById("description")
const watched = document.getElementById("watched")
const form = document.getElementById("blood-form")
const bloodAmount = document.getElementById("amount")
let currentMovie

watched.addEventListener("click" , toggleWatched)
form.addEventListener("submit" , addDrops)

fetch("http://localhost:3000/movies")
.then(response => response.json())
.then(movies => {
    movies.forEach(createPoster)
    chooseMovie(movies[0])
})

function createPoster(movie){
    const moviePoster = document.createElement("img")
    moviePoster.src = movie.image
    movieList.append(moviePoster)
    moviePoster.addEventListener("click", () => chooseMovie(movie))
}

function chooseMovie(movie){
    bloodAmount.textContent = movie.blood_amount
    currentMovie = movie
    movieImg.src = movie.image
    movieTitle.textContent = movie.title
    movieRelease.textContent = movie.release_year
    movieDescription.textContent = movie.description
    if (movie.watched === true) {
        watched.textContent = "Watched"
    }
    else {
        watched.textContent = "Unwatched"
    }
}

function toggleWatched() {
    let newBool = false
    if (currentMovie.watched === false) {
        currentMovie.watched = true
    }
    else {
        currentMovie.watched = false
    }
    chooseMovie(currentMovie)
}

function addDrops(event) {
    event.preventDefault()
    let moreBlood = event.target.children[1].value
    moreBlood = parseInt(moreBlood)
    currentMovie.blood_amount += moreBlood
    bloodAmount.textContent = currentMovie.blood_amount
    event.target.reset()
}