import React, {useState,useEffect} from 'react'
import MovieDataService from "../services/movies"
import {Link} from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Image  from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import movies from '../services/movies'


export const Movie = props => {

  const [movie,setMovie] = useState({
    id: null,
    title:"",
    rated:"",
    reviews:[]
  })

  const getMovie = id => {
    MovieDataService.get(id)
    .then(response => {
      setMovie(response.data)
      console.log(response.data)
    })
    .catch(e =>{
      console.log(e)
    })

  }

  useEffect(() =>{
    getMovie(props.match.params.id)
  },[props.match.params.id])

  return (
    <div>
        <Container>
            <Row>
              <Col>
                <Image src={movie.poster +"/100px250"} fluid/>
              </Col>
              <Col>
                <Card>
                   <Card.Header as="h5">{movie.title}</Card.Header>
                   <Card.Body>
                      <Card.Text>
                         {movie.pilot}
                      </Card.Text>
                      {props.user && <Link to={"/movies/" + props.match.params.id + "/review"}> Add Review </Link>}
                   </Card.Body>
                </Card>
                <br></br>
                <h2>Reviews</h2>
                <br></br>
                {movie.reviews.map((review,index)=>{
                  return (
                    <Card key={index}>
                        <Card.Body>
                          <h5>{review.name + "reviewed on"+ review.date }</h5>
                          <p>{review.review}</p>
                          {props.user && props.user.id === review.user_id && 
                            <Row>
                              <Col>
                                <Link to={{pathname:"/movies/" + props.match.params.id+"/review", state:{currentReview:review}}}>Edit</Link>
                              
                              </Col>
                              <Col>
                                <Button variant="link">Delete</Button>
                              </Col>
                            </Row>
                          }
                        </Card.Body>
                    </Card>
                  )
                })}
            
              
              </Col>
            </Row>
        </Container>
    </div>
  )
}
