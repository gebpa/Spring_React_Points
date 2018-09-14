class App extends React.Component {

    constructor(props) {
        super(props);
    };

    componentDidMount() {
        console.log("hi");
        this.props.getAllPointsAction();
    }

    render() {
        const tableCss = {
            width: "100%"
        };
        const columnCss = {
            paddingRight: "5%"
        };
        return (
            <div>
                <div className="container">
                    <LogOut/>
                    <table style={tableCss}>
                        <tbody>
                        <tr>
                            <td style={columnCss}>
                                <Form onCreate={this.props.addPointAction} setR={this.props.changeRAction}/>
                            </td>
                            <td>
                                <Canvas rValue={this.props.r} points={this.props.points}
                                        onCreate={this.props.addPointAction}/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <PointList points={this.props.points}/>
                </div>
            </div>
        )
    }
}

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {x: '', y: 0, r: '', errorX: 'X:', errorR: 'R:'};
    }

    handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        if (name === "x") {
            if (isNaN(value) && value !== '-') {
                this.setState({errorX: 'X должно быть числом'});
            }
            else if (value > 5 || value < -5)
                this.setState({errorX: 'X должно быть от -5 до 5'});
            else {
                this.setState({errorX: 'X:'});
                this.setState({x: value});
            }
        }
        if (name === "y") {
            this.setState({y: value});
        }
        if (name === "r") {
            if (isNaN(value) && value !== '-')
                this.setState({errorR: 'R должно быть числом'});
            else if (value > 5 || value < -3)
                this.setState({errorR: 'R должно быть от -3 до 5'});
            else {
                this.setState({errorR: 'R:'});
                this.setState({r: value});
                this.props.setR(Math.abs(value));
            }
        }
    };

    submit = (submitEvent)=> {
        if (this.state.x === '' && this.state.r === '') {
            this.setState({errorX: 'Выберети Х'});
            this.setState({errorR: 'Выберети R'});
        }
        else if (this.state.x === '') {
            this.setState({errorX: 'Выберети Х'});
        }
        else if (this.state.r === '') {
            this.setState({errorR: 'Выберети R'});
        }
        else {
            let newPoint = {};
            newPoint['x'] = Number(this.state.x);
            newPoint['y'] = Number(this.state.y);
            this.setState({errorX: 'X:'});
            this.setState({errorR: 'R:'});
            this.props.onCreate(newPoint, this.state.r);
        }
        submitEvent.preventDefault();

    };

    render() {
        const divStyle = {
            marginTop: "3%",
            marginBottom: "0%"
        };
        return (
            <div>
                <form onSubmit={this.submit}>
                    <div style={divStyle}>
                        <label>{this.state.errorX}</label>
                    </div>
                    <input id="x" className="form-control" name="x" value={this.state.x}
                           onChange={this.handleChange} inputType="text"
                           placeholder="введите X"/>
                    <label style={divStyle}>Y={this.state.y}</label>
                    <input id="y" name="y" type="range" min="-3" max="5" value={this.state.y}
                           onChange={this.handleChange}
                           step="0.01"/>
                    <div style={divStyle}>
                        <label>{this.state.errorR}</label>
                    </div>
                    <input id="r" className="form-control" name="r" value={this.state.r}
                           onChange={this.handleChange} inputType="text"
                           placeholder="введите R"/>

                    <button style={divStyle} className="btn btn-primary btn-sm" type="submit"
                            onClick={this.submit}>Submit
                    </button>
                </form>
            </div>
        )
    }


}

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canvStyle: {border: '1px solid black'}
        };
    }

    drawGraph(r, ctx, canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.fillStyle = 'blue';
        ctx.moveTo(canvas.width / 2 - 20 * r, canvas.width / 2 - 20 * r);
        ctx.lineTo(canvas.width / 2 - 20 * r, canvas.width / 2);
        ctx.lineTo(canvas.width / 2, canvas.width / 2);
        ctx.lineTo(canvas.width / 2, canvas.width / 2 - 20 * r);
        ctx.fill();
        ctx.moveTo(canvas.width / 2 - 20 * r, canvas.width / 2);
        ctx.lineTo(canvas.width / 2, canvas.width / 2 + 20 * r);
        ctx.lineTo(canvas.width / 2, canvas.width / 2);
        ctx.fill();
        ctx.arc(canvas.width / 2, canvas.width / 2, 10 * r, (Math.PI) * (3 / 2), 0, false);
        ctx.lineTo(canvas.width / 2, canvas.width / 2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.font = "20px serif";
        ctx.fillText("0", canvas.width / 2 + 2, canvas.width / 2 + 15);
        ctx.fillText("3", canvas.width / 2 + 60, canvas.width / 2 + 15);
        ctx.fillText("1", canvas.width / 2 + 20, canvas.width / 2 + 15);
        ctx.fillText("2", canvas.width / 2 + 40, canvas.width / 2 + 15);
        ctx.fillText("4", canvas.width / 2 + 80, canvas.width / 2 + 15);
        ctx.fillText("4", canvas.width / 2 + 2, canvas.width / 2 - 80);
        ctx.fillText("y", canvas.width / 2 + 2, 10);
        ctx.fillText("x", canvas.width - 10, canvas.width / 2 + 15);
        ctx.moveTo(10, canvas.width / 2);
        ctx.lineTo(canvas.width - 10, canvas.width / 2);
        ctx.stroke();
        ctx.moveTo(canvas.width / 2, 10);
        ctx.lineTo(canvas.width / 2, canvas.width - 10);
        ctx.stroke();
        this.props.points.forEach((point) => {
            ctx.beginPath();
            if (point.isHitted.valueOf() == "false") {
                ctx.fillStyle = 'red';
            }
            else ctx.fillStyle = 'green';
            ctx.arc(canvas.width / 2 + 20 * point.x, canvas.width / 2 - 20 * point.y, 4, 0, 2 * Math.PI, true);
            ctx.fill();
            ctx.stroke();
        });
    }

    clickImage(event) {
        let x = (event.pageX - this.refs.canvas.getBoundingClientRect().left - this.refs.canvas.width / 2) / 20;
        let y = (this.refs.canvas.width / 2 - (event.pageY - this.refs.canvas.getBoundingClientRect().top)) / 20;
        let newPoint = {};
        newPoint['x'] = x;
        newPoint['y'] = y;
        this.props.onCreate(newPoint, this.props.rValue);
    }

    componentDidUpdate() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        this.drawGraph(this.props.rValue, ctx, canvas);
    }

    render() {
        return (
            <div>
                <canvas id="canvas" style={this.state.canvStyle} ref="canvas" width="250" height="250"
                        onClick={this.clickImage.bind(this)}/>
            </div>
        );
    }
}

class PointList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <table className="table table-stripped">
                    <thead>
                    <tr>
                        <th>x</th>
                        <th>y</th>
                        <th>r</th>
                        <th>isHitted</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.points.map(function (point) {
                        return <Point key={point.id} point={point}/>;
                    })}
                    </tbody>
                </table>
            </div>
        )
    }
}

class Point extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.point.x}</td>
                <td>{this.props.point.y}</td>
                <td>{this.props.point.r}</td>
                <td>{this.props.point.isHitted}</td>
            </tr>
        )
    }
}

class LogOut extends React.Component {
    constructor(props) {
        super(props);
        this.state = {secret: document.getElementById('smallsecret').value}
    }

    render() {
        const divStyle = {
            margin: '1%',
            marginLeft: '0%'
        };
        return (
            <div style={divStyle}>
                <form action="/logout" method="post">
                    <input type="hidden" name="_csrf" value={this.state.secret}/>
                    <input className="btn btn-primary btn-sm" type="submit" value="Sign Out"/>
                </form>
            </div>)

    }
}

const addPointAction = (newPoint, r) => {
    return dispatch => {
        let body = '?x=' + newPoint['x'] + '&y=' + newPoint['y'] + '&r=' + r;
        let urlNew = 'http://' + window.location.host + '/addpoint' + body;
        $.ajax({
            url: urlNew,
        })
            .then((data) => {
                dispatch(addPointSuccess(data));
            })
    };
};

const addPointSuccess = data => ({
    type: "ADD_POINT",
    data: data,
    r: r
});

const changeRAction = (r) => {
    return dispatch => {
        let body = '?r=' + r;
        let urlNew = 'http://' + window.location.host + '/changeR' + body;
        $.ajax({
            url: urlNew,
        })
            .then((data) => {
                dispatch(changeRSuccess(data, r));
            })
    };
};

const changeRSuccess = (data, r) => ({
    type: "CHANGE_R",
    data: data,
    r: r
});

const getAllPointsAction = () => {
    return dispatch => {
        let urlNew = 'http://' + window.location.host + '/allpoints';
        $.ajax({
            url: urlNew,
        })
            .then((data) => {
                dispatch(getAllPoints(data));
            })
    };
};

const getAllPoints = data => ({
    type: "ALL_POINTS",
    data: data
});

const initialState = {
    points: [],
    r: 0
};

const indexReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_POINT":
            return {
                points: action.data,
                r: state.r
            };
        case "CHANGE_R":
            return {
                points: action.data,
                r: action.r
            };
        case "ALL_POINTS":
            console.log(action.data[0].r);
            console.log(action.data.length);
            var rValue=0;
            if(action.data.length !=0){
                rValue = action.data[0].r;
                console.log(rValue);
            }
            return {
                points: action.data,
                r: rValue
            };
        default:
            return state;
    }
};

const mapStateToPropsApp = (state) => {
    return {
        points: state.points,
        r: state.r
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addPointAction: (newPoint, r) => {
            dispatch(addPointAction(newPoint, r))
        },
        getAllPointsAction: () => {
            dispatch(getAllPointsAction())
        },
        changeRAction: (r) => {
            dispatch(changeRAction(r))
        }
    }
};

const store = Redux.createStore(indexReducer, Redux.applyMiddleware(ReduxThunk.default));

const ConnectedApp = ReactRedux.connect(mapStateToPropsApp, mapDispatchToProps)(App);

ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <ConnectedApp/>
    </ReactRedux.Provider>, document.getElementById('root'));

