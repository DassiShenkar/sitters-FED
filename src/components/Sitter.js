import React from 'react';
import '../styles/components/sitter.scss';

export default class Sitter extends React.Component {
    constructor() {
        super();
    }

    render() {
        const css = {background: 'url('+this.props.fullPictureURL+') no-repeat center center'};
        const siiterLink = '/sitters/' + this.props.email;
        return (
            <a className="sitter-item" href={siiterLink}>
                <section className="sitter" style={css}>
                        <ul className="sitter-score">
                            <li>
                                <div className="star-container">
                                </div>
                            </li>
                            <li>
                                {this.props.rating}
                            </li>
                        </ul>
                        <img className="profile sitter-profile" src={this.props.profilePictureURL}/>
                        <h3 className="name">{this.props.name}</h3>
                </section>
            </a>
        );
    }
}
