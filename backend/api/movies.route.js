import express  from 'express'
import MoviesController from "./movies.controller.js"
import ReviewsController from "../api/reviews.controller.js"

const router = express.Router()

// route to search movies
router.route('/').get(MoviesController.apiGetMovies)

router.route("/id/:id").get(MoviesController.apiGetMovieById)
router.route("/ratings").get(MoviesController.apiGetRatings)

//route to put a review, post and delete a review

router.route('/review')
.post(ReviewsController.apiPostReview)
.put(ReviewsController.apiUpdateReview)
.delete(ReviewsController.apiDeleteReview)

export default router