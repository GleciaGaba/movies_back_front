import React from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import './Trailer.css';

const Trailer = () => {
    // Utiliser "ytTrailerId" pour correspondre à la route
    const { ytTrailerId } = useParams();
    
    return (
        <div className="react-player-container">
            {ytTrailerId ? (
                <ReactPlayer
                    controls={true} 
                    playing={true} 
                    url={`https://www.youtube.com/watch?v=${ytTrailerId}`} 
                    width="100%"
                    height="100%"
                />
            ) : (
                <p>Aucune vidéo disponible.</p>
            )}
        </div>
    );
};

export default Trailer;
