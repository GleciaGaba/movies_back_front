import React, { useEffect, useRef } from "react";
import api from "../../api/axiosConfig";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from "../reviewForm/ReviewForm";

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    // Vérifie que les reviews sont initialisées comme un tableau vide si non défini
    useEffect(() => {
        getMovieData(movieId);
    }, [movieId, getMovieData]);

    const addReview = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
    
        const reviewText = revText.current.value; // Obtenir la valeur du champ texte
    
        console.log("Review text:", reviewText); // Ajouter un log pour vérifier la valeur
    
        if (reviewText.trim() === "") { // Vérifie si le texte est vide ou ne contient que des espaces
            console.log("Review text is empty.");
            return; // Ne pas soumettre une review vide
        }
    
        try {
            const response = await api.post("/api/v1/reviews", { reviewBody: reviewText, movieId: movieId });
    
            // Mettre à jour les reviews avec la nouvelle review ajoutée
            const updatedReviews = Array.isArray(reviews) ? [...reviews, { body: reviewText }] : [{ body: reviewText }];
    
            setReviews(updatedReviews); // Mettre à jour l'état avec les nouvelles reviews
            revText.current.value = ""; // Réinitialiser le champ texte après l'envoi
        } catch (error) {
            console.error("Erreur lors de l'ajout de la review", error);
        }
    };
    

    return (
        <Container>
            <Row>
                <Col><h3>Reviews</h3></Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <img src={movie?.poster} alt={movie?.title || "Movie poster"} />
                </Col>
                <Col>
                    <>
                        <Row>
                            <Col>
                                <ReviewForm 
                                    handleSubmit={addReview} 
                                    revText={revText} 
                                    labelText="Write a Review?" 
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                    {Array.isArray(reviews) && reviews.length > 0 ? (
                        reviews.map((r, index) => (
                            <React.Fragment key={index}>
                                <Row>
                                    <Col>{r.body}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>
                            </React.Fragment>
                        ))
                    ) : (
                        <p>No reviews yet.</p>
                    )}
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    );
};

export default Reviews;
