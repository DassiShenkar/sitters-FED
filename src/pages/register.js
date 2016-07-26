import React from 'react';
import Logo from '../components/Logo';
import '../styles/components/login.scss';



export default class Login extends React.Component {
    constructor() {
        super();
        this.handleSubmitParent = this.handleSubmitParent.bind(this);
        this.handleSubmitSitter = this.handleSubmitSitter.bind(this);
        this.state = {
            selectedForm : "parent",
            genderFilter : "female",
            workingHours : "Mornings"
        }
    }
    onChange(filterName){
        if(filterName === "parent"){
            this.setState({selectedForm:  "sitter"});
        }
        else{
            this.setState({selectedForm:  "parent"});
        }
    }
    onChangeGender(gender){
        if(gender === "male"){
            this.setState({genderFilter:  "male"});
        }
        else{
            this.setState({genderFilter:  "female"});
        }
    }

    onChangeHours(hours){
        if(hours === "Mornings")
            this.setState({workingHours: "Mornings"})
        else if(hours === "Evenings")
            this.setState({workingHours: "Evenings"})
        else
            this.setState({workingHours: "All day"})
    }

    handleSubmitSitter(e){
        e.preventDefault();
        let sitterInput = {
            minAge : this.refs.minAge,
            maxAge : this.refs.maxAge,
            hourFee : this.refs.hourFee,
            gender : this.state.genderFilter,
            workingHours : this.state.workingHours,
            city: this.refs.city,
            street: this.refs.street,
            houseNumber: this.refs.houseNumber,
        };
        //localStorage.address = parentInput.street.value + " " + parentInput.houseNumber.value + " " +parentInput.city.value;
       // localStorage.childName = parentInput.childName.value;
        //localStorage.childPicture = parentInput.childPicture;
        localStorage.isParent = 0;
        $.ajax({
            url: 'https://sitters-ws.herokuapp.com/insertSitter',
            dataType: 'json',
            type : 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                name: localStorage.name,
                password: "1234",
                email: localStorage.email,
                maxAge : sitterInput.maxAge.value,
                minAge : sitterInput.minAge.value,
                hourFee : sitterInput.hourFee.value,
                workingHours : sitterInput.workingHours,
                gender : sitterInput.gender,
                profilePictureURL: localStorage.profilePicture,
                address: {
                    city: sitterInput.city.value,
                    street: sitterInput.street.value,
                    houseNumber: sitterInput.houseNumber.value
                }
            }),
            success: function (data) {
                this.setState({data: data});
                location.replace("sitter");
            }.bind(this),
            error: function(xhr, status, err) {
                //TODO: in error
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    handleSubmitParent(e) {
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
        localStorage.isParent = 1;
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
        let parentForm,sitterForm;
        if(this.state.selectedForm === "parent") {
            parentForm =
            <form id="register-form">

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
                <a className="submit-invite" onClick={this.handleSubmitParent}>Sign In</a>
            </form>;
        }
        if(this.state.selectedForm === "sitter" ) {
            sitterForm =
                <form id="register-form">
                    <ul className="login-input-fields">
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
                            <label className="login-label" for="min-age">Minimum Age</label>
                            <input className="input name" id="min-age"  type="number" placeholder="1" ref="minAge"/>
                        </li>
                        <li>
                            <label className="login-label" for="max-age">Maximum Age</label>
                            <input className="input age" id="max-age"  type="number" placeholder="4"  ref="maxAge"/>
                        </li>
                        <li>
                            <label className="login-label" for="hour-fee">Hour Fee</label>
                            <input className="input age" id="hour-fee"  type="number" placeholder="25"  ref="hourFee"/>
                        </li>
                        <li className="filter-option">
                            <label htmlFor="male">Male</label>
                            <input id="male" value="male" type="radio" checked={this.state.genderFilter === "male"} name="gender-radio" onChange={this.onChangeGender.bind(this, "male")}/>
                        </li>
                        <li className="filter-option">
                            <label htmlFor="female">Female</label>
                            <input id="female" value="female" type="radio" checked={this.state.genderFilter === "female"} name="gender-radio" onChange={this.onChangeGender.bind(this, "female")}/>
                        </li>

                        <li className="filter-option">
                            <label htmlFor="mornings">Mornings</label>
                            <input id="mornings" value="mornings" type="radio" checked={this.state.workingHours === "Mornings"} name="hours-radio" onChange={this.onChangeHours.bind(this, "Mornings")}/>
                        </li>
                        <li className="filter-option">
                            <label htmlFor="evenings">Evenings</label>
                            <input id="evenings" value="evenings" type="radio" checked={this.state.workingHours === "Evenings"} name="hours-radio" onChange={this.onChangeHours.bind(this, "Evenings")}/>
                        </li>
                        <li className="filter-option">
                            <label htmlFor="allDay">All day</label>
                            <input id="allDay" value="allDay" type="radio" checked={this.state.workingHours === "All day"} name="hours-radio" onChange={this.onChangeHours.bind(this, "All day")}/>
                        </li>
                    </ul>
                    <a className="submit-invite" onClick={this.handleSubmitSitter}>Sign In</a>
                </form>;
        }
        return (
            <div>
                <section className="invite-info">
                    <Logo/>
                    <h1 className="login-title">Sign In</h1>
                </section>
                <ul>
                    <li className="filter-option">
                        <label htmlFor="parentRadio">I'm a Parent</label>
                        <input id="parentRadio" value="parent" type="radio" checked={this.state.selectedForm === "parent"} name="radio-register"  onChange={this.onChange.bind(this, "sitter")} />
                    </li>
                    <li className="filter-option">
                        <label htmlFor="sitterRadio">I'm a Sitter</label>
                        <input id="sitterRadio" value="sitter" type="radio" checked={this.state.selectedForm === "sitter"} name="radio-register" onChange={this.onChange.bind(this, "parent")}/>
                    </li>
                </ul>
                {parentForm}
                {sitterForm}
            </div>
        );
    }
}
