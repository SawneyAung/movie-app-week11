const express = require('express');
const app = express();

// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // Parse form data

// Sample data (no database) // TODO: populate more movies 
const movies = [
    {
        id: 1,
        title: "Inception",
        year: 2010,
        poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg",
        rating: 8.8
    },
    {
        id: 2,
        title: "The Matrix",
        year: 1999,
        poster: "https://m.media-amazon.com/images/M/MV5BN2NmN2VhMTQtMDNiOS00NDlhLTliMjgtODE2ZTY0ODQyNDRhXkEyXkFqcGc@._V1_.jpg",
        rating: 8.7
    },
    {
        id: 3,
        title: "Pulp Fiction",
        year: 1994,
        poster: "https://m.media-amazon.com/images/M/MV5BYTViYTE3ZGQtNDBlMC00ZTAyLTkyODMtZGRiZDg0MjA2YThkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        rating: 8.9
    },
    {
        id: 4,
        title: "The Godfather",
        year: 1972,
        poster: "https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        rating: 9.2
    },
    {
        id: 5,
        title: "Titanic",
        year: 1997,
        poster: "https://m.media-amazon.com/images/M/MV5BYzYyN2FiZmUtYWYzMy00MzViLWJkZTMtOGY1ZjgzNWMwN2YxXkEyXkFqcGc@._V1_.jpg",
        rating: 7.8
    },
    {
        id: 6,
        title: "The Dark Knight",
        year: 2008,
        poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg",
        rating: 9.0
    },
    {
        id: 7,
        title: "Forrest Gump",
        year: 1994,
        poster: "https://m.media-amazon.com/images/M/MV5BNDYwNzVjMTItZmU5YS00YjQ5LTljYjgtMjY2NDVmYWMyNWFmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        rating: 8.8
    },
    {
        id: 8,
        title: "Parasite",
        year: 2019,
        poster: "https://m.media-amazon.com/images/M/MV5BYjk1Y2U4MjQtY2ZiNS00OWQyLWI3MmYtZWUwNmRjYWRiNWNhXkEyXkFqcGc@._V1_.jpg",
        rating: 8.6
    },
    {
        id: 9,
        title: "Back to the Future",
        year: 1985,
        poster: "https://m.media-amazon.com/images/M/MV5BMTNlOTRmOTEtMTAyMi00NjFiLTk3NDMtNWI0YzA3ZTZlYjZiXkEyXkFqcGc@._V1_.jpg",
        rating: 8.5
    },
    {
        id: 10,
        title: "Casablanca",
        year: 1942,
        poster: "https://m.media-amazon.com/images/M/MV5BNWEzN2U1YTYtYTQyMS00NTVkLWE2NGQtZWFlMmM0MDNjMmRiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        rating: 8.5
    }
];

let reviews = [
    {
        movieId: 1,
        name: "John",
        rating: 4,
        comment: "Great movie!"
    },
]; // Stores all reviews

// Routes
app.get('/', (req, res) => {
    res.render('index', { movies });
});

// Form to submit a review
app.get('/review/:movieId', (req, res) => {
    // TODO: GET MOVIES FROM `movie` ARRAY
    const movieId = parseInt(req.params.movieId);
    const movie = movies.find(m => m.id === movieId);

    if (!movie) {
        return res.status(404).send("Movie not found");
    }

    res.render('review', { movie });
});

// Handle form submission
app.post('/submit-review', (req, res) => {
    // TODO: STORE REVIEWS INTO `reviews` ARRAY
    const { movieId, name, rating, comment } = req.body;

    reviews.push({
        movieId: parseInt(movieId),
        name: name || "Anonymous",
        rating: parseInt(rating),
        comment: comment.trim(),
        timestamp: Date.now()
    });

    res.redirect('/reviews?submitted=true'); // Show all reviews
});

// Display all reviews
app.get('/reviews', (req, res) => {
    const submitted = req.query.submitted || null;
    res.render('reviews', { reviews, movies, submitted });
});

const CUSTOM_PORT = process.env.PORT || 3000;
app.listen(CUSTOM_PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${CUSTOM_PORT}`);
});