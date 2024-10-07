import React, { useEffect, useRef } from "react";
import api from "../../api/axiosConfig";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from "../reviewForm/ReviewForm";

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
    const revText = useRef(); // Référence pour le champ texte de la review
    let params = useParams(); // Récupère l'ID du film à partir des paramètres de la route
    const movieId = params.movieId;

    // Charge les données du film lorsqu'on accède à la page
    useEffect(() => {
        getMovieData(movieId); // Appelle la fonction pour récupérer les données du film
    }, [movieId, getMovieData]); // Dépend uniquement de `movieId` et `getMovieData`, pas de `reviews`

    // Fonction pour ajouter une review
    const addReview = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page

        try {
            const reviewBody = revText.current.value; // Capture la valeur du champ texte

            if (reviewBody.trim() === "") {
                console.log("Review text is empty.");
                return;
            }

            // Requête pour ajouter la review
            await api.post("/api/v1/reviews", { reviewBody, movieId });

            // Mettre à jour les reviews avec la nouvelle review ajoutée
            const updatedReviews = [...reviews, { body: reviewBody }];

            setReviews(updatedReviews); // Met à jour l'état avec la nouvelle liste des reviews
            revText.current.value = ""; // Réinitialise le champ texte après l'envoi

            console.log("Reviews after update:", updatedReviews); // Log pour vérifier la mise à jour des reviews
        } 
        catch (error) {
            console.error("Erreur lors de l'ajout de la review:", error);
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
                                    <Col>
                                        <p>{r.body}</p> {/* Affiche chaque review */}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>
                            </React.Fragment>
                        ))
                    ) : (
                        <p>No reviews yet.</p> // Message par défaut si aucune review n'existe
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Reviews;
