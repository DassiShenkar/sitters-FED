import React from "react";
import '../styles/components/filters.scss';

export default class FilterList extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedFilter: "availableNow"
            // availableNow: true,
            // rating: false,
            // workingHours: false,
            // favorites: false,
            // gender: false,
            // seeAll: false

        }
    }

    onChange(filterName) {
        switch (filterName) {
            case "availableNow":
                this.setState({selectedFilter : "availableNow"});
                break;
            case "rating":
                this.setState({selectedFilter : "rating"});
                break;
            case "workingHours":
                this.setState({selectedFilter : "workingHours"});
                break;
            case "favorites":
                this.setState({selectedFilter : "favorites"});
                break;
            case "gender":
                this.setState({selectedFilter : "gender"});
                break;
            case "seeAll":
                this.setState({selectedFilter : "seeAll"});
                break;
        }
    }

    render() {
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
                        <input id="available-now" value="available-now" type="radio" name="filter" onChange={this.onChange.bind(this, "workingHours")}/>
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
                {this.state.selectedFilter === "availableNow" ? <section className="available-now-box"><h3>Available Now</h3></section> : null}
                {this.state.selectedFilter === "rating"? <section className="rating-box"><h3>Rating</h3></section> : null}
                {this.state.selectedFilter === "workingHours"? <section className="working-hours-box"><h3>Working Hours</h3></section> : null}
                {this.state.selectedFilter === "favorites"? <section className="favorites-box"><h3>Favorites</h3></section> : null}
                {this.state.selectedFilter === "gender"? <section className="gender-box"><h3>Gender</h3></section> : null}
            </div>
        );
    }
}
