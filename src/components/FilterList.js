import React from "react";
import StarRatingComponent from 'react-star-rating-component';
import '../styles/components/filters.scss';

export default class FilterList extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedFilter: "availableNow",
            rating: 5,
            workingHours: "mornings",
            gender: "male"

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
                console.log(1);
                break;
            case "female":
                this.setState({gender : "female"});
                console.log(2);
                break;
        }
    }



    onStarClick(name, value) {
        this.setState({rating: value});
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
                            <input id="morning" value="morning" type="radio" name="working-hours-radio" onChange={this.onHoursChange.bind(this, "mornings")}/>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="evening">Evenings
                            <input id="evening" value="evening" type="radio" name="working-hours-radio" onChange={this.onHoursChange.bind(this, "evenings")}/>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="all-day">All day
                            <input id="all-day" value="all-day" type="radio" name="working-hours-radio" onChange={this.onHoursChange.bind(this, "allDay")}/>
                        </label>
                    </div>
                </section> : null}
                {this.state.selectedFilter === "gender"? <section className="gender-box"><h3>Gender</h3>
                    <div>
                        <label htmlFor="male">Male
                            <input id="male" value="male" type="radio" name="gender-radio" onChange={this.onGenderChange.bind(this, "male")}/>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="female">Female
                            <input id="female" value="female" type="radio" name="gender-radio" onChange={this.onGenderChange.bind(this, "female")}/>
                        </label>
                    </div>
                </section> : null}
            </div>
        );
    }
}
