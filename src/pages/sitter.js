import React from 'react';
 import InvitesList from '../components/InvitesList';


export default class Sitter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invites: []
        }

    }

    componentDidMount() {
        this.getSitterDetails();
    }

    getSitterDetails() {
        $.ajax({
            url: 'https://sitters-ws.herokuapp.com/getSitterByEmail',
            dataType: 'json',
            type : 'post',
            contentType: 'application/json',
            data: JSON.stringify({ 'email': localStorage.email}),
            success: function (data) {
                this.setState({invites: data.invites,reviews: data.reviews, name: data.name, minAge: data.minAge, hourFee: data.hourFee,
                    maxAge: data.maxAge, rating: data.rating, sitterEmail: data.email, sitterPicture: data.fullPictureURL});
                localStorage.sitterEmail = data.email;
                localStorage.sitterName = data.name;
                //this.setState({topSitters: data});
                //console.log(data);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString()); //TODO: remove console.log
            }.bind(this)
        });
    }

    render() {
        return (
            <div className="sitter-wrapper">
                <header>
                    <section className="profilePicture">
                        <section className="hello">
                            <p >Hello</p>
                            <h3 className="sitter-name">{this.state.name}</h3>
                        </section>
                        <section className="invitesNumber">
                            <p >You got {this.state.invites.length} Invites</p>
                        </section>
                    </section>
                </header>
                <InvitesList allInvites={this.state.invites}/>
            </div>
        );
    }
}


