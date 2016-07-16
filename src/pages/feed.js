import React from 'react';
import ProfileImg from '../components/ProfileImg';
import FilterList from '../components/FilterList';
import Filter from '../styles/icons/Filter';
import Calendar from '../styles/icons/Calendar';
import '../styles/components/feed.scss';
import DateTimeField from 'react-bootstrap-datetimepicker';

export default class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {parentData: {name: localStorage.name, email: localStorage.email,
            profilePictureURL: localStorage.profilePicture}, showFilter: false, startDate: "", endDate: "", date: "2016-07-17-16-50",
            format: "YYYY-MM-DD-HH-mm",
            inputFormat: "DD/MM/YYYY HH:mm",
            mode: "dateTime"};
    }

    onFilterClick() {
        this.setState({showFilter : !this.state.showFilter});
    }

    handleStartTimeChange(newStartDate) {
        localStorage.startDate = newStartDate;
        return this.setState({startDate: newStartDate});
    }

    handleEndTimeChange(newEndDate) {
        localStorage.endDate = newEndDate;
        return this.setState({endDate: newEndDate});
    }

    render() {
        const {date, format, mode, inputFormat} = this.state;
        return (
            <div id="feed">
                <header>
                    <ProfileImg profilePicture={this.state.parentData.profilePictureURL} username={this.state.parentData.name}/>
                    <section className="greeting">
                        <p>Hello</p>
                        <h3 className="name">{this.state.parentData.name}</h3>
                    </section>
                    <section>
                        <a className="filter-btn" onClick={this.onFilterClick.bind(this)}>
                            <Filter/>
                        </a>
                        <Calendar/>
                    </section>
                    <DateTimeField dateTime={date} format={format} inputFormat={inputFormat} onChange={this.handleStartTimeChange.bind(this)} viewMode={mode}/>
                    <DateTimeField dateTime={date} format={format} inputFormat={inputFormat} onChange={this.handleEndTimeChange.bind(this)} viewMode={mode}/>
                </header>
                {this.state.showFilter ? <FilterList onFilterChange={this.onFilterChange} className="filter"/> : null}
            </div>
        );
    }
}


