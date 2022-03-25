import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

//object Id would help us convert an id string to a mongoDB object id

let reviews

export default class ReviewsDAO{
    static async injectDB(conn){
        if(reviews){
            return reviews
        }
        try{
            reviews = await conn.db(process.env.MOVIEREVIEWS_NS).collection('reviews')
        }
        catch(e){
            console.error(`unable to establish connection handle in reviewDAO: ${e}`)
        }
    }

    static async addReview(movieId, user, review,date){
        try{
            const reviewDoc ={
                name:user.name,
                user_id: user._id,
                date:date,
                review:review,
                movie_id: ObjectId(movieId)
            }
            return await reviews.insertOne(reviewDoc)
        }
        catch(e){
            console.error(`unable to post review: ${e}`)
            return {error:e}
        }

    }
    static async updateReview(reviewId, userId, review, date){
        try{
            const updateResponse = await reviews.updateOne(
                {user_id:userId, 
                  _id: ObjectId(reviewId)  
                },
                {
                    $set:{review:review, date:date}
                }

            )
        }
        catch(e){
            console.log(`unable to update review: ${e}`)
            return{error:e}
        }

    }

    static async deleteReview(reviewId, userId){
        try{
            const deleteResponse = await reviews.deleteOne(
                {
                  _id:ObjectId(reviewId),
                  user_id:userId

                }
            )
            return deleteResponse
        }
        catch(e){
            console.log(`unable to delete review: ${e}`)
            return {error : e}
        }
        
    }
}