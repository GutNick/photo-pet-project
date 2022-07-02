import React, {useEffect, useState} from "react";
import "./ImagePopup.css";

function ImagePopup(props) {
    useEffect(() => {
        if (!!props.photo.urls) {
            document.addEventListener('keydown', pressEscClose);
        } else {
            document.removeEventListener('keydown', pressEscClose);
        }
    }, [props.photo])

    function pressEscClose(e) {
        if (e.code === 'Escape') {
            props.onClose();
        }
    }

    function clickWrapperClose(e) {
        if (e.target === e.currentTarget) {
            props.onClose();
        }
    }

    function getAllUserPhotos() {
        sessionStorage.setItem('user', props.photo.user.username);
        props.setQueryMethod('User');
    }

    return (
        <div className={`image-popup ${!!props.photo.urls ? `image-popup_opened` : ''}`} onClick={clickWrapperClose}>
            <div className="image-popup__container">
                <img src={props.photo.urls ? props.photo.urls.regular : '/'}
                     alt={props.photo.urls ? (props.photo.alt_description !== null ? props.photo.alt_description : (props.photo.description !== null ? props.photo.description : 'photo from unsplash')) : ''}
                     className="image-popup__photo"/>
                <div className="image-popup__information">
                    <ul className="image-popup__information-list">
                        <li className="image-popup__information-item">
                            <a href={props.photo.links ? props.photo.links.html : '#'}
                               className="image-popup__information-link" target="_blank" rel="noreferrer">Original
                                image</a>
                        </li>
                        <li className="image-popup__information-item">Photo by&nbsp;
                            <a href={props.photo.user ? props.photo.user.links.html : '#'}
                               className="image-popup__information-link" target="_blank" rel="noreferrer">
                                {props.photo.user ?
                                    `${props.photo.user.first_name ? props.photo.user.first_name : ''}${props.photo.user.last_name ? ' ' + props.photo.user.last_name : ''}` :
                                    'Unknown'
                                }
                            </a>
                            {` on `}
                            <a href="https://unsplash.com/" className="image-popup__information-link" target="_blank"
                               rel="noreferrer">Unsplash</a></li>
                    </ul>
                    <button className={`image-popup__button ${props.queryMethod === 'User' ? 'image-popup__button_hidden' : ''}`} onClick={getAllUserPhotos}>See all author photos</button>
                </div>
            </div>
        </div>
    );
}

export default ImagePopup;