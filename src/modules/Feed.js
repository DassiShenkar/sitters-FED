import React from 'react';
import ProfileImg from '../components/ProfileImg';
import SitterList from '../components/SitterList';
import '../styles/components/feed.scss';

export default class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {parentData: [], availableSitters: [], favoriteSitters: [], topSitters: []};
    }

    componentDidMount() {
        this.loadParentFromServer();
        this.loadAvailableSittersFromServer();
        this.loadParentFavoriteSittersFromServer();
        this.loadTopSittersFromServer();
        setInterval(this.loadParentFavoriteSittersFromServer.bind(this), 3000);
        setInterval(this.loadAvailableSittersFromServer.bind(this), 3000);
        setInterval(this.loadTopSittersFromServer.bind(this), 3000);
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

    loadAvailableSittersFromServer() {
        $.ajax({
            url: 'https://sitters-ws.herokuapp.com/getAvailableNowSitters',
            dataType: 'json',
            success: function (data) {
                this.setState({availableSitters: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    loadParentFavoriteSittersFromServer() {
        $.ajax({
            url: 'https://sitters-ws.herokuapp.com/getParentFavoriteSitters',
            dataType: 'json',
            type : 'post',
            contentType: 'application/json',
            data: JSON.stringify({ 'email': 'parent1@gmail.com'}),
            success: function (data) {
                this.setState({favoriteSitters: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    loadTopSittersFromServer() {
        $.ajax({
            url: 'https://sitters-ws.herokuapp.com/getTopRatedSitters',
            dataType: 'json',
            success: function (data) {
                this.setState({topSitters: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    render() {
        return (
            <div id="feed">
                <header>
                    <ProfileImg profilePicture={this.state.parentData.profilePictureURL} username={this.state.parentData.name}/>
                    <section>
                        <p className="greeting">Hello</p>
                        <h3 className="name">{this.state.parentData.name}</h3>
                    </section>
                </header>
                <SitterList id="sitters-available-now" title="Available Now" sittersData={this.state.availableSitters}/>
                <SitterList id="sitters-favorites" title="My Favorites" sittersData={this.state.favoriteSitters}/>
                <SitterList id="sitters-top-rated" title="Top Rated" sittersData={this.state.topSitters}/>
            </div>
        );
    }
}


