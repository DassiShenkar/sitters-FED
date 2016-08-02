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
            msg: " ",
            allergies: "dust, peanuts",
            personalMsg: "",
            startDate: "2016-08-03 08:00",
            endDate: "2016-08-03 11:00",
            format: "YYYY-MM-DD HH:mm",
            inputFormat: "DD/MM/YYYY HH:mm",
            mode: "dateTime"
        };
        localStorage.startDate = this.state.startDate;
        localStorage.endDate = this.state.endDate;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAllergiesChange = this.handleAllergiesChange.bind(this);
        this.handleMsgChange = this.handleMsgChange.bind(this);
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    }

    onChange(reoccurring) {
        this.setState({reoccurring: reoccurring});
    }

    handleSubmit(e) {
        e.preventDefault();
        const allergiesList = this.state.allergies.split(',');
        $.ajax({
            url: 'https://sitters-ws.herokuapp.com/insertInvite',
            dataType: 'json',
            type: 'post',
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
            error: function (xhr, status, err) {
                console.error(err.toString());
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
        const {startDate, endDate, format, mode, inputFormat, allergies} = this.state;
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
                <form className="commentForm" onSubmit={this.handleSubmit}>
                    <section className="invite-icon-list">
                        <section className="invite-icon">
                            <Calendar/>
                            <DateTimeField className="date-picker" dateTime={startDate} format={format}
                                           inputFormat={inputFormat} onChange={this.handleStartTimeChange}
                                           viewMode={mode}/>
                        </section>
                        <section className="invite-icon">
                            <Clock/>
                            <DateTimeField className="date-picker" dateTime={endDate} format={format}
                                           inputFormat={inputFormat} onChange={this.handleEndTimeChange}
                                           viewMode={mode}/>
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
                                <input id="none" className="radio-inline" value="none" type="radio" name="reoccurring"
                                       checked={this.state.reoccurring === "none"}
                                       onChange={this.onChange.bind(this, "none")}/>
                                <label htmlFor="none">None</label>
                            </li>
                            <li>
                                <input id="weekly" className="radio-inline" value="weekly" type="radio"
                                       name="reoccurring" checked={this.state.reoccurring === "weekly"}
                                       onChange={this.onChange.bind(this, "weekly")}/>
                                <label htmlFor="weekly">Weekly</label>
                            </li>
                            <li>
                                <input id="monthly" className="radio-inline" value="monthly" type="radio"
                                       name="reoccurring" checked={this.state.reoccurring === "monthly"}
                                       onChange={this.onChange.bind(this, "monthly")}/>
                                <label htmlFor="monthly">Monthly</label>
                            </li>
                        </ul>
                    </section>
                    <section className="textarea-invite">
                        <h4 className="rec-title align-left">Allergies</h4>
                        <textarea value={allergies} onChange={this.handleAllergiesChange} name="allergies"
                                  placeholder="enter allergy details" id="aller" cols="1" rows="1"/>
                        <h4 className="rec-title align-left">Personal Message</h4>
                        <textarea name="msg" onChange={this.handleMsgChange} placeholder="write a personal message"
                                  id="msg" cols="1" rows="4"/>
                    </section>
                    <input type="submit" className="submit-invite" value="Send Invitation"/>
                </form>
            </section>
        );
    }
}
