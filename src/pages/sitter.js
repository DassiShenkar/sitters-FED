import React from 'react';
import InvitesList from '../components/InvitesList';
import ProfileImg from '../components/ProfileImg';
import '../styles/components/sitterHeader.scss';


export default class Sitter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invites: []
        }

        setInterval(this.getSitterDetails.bind(this), 1000);

    }

    getSitterDetails() {
        $.ajax({
            url: 'https://sitters-ws.herokuapp.com/getSitterByEmail',
            dataType: 'json',
            type : 'post',
            contentType: 'application/json',
            data: JSON.stringify({ 'email': localStorage.email}),
            success: function (data) {
                this.setState({invites: data.invites});
                localStorage.sitterEmail = data.email;
                localStorage.sitterName = data.name;
                localStorage.sitterProfilePicture = data.profilePictureURL;
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString()); //TODO: remove console.log
            }.bind(this)
        });
    }

    render() {
        return (
            <div id="sitter-wrapper">
                <header>
                    <section className="parent-profile">
                        <ProfileImg profilePicture={localStorage.sitterProfilePicture} username={localStorage.sitterName}/>
                        <section className="greeting">
                            <p >Hello</p>
                            <h3 className="parent-name">{localStorage.sitterName}</h3>
                            <p >You have {this.state.invites === null ? 0 : this.state.invites.length} Invites</p>
                        </section>
                    </section>
                </header>
                <InvitesList allInvites={this.state.invites}/>
            </div>
        );
    }
}


