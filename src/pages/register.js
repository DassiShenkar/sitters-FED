import React from 'react';
import Logo from '../components/Logo';
import '../styles/components/login.scss';



export default class Login extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
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
            childPicture: 'https://res.cloudinary.com/sitters/image/upload/v1468710872/fnfbhef444t4jtg4_qlszzb.png',
            childAllergies: this.refs.childAllergies
        };
        console.log(this.refs.childName.value);
        localStorage.address = parentInput.street.value + " " + parentInput.houseNumber.value + " " +parentInput.city.value;
        localStorage.childName = parentInput.childName.value;
        localStorage.childPicture = parentInput.childPicture;
        $.ajax({
            url: 'https://sitters-ws.herokuapp.com/insertParent',
            dataType: 'json',
            type : 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                name: localStorage.name,
                // password: localStorage.token,
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
            <form id="register-form">
                <section className="invite-info">
                    <Logo/>
                    <h1 className="login-title">Sign In</h1>
                </section>
                    <ul className="login-input-fields">
                        <li>
                            <label className="login-label" for="partner">Partner Name</label>
                            <input type="text" name="partner-name" id="partner" ref="partner"/>
                        </li>
                        <li>
                            <label className="login-label" for="city">City</label>
                            <input type="text" id="city" ref="city"/>
                        </li>
                        <li>
                            <label className="login-label" for="street">Street</label>
                            <input type="text" id="street" ref="street"/>
                        </li>
                        <li>
                            <label className="login-label" for="houseNumber">House Number</label>
                            <input type="number" id="houseNumber" ref="houseNumber"/>
                        </li>
                        <li>
                            <label className="login-label" for="name">Child Name:</label>
                            <input className="input name" id="name" name="prof1" type="text" placeholder="Moshe levi"
                                   data-items="8" ref="childName"/>
                        </li>
                        <li>
                            <label className="login-label" or="age">Age</label>
                            <input className="input age" id="age" name="prof1" type="number" placeholder="3" data-items="8" ref="childAge"/>
                        </li>
                        <li>
                            <label className="login-label" for="allergies">Allergies</label>
                            <input className="input allergies" id="allergies" name="prof1" type="text"
                                   placeholder="avocado,bamba" ref="childAllergies"/>
                        </li>
                    </ul>
                <a className="submit-invite" onClick={this.handleSubmit}>Sign In</a>
                </form>

        );
    }
}
