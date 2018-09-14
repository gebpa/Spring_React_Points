class App extends React.Component {

    constructor(props) {
        super(props);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
        this.state = {
            secret: document.getElementById('smallsecret').value,
            userPassword: '',
            repeatPassword: '',
            userName: '',
            errorName: '',
            errorPassword: '',
            errorRepeatPassword: '',
            thereIsAlreadyaUserWithThisName: ''
        };
    }

    handleBlur(event) {
        let eventName = event.target.name;
        let eventValue = event.target.value;
        if (eventName === "userpassword") {
            if (this.state.repeatPassword !== '' && eventValue !== this.state.repeatPassword) {
                this.setState({errorRepeatPassword: 'Passwords are different'});
            }
            else {
                this.setState({errorRepeatPassword: ''});
                this.setState({errorPassword: ''});
                this.setState({userPassword: eventValue});
            }
        }
        else if (eventName === "repeatPassword") {
            if (this.state.userPassword !== '' && eventValue !== this.state.userPassword) {
                this.setState({errorRepeatPassword: 'Passwords are different'});
            }
            else {
                this.setState({errorRepeatPassword: ''});
                this.setState({errorPassword: ''});
                this.setState({userPassword: eventValue});
            }
        }
        else if (eventName === "username") {
            if (eventValue.includes('@') && eventValue.includes('.') && eventValue.length > 4) {
                this.setState({errorName: ''});
                this.setState({userName: eventValue});
            }
            else {
                this.setState({errorName: 'It does not look like email'});
                this.setState({userName: eventValue});
            }
        }
    }

    handleChange(event) {
        let eventName = event.target.name;
        let eventValue = event.target.value;
        if (eventName === "username") {
            this.setState({errorName: ''});
            this.setState({userName: eventValue});
        }
        if (eventName === "userpassword") {
            this.setState({errorPassword: ''});
            this.setState({userPassword: eventValue});
        }
        if (eventName === "repeatPassword") {
            this.setState({errorRepeatPassword: ''});
            this.setState({repeatPassword: eventValue});
        }
    }

    submit(submitEvent) {
        if (this.state.userName===''){
            this.setState({errorName: 'You forgot to enter login'});
        }
        if (this.state.userPassword===''){
            this.setState({errorPassword: 'You forgot to enter password'});
        }
        if (this.state.repeatPassword===''){
            this.setState({errorRepeatPassword: 'You should repeat password'});
        }
        console.log((this.state.errorPassword+this.state.errorRepeatPassword+this.state.errorName).length);
        if ((this.state.errorPassword+this.state.errorRepeatPassword+this.state.errorName).length===0) {
            let urlNew = 'http://'+window.location.host+'/createnewuser';
            let self = this;
            console.log(urlNew);
            this.getC
            $.ajax({
                url: urlNew,
                method: 'POST',
                data: {username: self.state.userName,
                    password: self.state.userPassword,
                    repeatpassword : self.state.repeatPassword,
                    _csrf: self.state.secret,
                }
            })
                .done(function(data){
                    if (data.includes("There is already a user with this email")){
                        self.setState({thereIsAlreadyaUserWithThisName: 'There is already a user with this email'});
                    }
                    if(data.includes("Passwords are not same")){
                        this.setState({errorRepeatPassword: 'Passwords are different'});
                    }
                    if (data.includes("Success!")){
                        document.location.href='http://'+window.location.host+'/login';
                    }
                });
        }
        submitEvent.preventDefault();
    }

    render() {
        const errorStyle = {
            color: "red"
        };
        return (
            <div className="text-center">
                <div className="container">
                    <h1 className="cover-heading">Registration</h1>
                    <div>
                        <div style={errorStyle}>{this.state.thereIsAlreadyaUserWithThisName}</div>
                        <label>
                            <div id="nameLabel">Email: <div style={errorStyle}>{this.state.errorName}</div></div>
                            <input id="name" className="form-control" name="username" value={this.state.userName}
                                   onChange={this.handleChange} type="text"
                                   placeholder="enter login"
                                   onBlur={this.handleBlur}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            <div id="passwordLabel">Password: <div style={errorStyle}>{this.state.errorPassword}</div>
                            </div>
                            <input id="password" className="form-control" name="userpassword"
                                   value={this.state.userPassword}
                                   onChange={this.handleChange} type="password"
                                   placeholder="enter password"
                                   onBlur={this.handleBlur}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            <div id="repeatpasswordLabel">Repeat your password: <div
                                style={errorStyle}>{this.state.errorRepeatPassword}</div></div>
                            <input id="repeatPassword" className="form-control" name="repeatPassword"
                                   value={this.state.repeatPassword}
                                   onChange={this.handleChange} type="password"
                                   placeholder="repeat your password"
                                   onBlur={this.handleBlur}/>
                        </label>
                    </div>
                    <div>
                        <input className="btn btn-primary my-2" type="submit" value="Create a new account"
                               onClick={this.submit}/>
                    </div>
                    <a className="nav-link active" href="/login">If you have an account</a>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));