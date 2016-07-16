import React from "react";
import StarRatingComponent from 'react-star-rating-component';
import SitterList from '../components/SitterList';
// import Bell from '../styles/icons/Bell';
import '../styles/components/filters.scss';

export default class FilterList extends React.Component {

    constructor() {
        super();
        this.state = {
            selectedFilter: "availableNow",
            subFilter: "mornings",
            genderFilter: "female",
            rating: 5,
            workingHours: "mornings",
            availableSitters: null,
            favoriteSitters: null,
            topSitters: null,
            sittersByGender: null,
            sittersByHours: null,
            allSitters: null
        }
    }

    componentDidMount() {
        this.loadAvailableSittersFromServer();
    }

    loadAllSittersFromServer() {
        $.ajax({
            url: 'https://sitters-ws.herokuapp.com/getAllSitters',
            dataType: 'json',
            success: function (data) {
                this.setState({allSitters: data});
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

    loadTopSittersFromServer() {
        $.ajax({
            url: 'https://sitters-ws.herokuapp.com/getSittersByRating',
            dataType: 'json',
            type : 'post',
            contentType: 'application/json',
            data: JSON.stringify({ 'rating': this.state.rating}),
            success: function (data) {
                this.setState({topSitters: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString()); //TODO: remove console.log
            }.bind(this)
        });
    }

    loadParentFavoriteSittersFromServer() {
        $.ajax({
            url: 'https://sitters-ws.herokuapp.com/getParentFavoriteSitters',
            dataType: 'json',
            type : 'post',
            contentType: 'application/json',
            data: JSON.stringify({ 'email': localStorage.email}),
            success: function (data) {
                this.setState({favoriteSitters: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString()); //TODO: remove console.log
            }.bind(this)
        });
    }

    loadByWorkingHours(workingHours) {
        $.ajax({
            url: 'https://sitters-ws.herokuapp.com/getSittersByWorkingHours',
            dataType: 'json',
            type : 'post',
            contentType: 'application/json',
            data: JSON.stringify({ 'workingHours': workingHours}),
            success: function (data) {
                this.setState({sittersByHours: data});
                console.log(data);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString()); //TODO: remove console.log
            }.bind(this)
        });
    }

    loadSittersByGender(gender) {
        $.ajax({
            url: 'https://sitters-ws.herokuapp.com/getSitterByGender',
            dataType: 'json',
            type : 'post',
            contentType: 'application/json',
            data: JSON.stringify({ 'gender': gender}),
            success: function (data) {
                this.setState({sittersByGender: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString()); //TODO: remove console.log
            }.bind(this)
        });
    }

    onChange(filterName) {
        switch (filterName) {
            case "availableNow":
                this.setState({selectedFilter: "availableNow"});
                if(!this.state.availableSitters) {
                    this.loadAvailableSittersFromServer();
                }
                break;
            case "rating":
                this.setState({selectedFilter: "topSitters"});
                this.loadTopSittersFromServer();
                break;
            case "workingHours":
                this.setState({selectedFilter: "workingHours"});
                this.loadByWorkingHours("All day");
                break;
            case "favorites":
                this.setState({selectedFilter: "favorites"});
                break;
            case "gender":
                this.setState({selectedFilter: "gender"});
                this.loadSittersByGender("female");
                break;
            case "seeAll":
                this.setState({selectedFilter: "seeAll"});
                this.loadAllSittersFromServer();
                break;
            case "mornings":
                this.setState({subFilter: "mornings"});
                this.loadByWorkingHours("Mornings");
                break;
            case "evenings":
                this.setState({subFilter: "evenings"});
                this.loadByWorkingHours("Evenings");
                break;
            case "allDay":
                this.setState({subFilter: "allDay"});
                this.loadByWorkingHours("All day");
                break;
            case "male":
                this.setState({genderFilter: "male"});
                this.loadSittersByGender("male");
                break;
            case "female":
                this.setState({genderFilter: "female"});
                this.loadSittersByGender("female");
                break;
        }

    }

    onStarClick(name, value) {
        this.setState({rating: value});
    }

    render() {
        let available, favorites, topRated, workingHours, gender, seeAll;
        if(this.state.availableSitters && this.state.selectedFilter === "availableNow") {
            available = <SitterList className="sitters-available-now" title="AVAILABLE NOW" sittersData={this.state.availableSitters}/>;
        }
        if(this.state.topSitters && this.state.selectedFilter === "topSitters") {
            topRated = <SitterList className="sitters-top-rated" title="TOP RATED" sittersData={this.state.topSitters}/>;
        }
        if(this.state.sittersByHours && this.state.selectedFilter === "workingHours") {
            workingHours = <SitterList className="sitters-working-hours" title="WORKING HOURS" sittersData={this.state.sittersByHours}/>;
        }
        if(this.state.favoriteSitters && this.state.selectedFilter === "favorites") {
            favorites = <SitterList className="sitters-favorites" title="MY FAVORITES" sittersData={this.state.favoriteSitters}/>;
        }
        if(this.state.sittersByGender && (this.state.selectedFilter === "gender")) {
            gender = <SitterList className="sitters-gender" title="GENDER" sittersData={this.state.sittersByGender}/>;
        }
        if(this.state.allSitters && this.state.selectedFilter === "seeAll") {
            seeAll = <SitterList className="sitters-see-all" title="ALL" sittersData={this.state.allSitters}/>;
        }
        return (
            <div className="filter-list" onChange={this.onChange.bind(this)}>
                <h1 className="filter-list-title">Sort by</h1>
                <ul className="main-filter">
                    <li className="filter-option">
                        <label htmlFor="available-now">Available Now</label>
                        <input id="available-now" value="available-now" type="radio" checked={this.state.selectedFilter === "availableNow"} name="filter" onChange={this.onChange.bind(this, "availableNow")}/>
                    </li>
                    <li className="filter-option">
                        <label htmlFor="rating">Rating</label>
                        <input id="rating" value="rating" type="radio" checked={this.state.selectedFilter === "topSitters"} name="filter" onChange={this.onChange.bind(this, "rating")}/>
                    </li>
                    <li className="filter-option">
                        <label htmlFor="working-hours">Working Hours</label>
                        <input id="working-hours" value="working-hours" checked={this.state.selectedFilter === "workingHours"} type="radio" name="filter" onChange={this.onChange.bind(this, "workingHours")}/>
                    </li>
                    <li className="filter-option">
                        <label htmlFor="favorites">Favorites</label>
                        <input id="favorites" value="favorites" type="radio" checked={this.state.selectedFilter === "favorites"} name="filter" onChange={this.onChange.bind(this, "favorites")}/>
                    </li>
                    <li className="filter-option">
                        <label htmlFor="gender">Gender</label>
                        <input id="gender" value="gender" type="radio" checked={this.state.selectedFilter === "gender"} name="filter" onChange={this.onChange.bind(this, "gender")}/>
                    </li>
                    <li className="filter-option">
                        <label htmlFor="see-all">See All</label>
                        <input id="see-all" value="see-all" type="radio" checked={this.state.selectedFilter === "seeAll"} name="filter" onChange={this.onChange.bind(this, "seeAll")}/>
                    </li>
                </ul>
                {this.state.selectedFilter === "topSitters"? <section className="main-filter"><h3>Rating</h3><StarRatingComponent
                    name="rate1"
                    starCount={5}
                    value={this.state.rating}
                    onStarClick={this.onStarClick.bind(this)}
                /></section> : null}
                {this.state.selectedFilter === "workingHours"? <section className="main-filter"><h3>Working Hours</h3>
                    <ul>
                        <li className="filter-option">
                            <label htmlFor="morning">Mornings</label>
                            <input id="morning" value="morning" type="radio" checked={this.state.subFilter === "mornings"} name="working-hours-radio" onChange={this.onChange.bind(this, "mornings")}/>
                        </li>
                        <li className="filter-option">
                            <label htmlFor="evening">Evenings</label>
                            <input id="evening" value="evening" type="radio" checked={this.state.subFilter === "evenings"} name="working-hours-radio" onChange={this.onChange.bind(this, "evenings")}/>
                        </li>
                        <li className="filter-option">
                            <label htmlFor="all-day">All day</label>
                            <input id="all-day" value="all-day" type="radio" checked={this.state.subFilter === "allDay"} name="working-hours-radio" onChange={this.onChange.bind(this, "allDay")}/>
                        </li>
                    </ul>
                </section> : null}
                {this.state.selectedFilter === "gender"? <section className="main-filter"><h3>Gender</h3>
                    <ul>
                        <li className="filter-option">
                            <label htmlFor="male">Male</label>
                            <input id="male" value="male" type="radio" checked={this.state.genderFilter === "male"} name="gender-radio" onChange={this.onChange.bind(this, "male")}/>
                        </li>
                        <li className="filter-option">
                            <label htmlFor="female">Female</label>
                                <input id="female" value="female" type="radio" checked={this.state.genderFilter === "female"} name="gender-radio" onChange={this.onChange.bind(this, "female")}/>
                        </li>
                    </ul>
                </section> : null}
                {available}
                {favorites}
                {topRated}
                {workingHours}
                {gender}
                {seeAll}
            </div>
        );
    }
}
