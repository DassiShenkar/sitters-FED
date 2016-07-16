import React from 'react';
import DateTimeField from 'react-bootstrap-datetimepicker';

export default class Invite extends React.Component {
    constructor() {
        super();
        this.state = {reoccurring: "none", startDate: "", endDate: "", date: "2016-07-17-16-50",
            format: "YYYY-MM-DD-HH-mm",
            inputFormat: "DD/MM/YYYY HH:mm",
            mode: "dateTime"};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChange(reoccurring) {
        this.setState({reoccurring: reoccurring});
    }

    handleSubmit(e) {
        e.preventDefault();
        let inviteInfo = {
            allergies: this.refs.allergies,
            personalMsg: this.refs.msg
        };
        $.ajax({
            url: 'https://sitters-ws.herokuapp.com/insertInvite',
            dataType: 'json',
            type : 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                sitterEmail: "sitter1@gmail.com",
                parentEmail: localStorage.email,
                street: localStorage.address,
                date: localStorage.startDate.split(" ")[0],
                startTime: localStorage.startDate.split(" ")[1],
                endTime: localStorage.endDate.split(" ")[1],
                // personalMsg: inviteInfo.personalMsg,
                recurring: this.state.reoccurring,
                allergies: ["jczxcj", "jcjzskjck"]

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

    render() {
        const {date, format, mode, inputFormat} = this.state;
        return (
        <form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
            <table class="tableInfo">
                <thead>
                <th class="icon">
                </th>
                <th class="icon">
                </th>
                <th class="icon">
                </th>
                </thead>
                <tbody>
                <tr class="middleRow">
                    <td><p>Arlozorov 52 Tel Aviv</p></td>
                </tr>
                </tbody>
            </table>
            <label>Reoccurring</label>
            <div>
                <label htmlFor="none">None
                    <input id="none" className="radio-inline" value="none" type="radio" name="reoccurring" onChange={this.onChange.bind(this, "none")}/>
                </label>
            </div>
            <div>
                <label htmlFor="weekly">Weekly
                    <input id="weekly" className="radio-inline" value="weekly" type="radio" name="reoccurring" onChange={this.onChange.bind(this, "weekly")}/>
                </label>
            </div>
            <div>
                <label htmlFor="monthly">Monthly
                    <input id="monthly" className="radio-inline" value="monthly" type="radio" name="reoccurring" onChange={this.onChange.bind(this, "monthly")}/>
                </label>
            </div>
            <section className="date-selected">
                <DateTimeField className="date-picker" dateTime={date} format={format} inputFormat={inputFormat} onChange={this.handleStartTimeChange.bind(this)} viewMode={mode}/>
                <DateTimeField className="date-picker" dateTime={date} format={format} inputFormat={inputFormat} onChange={this.handleEndTimeChange.bind(this)} viewMode={mode}/>
            </section>

            <textarea ref="allergies" name="allergies" placeholder="enter allergy details" id="aller" cols="1" rows="1"/>
            <textarea ref="msg" name="msg" placeholder="write a personal message" id="msg" cols="1" rows="1"/>
            <button className="btn btn-primary">Send Invitation</button>
        </form>
        );
    }
}
