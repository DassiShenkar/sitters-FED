import React from "react";

export default class Sitter extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <a href="sitter.html">
                <ul className="sitter-score">
                    <li>
                        <div className="star-container">
                        </div>
                    </li>
                    <li>
                        {this.props.rating}
                    </li>
                </ul>
                <section className="sitter-info">
                    <img className="profile large-profile" src={this.props.profilePictureURL}/>
                    <h3 className="sitter-name">
                        {this.props.name}
                    </h3>
                </section>
            </a>
        );
    }
}
