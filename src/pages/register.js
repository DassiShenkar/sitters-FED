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
            <div id="login-form" onSubmit = {this.handleSubmit}>
                <Logo/>
                <h1>Sign In</h1>
                <form>
                    <div className="form-group row">
                        <label for="partner" className="col-sm-2 form-control-label">Partner Name</label>
                        <div className="col-sm-10">
                            <input type="text" name="partner-name" id="partner" ref="partner"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2">Address</label>
                        <div className="col-sm-10">
                            <div className="address">
                                <label for="city">City</label>
                                <input type="text" id="city" ref="city"/>
                            </div>
                            <div className="address">
                                <label for="street">Street</label>
                                <input type="text" id="street" ref="street"/>
                            </div>
                            <div className="address">
                                <label for="houseNumber">House Number</label>
                                <input type="number" id="houseNumber" ref="houseNumber"/>
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2">Childes</label>
                        <div className="multi-field-wrapper col-sm-10">
                            <div className="multi-fields">
                                <div className="multi-field">
                                    <label for="name">Child Name:</label>
                                    <input className="input name" id="name" name="prof1" type="text" placeholder="Moshe levi"
                                                             data-items="8" ref="childName"/>
                                    <label for="age">Age</label>
                                    <input className="input age" id="age" name="prof1" type="number" placeholder="3" data-items="8" ref="childAge"/>
                                    <label for="picture-child">Upload child picture</label>
                                    <div className="form-group row">
                                        <label className="col-sm-2">Upload Full Picture</label>
                                        <div className="col-sm-10">
                                            <div className="picture">
                                                <input type="file" name="pic" className="upload_field" id="picture-child" accept="images/*" ref="childImgURL"/>
                                                    <div className="progress_wrapper">
                                                        <div className="progress_bar">
                                                            <div className="text"></div>
                                                        </div>
                                                    </div>
                                                    <div className="thumbnails" id="childFullPicture">
                                                        <input type="hidden" id="pictureURL"/>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                    <label for="allergies">Allergies</label>
                                    <input className="input allergies" id="allergies" name="prof1" type="text"
                                                            placeholder="avocado,bamba" ref="childAllergies"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button className="btn btn-primary">Sign In</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
