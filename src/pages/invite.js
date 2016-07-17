import React from 'react';
import DateTimeField from 'react-bootstrap-datetimepicker';
import Clock from '../styles/icons/Clock';
import Calendar from '../styles/icons/Calendar';
import Location from '../styles/icons/Location';
import '../styles/components/invite.scss'

export default class Invite extends React.Component {
    constructor() {
        super();
        this.state = {
            reoccurring: "none",
            msg: "",
            allergies: "apple, banana",
            personalMsg: "",
            startDate: "",
            endDate: "",
            date: "2016-07-17" + " 16:50",
            format: "YYYY-MM-DD HH:mm",
            inputFormat: "DD/MM/YYYY HH:mm",
            mode: "dateTime"
        };
            localStorage.startDate = "2016-07-17" + " 16:50";
            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleAllergiesChange = this.handleAllergiesChange.bind(this);
            this.handleMsgChange = this.handleMsgChange.bind(this);
            this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
            this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    }

    onChange(reoccurring) {
        this.setState({reoccurring: reoccurring});
    }

    handleSubmit() {
        const allergiesList = this.state.allergies.split(',');
        $.ajax({
            url: 'https://sitters-ws.herokuapp.com/insertInvite',
            dataType: 'json',
            type : 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                sitterEmail: localStorage.sitterEmail,
                parentEmail: localStorage.email,
                street: localStorage.address,
                date: localStorage.startDate.split(' ')[0],
                startTime: localStorage.startDate.split(' ')[1],
                endTime: localStorage.endDate.split(' ')[1],
                msg: this.state.personalMsg,
                recurring: this.state.reoccurring,
                allergies: allergiesList

            }),
            success: function (data) {
                this.setState({data: data});
                location.replace("feed");
            }.bind(this),
            error: function(xhr, status, err) {
                //TODO: in error
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    handleStartTimeChange(newStartDate) {
        localStorage.startDate = newStartDate;
        return this.setState({startDate: newStartDate});
    }

    handleEndTimeChange(newEndDate) {
        localStorage.endDate = newEndDate;
        return this.setState({endDate: newEndDate});
    }

    handleAllergiesChange(e) {
        this.setState({allergies: e.target.value});
    }

    handleMsgChange(e) {
        this.setState({personalMsg: e.target.value});
    }

    render() {
        const {date, format, mode, inputFormat, allergies} = this.state;
        const sitterName = localStorage.sitterName.split(' ')[0];
        return (
        <section className="invite-page">
            <header className="invite-header">
                <section className="invite-info">
                    <p>
                        <span>Invite&nbsp;</span>
                        <span className="invite-sitter-name">{sitterName}</span>
                        <span>&nbsp;</span>
                        <span>to take care of</span>
                    </p>
                    <img className="child-img" src={localStorage.childPicture}/>
                    <h3 className="child-name">{localStorage.childName}</h3>
                </section>
            </header>
            <form className="commentForm">
                <section className="invite-icon-list">
                    <section className="invite-icon">
                        <Calendar/>
                        <DateTimeField className="date-picker" dateTime={date} format={format} inputFormat={inputFormat} onChange={this.handleStartTimeChange} viewMode={mode}/>
                    </section>
                    <section className="invite-icon">
                        <Clock/>
                        <DateTimeField className="date-picker" dateTime={date} format={format} inputFormat={inputFormat} onChange={this.handleEndTimeChange} viewMode={mode}/>
                    </section>
                    <section className="invite-icon">
                        <Location/>
                        <p className="invite-address">{localStorage.address}</p>
                    </section>
                </section>
                <section className="radio-group rec-radio">
                    <h4 className="rec-title">Reoccurring</h4>
                    <ul className="reccur-radio">
                        <li>
                            <input id="none" className="radio-inline" value="none" type="radio" name="reoccurring" onChange={this.onChange.bind(this, "none")}/>
                            <label htmlFor="none">None</label>
                        </li>
                        <li>
                            <input id="weekly" className="radio-inline" value="weekly" type="radio" name="reoccurring" onChange={this.onChange.bind(this, "weekly")}/>
                            <label htmlFor="weekly">Weekly</label>
                        </li>
                        <li>
                            <input id="monthly" className="radio-inline" value="monthly" type="radio" name="reoccurring" onChange={this.onChange.bind(this, "monthly")}/>
                            <label htmlFor="monthly">Monthly</label>
                        </li>
                    </ul>
                </section>
                <textarea value={allergies} onChange={this.handleAllergiesChange} name="allergies" placeholder="enter allergy details" id="aller" cols="1" rows="1"/>
                <textarea name="msg" onChange={this.handleMsgChange} placeholder="write a personal message" id="msg" cols="1" rows="4"/>
            </form>

                <a className="submit-invite" onClick={this.handleSubmit}>Send Invitation</a>

        </section>
        );
    }
}
