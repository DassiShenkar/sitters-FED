import React from 'react';
import ProfileImg from '../components/ProfileImg';
import '../styles/components/feed.scss';

export default class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {parentData: [], sitterData: []};
    }

    componentDidMount() {
        this.loadParentFromServer();
        this.loadSittersFromServer();
        setInterval(this.loadParentFromServer.bind(this), 2000);
    }

    loadParentFromServer() {
        $.ajax({
            url: 'https://sitters-ws.herokuapp.com/getParentbyEmail',
            dataType: 'json',
            type : 'post',
            contentType: 'application/json',
            data: JSON.stringify({ 'email': 'parent1@gmail.com'}),
            success: function (data) {
                this.setState({parentData: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    loadSittersFromServer() {
        $.ajax({
            url: 'http://localhost:3000/getAvailableNowSitters',
            dataType: 'json',
            success: function (data) {
                this.setState({sitterData: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    render() {
        return (
            <header>
                <ProfileImg profilePicture={this.state.parentData.profilePictureURL} username={this.state.parentData.name}/>
                <section>
                    <p className="greeting">Hello</p>
                    <h3 className="name">{this.state.parentData.name}</h3>
                </section>
            </header>
        );
    }
}


