import React from 'react';
import '../styles/components/review.scss'

export default class Review extends React.Component {
    constructor() {
        super();
    }

    render() {
        const review = this.props.reviewData;
        return (
            <div className="review">
                <section className="review-container">
                    <img className="parent-picture" src={review.pictureParent}/>
                    <section className="sitterInfo">
                        <div className="icon-container">
                        </div>
                        <section class="review-details">
                            <p className="reviewRating">{review.rating} </p>
                            <p className="reviewName">{review.parentName} </p>
                            <p className="reviewDate">{review.date}</p>
                        </section>
                    </section>
                </section>
                <p className="review-text">{review.review}</p>
            </div>
        );
    }
}

