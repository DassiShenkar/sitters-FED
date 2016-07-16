import React from 'react';

export default class Invite extends React.Component {
    constructor() {
        super();
        this.state = {reoccurring: "none"};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChange(reoccurring) {
        this.setState({reoccurring: reoccurring});
    }

    handleSubmit(e) {
        e.preventDefault();
        let parentInput = {
            partner: this.refs.partner,
            city: this.refs.city,
            street: this.refs.street,
            houseNumber: this.refs.houseNumber,
            childName: this.refs.childName,
            childAge: this.refs.childAge,
            childPicture: "someurl.com",
            childAllergies: this.refs.childAllergies
        };
        $.ajax({
            url: 'https://sitters-ws.herokuapp.com/insertParent',
            dataType: 'json',
            type : 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                name: localStorage.name,
                password: localStorage.token,
                email: localStorage.email,
                profilePictureURL: localStorage.profilePicture,
                partner: parentInput.partner.value,
                address: {
                    city: parentInput.city.value,
                    street: parentInput.street.value,
                    houseNumber: parentInput.houseNumber.value
                },
                childes: [{
                    name: parentInput.childName.value,
                    age: parentInput.childAge.value,
                    profilePictureURL: parentInput.childPicture.value,
                    allergies: parentInput.childAllergies.value
                }]

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

    render() {
        return (
        <form className="commentForm" onSubmit={this.handleSubmit}>
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

            <textarea name="allergies" placeholder="enter allergy details" id="aller" cols="1" rows="1"/>
            <textarea name="message" placeholder="write a personal message" id="msg" cols="1" rows="1"/>
            <button className="btn btn-primary">Send Invitation</button>
        </form>
        );
    }
}
