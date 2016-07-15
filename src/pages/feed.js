import React from 'react';
import ProfileImg from '../components/ProfileImg';
import SitterList from '../components/SitterList';
import Filter from '../styles/icons/Filter';
import Calendar from '../styles/icons/Calendar';
import '../styles/components/feed.scss';

export default class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {parentData: {name: localStorage.name, email: localStorage.email, profilePictureURL: localStorage.profilePicture}, availableSitters: null, favoriteSitters: null, topSitters: null};
    }

    componentDidMount() {
        this.loadAvailableSittersFromServer();
        // this.loadParentFavoriteSittersFromServer();
        // this.loadTopSittersFromServer();
        // setInterval(this.loadParentFavoriteSittersFromServer.bind(this), 3000);
        setInterval(this.loadAvailableSittersFromServer.bind(this), 3000);
        // setInterval(this.loadTopSittersFromServer.bind(this), 3000);
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
                console.error(this.props.url, status, err.toString()); //TODO: remove console.log
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
        let available, favorites, topRated;
        if(this.state.availableSitters) {
            available = <SitterList id="sitters-available-now" title="Available Now" sittersData={this.state.availableSitters}/>;
        }
        if(this.state.favoriteSitters) {
            favorites = <SitterList id="sitters-favorites" title="My Favorites" sittersData={this.state.favoriteSitters}/>;
        }
        if(this.state.topSitters) {
            topRated = <SitterList id="sitters-top-rated" title="Top Rated" sittersData={this.state.topSitters}/>;
        }
        return (
            <div id="feed">
                <header>
                    <ProfileImg profilePicture={this.state.parentData.profilePictureURL} username={this.state.parentData.name}/>
                    <section className="greeting">
                        <p>Hello</p>
                        <h3 className="name">{this.state.parentData.name}</h3>
                    </section>
                    <section>
                        <Calendar/>
                        <Filter/>
                    </section>
                </header>
                {available}
                {favorites}
                {topRated}
            </div>
        );
    }
}


