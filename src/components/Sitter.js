import React from 'react';
import Star from '../styles/icons/Star';
import '../styles/components/sitter.scss';

export default class Sitter extends React.Component {
    constructor() {
        super();
    }

    render() {
        const css = {background: 'url('+this.props.fullPictureURL+') no-repeat center center ' + '/cover'};
        const siiterLink = '/sitters/' + this.props.email;
        return (
            <a className="sitter-item" href={siiterLink}>
                <section className="sitter" style={css}>
                        <ul className="sitter-score">
                            <li>
                                <div className="rating-star-container">
                                    <Star/>
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
