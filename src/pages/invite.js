import React from 'react';
import DateTimeField from 'react-bootstrap-datetimepicker';
import '../styles/components/invite.scss'

export default class Invite extends React.Component {
    constructor() {
        super();
        this.state = {reoccurring: "none", msg: "", allergies: [], startDate: "", endDate: "", date: "2016-07-17" +
        " 16:50",
            format: "YYYY-MM-DD HH:mm",
            inputFormat: "DD/MM/YYYY HH:mm",
            mode: "dateTime"};
            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleAllergiesChange = this.handleAllergiesChange.bind(this);
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
                // personalMsg: inviteInfo.personalMsg, //Todo:: add msg to schema
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

    render() {
        const {date, format, mode, inputFormat, allergies} = this.state;
        const sitterName = localStorage.sitterName.split(" ")[0];
        return (
        <section>
            <header>
                <p>Invite <strong>{sitterName}</strong> to take care of</p>
                <img src={localStorage.childPicture}/>
                <h3>{localStorage.childName}</h3>
            </header>
            <form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
                <table className="tableInfo">
                    <thead>
                    <th className="dollar">
                    </th>
                    <th className="dollar">
                    </th>
                    <th className="family">
                    </th>
                    </thead>
                    <tbody>
                    <tr className="middleRow">
                        <td>
                            <DateTimeField className="date-picker" dateTime={date} format={format} inputFormat={inputFormat} onChange={this.handleStartTimeChange.bind(this)} viewMode={mode}/>
                        </td>
                        <td>
                            <DateTimeField className="date-picker" dateTime={date} format={format} inputFormat={inputFormat} onChange={this.handleEndTimeChange.bind(this)} viewMode={mode}/>
                        </td>
                        <td>
                            <p>Arlozorov 52 Tel Aviv</p>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <section className="radio-group rec-radio">
                    <h4>Reoccurring</h4>
                    <div>
                        <input id="none" className="radio-inline" value="none" type="radio" name="reoccurring" onChange={this.onChange.bind(this, "none")}/>
                        <label htmlFor="none">None</label>
                    </div>
                    <div>
                        <input id="weekly" className="radio-inline" value="weekly" type="radio" name="reoccurring" onChange={this.onChange.bind(this, "weekly")}/>
                        <label htmlFor="weekly">Weekly</label>
                    </div>
                    <div>
                        <label htmlFor="monthly">Monthly</label>
                        <input id="monthly" className="radio-inline" value="monthly" type="radio" name="reoccurring" onChange={this.onChange.bind(this, "monthly")}/>
                    </div>
                </section>
                <textarea value={allergies} onChange={this.handleAllergiesChange} name="allergies" placeholder="enter allergy details" id="aller" cols="1" rows="1"/>
                <textarea name="msg" placeholder="write a personal message" id="msg" cols="1" rows="1"/>
            </form>
        <a className="submit-invite" onClick={this.handleSubmit}>Send Invitation</a>
        </section>
        );
    }
}
