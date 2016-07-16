import React from "react";
import Review from "./Review";

export default class ReviewList extends React.Component {
    constructor() {
        super();
    }

    render() {
        const reviewNodes = this.props.allReviews.map((review, index) => <Review key={index} reviewData={review} />);
        return (
                <div className="review-list">{reviewNodes}</div>
        );
    }
}
