import React from "react";
import StarRatingComponent from 'react-star-rating-component';
import SitterList from '../components/SitterList';
import '../styles/components/filters.scss';

export default class FilterList extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedFilter: "availableNow",
            rating: 5,
            workingHours: "mornings",
            gender: "male",
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

    onChange(filterName) {
        switch (filterName) {
            case "availableNow":
                this.setState({selectedFilter: "availableNow"});
                if(!this.state.availableSitters) {
                    this.loadAvailableSittersFromServer();
                }
                break;
            case "rating":
                this.setState({selectedFilter: "rating"});
                this.state.availableSitters = this.loadAvailableSittersFromServer();
                break;
            case "workingHours":
                this.setState({selectedFilter: "workingHours"});
                break;
            case "favorites":
                this.setState({selectedFilter: "favorites"});
                break;
            case "gender":
                this.setState({selectedFilter: "gender"});
                break;
            case "seeAll":
                this.setState({selectedFilter: "seeAll"});
                this.state.allSitters = this.loadAllSittersFromServer();
                break;
            case "mornings":
                this.setState({selectedFilter: "mornings"});
                break;
            case "evenings":
                this.setState({selectedFilter: "evenings"});
                break;
            case "allDay":
                this.setState({selectedFilter: "allDay"});
                break;
            case "male":
                this.setState({selectedFilter: "male"});
                break;
            case "female":
                this.setState({selectedFilter: "female"});
                break;
        }

    }

    onHoursChange(timeOfDay) {
        switch (timeOfDay) {
            case "mornings":
                this.setState({workingHours : "mornings"});
                break;
            case "evenings":
                this.setState({workingHours : "evenings"});
                break;
            case "allDay":
                this.setState({workingHours : "allDay"});
                break;
        }
    }

    onGenderChange(gender) {
        switch (gender) {
            case "male":
                this.setState({gender : "male"});
                break;
            case "female":
                this.setState({gender : "female"});
                break;
        }
    }

    onStarClick(name, value) {
        this.setState({rating: value});
    }

    onFilterChange() {
        console.log("boom!");
    }

    render() {
        let available, favorites, topRated, workingHours, gender, seeAll;
        if(this.state.availableSitters && this.state.selectedFilter === "availableNow") {
            available = <SitterList className="sitters-available-now" title="AVAILABLE NOW" sittersData={this.state.availableSitters}/>;
        }
        if(this.state.topSitters && this.state.selectedFilter === "availableNow") {
            topRated = <SitterList className="sitters-top-rated" title="TOP RATED" sittersData={this.state.topSitters}/>;
        }
        if(this.state.sittersByHours && this.state.selectedFilter === "availableNow") {
            workingHours = <SitterList className="sitters-working-hours" title="WORKING HOURS" sittersData={this.state.sittersByHours}/>;
        }
        if(this.state.favoriteSitters && this.state.selectedFilter === "availableNow") {
            favorites = <SitterList className="sitters-favorites" title="MY FAVORITES" sittersData={this.state.favoriteSitters}/>;
        }
        if(this.state.sittersByGender && this.state.selectedFilter === "availableNow") {
            gender = <SitterList className="sitters-gender" title="GENDER" sittersData={this.state.sittersByGender}/>;
        }
        if(this.state.allSitters && this.state.selectedFilter === "seeAll") {
            seeAll = <SitterList className="sitters-see-all" title="ALL" sittersData={this.state.allSitters}/>;
        }
        return (
            <div className="filter-list" onChange={this.onChange.bind(this)}>
                <h1>Sort by</h1>
                <div>
                    <label htmlFor="available-now">Available Now
                        <input id="available-now" value="available-now" type="radio" name="filter" onChange={this.onChange.bind(this, "availableNow")}/>
                    </label>
                </div>
                <div>
                    <label htmlFor="rating">Rating
                        <input id="rating" value="rating" type="radio" name="filter" onChange={this.onChange.bind(this, "rating")}/>
                    </label>
                </div>
                <div>
                    <label htmlFor="working-hours">Working Hours
                        <input id="working-hours" value="available-now" type="radio" name="filter" onChange={this.onChange.bind(this, "workingHours")}/>
                    </label>
                </div>
                <div>
                    <label htmlFor="favorites">Favorites
                        <input id="favorites" value="favorites" type="radio" name="filter" onChange={this.onChange.bind(this, "favorites")}/>
                    </label>
                </div>
                <div>
                    <label htmlFor="gender">Gender
                        <input id="gender" value="gender" type="radio" name="filter" onChange={this.onChange.bind(this, "gender")}/>
                    </label>
                </div>
                <div>
                    <label htmlFor="see-all">See All
                        <input id="see-all" value="see-all" type="radio" name="filter" onChange={this.onChange.bind(this, "seeAll")}/>
                 </label>
                </div>
                {this.state.selectedFilter === "rating"? <section className="rating-box"><h3>Rating</h3><StarRatingComponent
                    name="rate1"
                    starCount={5}
                    value={this.state.rating}
                    onStarClick={this.onStarClick.bind(this)}
                /></section> : null}
                {this.state.selectedFilter === "workingHours"? <section className="working-hours-box"><h3>Working Hours</h3>
                    <div>
                        <label htmlFor="morning">Mornings
                            <input id="morning" value="morning" type="radio" name="working-hours-radio" onChange={this.onChange.bind(this, "mornings")}/>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="evening">Evenings
                            <input id="evening" value="evening" type="radio" name="working-hours-radio" onChange={this.onChange.bind(this, "evenings")}/>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="all-day">All day
                            <input id="all-day" value="all-day" type="radio" name="working-hours-radio" onChange={this.onChange.bind(this, "allDay")}/>
                        </label>
                    </div>
                </section> : null}
                {this.state.selectedFilter === "gender"? <section className="gender-box"><h3>Gender</h3>
                    <div>
                        <label htmlFor="male">Male
                            <input id="male" value="male" type="radio" name="gender-radio" onChange={this.onChange.bind(this, "male")}/>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="female">Female
                            <input id="female" value="female" type="radio" name="gender-radio" onChange={this.onChange.bind(this, "female")}/>
                        </label>
                    </div>
                </section> : null}
                <div class="btn btn-primary" onClick={this.onFilterChange}>Save filters</div>
                {available}
                {favorites}
                {topRated}
                {seeAll}
            </div>
        );
    }
}
