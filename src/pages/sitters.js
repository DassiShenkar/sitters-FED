import React from 'react';
import ReviewList from "../components/ReviewList";

export default class SitterProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {reviews: [], email: this.props.params.sitter, name: "", minAge: 0, hourFee: "",
            maxAge: 5, rating: "", sitterEmail: "", sitterPicture: ""};
    }

    componentDidMount() {
        this.loadSitterFromServer();
    }

    loadSitterFromServer() {
        $.ajax({
            url: "https://sitters-ws.herokuapp.com/getSitterByEmail",
            dataType: 'json',
            contentType: "application/json",
            type: 'POST',
            data: JSON.stringify({email : this.state.email}),
            success: function (data) {
                this.setState({reviews: data.reviews, name: data.name, minAge: data.minAge, hourFee: data.hourFee,
                    maxAge: data.maxAge, rating: data.rating, siiterEmail: data.email, sitterPicture: data.fullPictureURL});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    render() {
        const css = {background: 'url('+this.state.sitterPicture+') no-repeat center center', backgroundSize: 'cover'};
        const mailto = "mailto:" + this.state.email;
        const inviteLink = '/sendInvite';
        return (
            <div>
                <header style={css}>
                    <section id="profilePicture">
                        <section class="profilePicture">
                            <p class="greeting">Say Hello to</p>
                            <h3 class="name">{this.state.name}</h3>
                        </section>
                        <section class="knowMore">
                            <p class="greeting">GET TO KNOW {this.state.name}</p>
                            <a href="#">See more</a>
                        </section>
                    </section>
                </header>
                <table class="tableInfo">
                    <thead>
                        <th class="icon">
                        </th>
                        <th class="icon">
                        </th>
                        <th class="icon">
                        </th>
                    </thead>
                    <tbody>
                    <tr class="middleRow">
                        <td>{this.state.hourFee}$</td>
                        <td>{this.state.rating}</td>
                        <td>{this.state.minAge}-{this.state.maxAge}</td>
                    </tr>
                    <tr class="lastRow">
                        <td>Hour fee</td>
                        <td>Rating</td>
                        <td>Years</td>
                    </tr>
                    </tbody>
            </table>
                <ReviewList allReviews={this.state.reviews}/>
            <section class="contact-sitter">
            <p>Have a question? <span><a href={mailto}>Contact {this.state.name}</a></span></p>
            </section>
            <a class="submit-invite" href={inviteLink}>
            <div class="book-now">
            <img src="static/images/book.png"/>
            <p>Book now</p>
        </div>
        </a>
    </div>
        );
    }
}










