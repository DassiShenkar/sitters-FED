import React from 'react';
import ProfileImg from '../components/ProfileImg';
import SitterList from '../components/SitterList';
import FilterList from '../components/FilterList';
import Filter from '../styles/icons/Filter';
import Calendar from '../styles/icons/Calendar';
import '../styles/components/feed.scss';

export default class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {parentData: {name: localStorage.name, email: localStorage.email,
            profilePictureURL: localStorage.profilePicture}, availableSitters: null, favoriteSitters: null,
            topSitters: null, showFilter: false};
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

    onFilterClick(e) {
        e.preventDefault();
        this.setState({showFilter : !this.state.showFilter});
    }

    render() {
        let available, favorites, topRated;
        if(this.state.availableSitters) {
            available = <SitterList className="sitters-available-now" title="AVAILABLE NOW" sittersData={this.state.availableSitters}/>;
        }
        if(this.state.favoriteSitters) {
            favorites = <SitterList className="sitters-favorites" title="MY FAVORITES" sittersData={this.state.favoriteSitters}/>;
        }
        if(this.state.topSitters) {
            topRated = <SitterList className="sitters-top-rated" title="TOP RATED" sittersData={this.state.topSitters}/>;
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
                        <div className="filter-btn" onClick={this.onFilterClick.bind(this)}>
                            <Filter/>
                        </div>
                    </section>
                </header>
                {this.state.showFilter ? <FilterList className="filter"/> : null}
                {available}
                {favorites}
                {topRated}
            </div>
        );
    }
}


