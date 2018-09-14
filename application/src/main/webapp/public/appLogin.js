class App extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
        this.state = {
            secret: document.getElementById('smallsecret').value,
            userPassword: '',
            userName: '',
            errorName: '',
            errorPassword:  '',
            thereIsNoSuchUser: ''
        };
    }

    handleChange(event) {
        let eventName=event.target.name;
        let eventValue=event.target.value;
        if (eventName==="username"){
                this.setState({errorName: ''});
                this.setState({userName: eventValue});
        }
        if (eventName==="userpassword"){
                this.setState({errorPassword: ''});
                this.setState({userPassword: eventValue});
        }
    }

    submit(submitEvent) {
        if (this.state.userName==='' && this.state.userPassword===''){
            this.setState({errorName: 'You forgot to enter email'});
            this.setState({errorPassword: 'You forgot to enter userPassword'});
        }
        else if (this.state.userName===''){
            this.setState({errorName: 'You forgot to enter email'});
        }
        else if (this.state.userPassword===''){
            this.setState({errorPassword: 'You forgot to enter userPassword'});
        }
        else {
            let urlNew = 'http://'+window.location.host+'/login';
            let self = this;
            this.getC
            $.ajax({
                url: urlNew,
                method: 'POST',
                data: {username: self.state.userName,
                        password: self.state.userPassword,
                    _csrf: self.state.secret,

                }
            })
                .done(function(data){
                    let first=data.search("<title>")+7;
                    let last=data.search("</title>");
                    let title=data.slice(first,last);
                    if (title.includes('Points')){
                        document.location.href='http://'+window.location.host+'/index';
                    }
                    if (title.includes('Login Page')){
                        self.setState({thereIsNoSuchUser: 'There is no such user or you enter a wrong password'});
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
                <h2 className="cover-heading">ФИО: Архипов Глеб Кириллович</h2>
                <h2 className="cover-heading">Группа: P3202 Вариант: 345</h2>
                <h1 className="cover-heading">Login</h1>
                <div>
                    <div style={errorStyle}>{this.state.thereIsNoSuchUser}</div>
                    <label>
                        <div id="nameLabel">Email: <div style={errorStyle}>{this.state.errorName}</div></div>
                        <input id="name" className="form-control" name="username" value={this.state.userName}
                               onChange={this.handleChange} type="text"
                               placeholder="enter login"/>
                    </label>
                </div>
                <div>
                    <label>
                        <div id="passwordLabel">Password: <div style={errorStyle}>{this.state.errorPassword}</div></div>
                        <input id="password" className="form-control" name="userpassword" value={this.state.userPassword}
                               onChange={this.handleChange} type="password"
                               placeholder="enter password"/>
                    </label>
                </div>
                <div>
                    <input className="btn btn-primary my-2" type="submit" value="Sign In"
                           onClick={this.submit}/>
                </div>
                <a className="nav-link active" href="/registration">Add a new user</a>
            </div>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));