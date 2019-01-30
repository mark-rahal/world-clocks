import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

class Title extends React.Component {
    render() {
        return (
            <div className={"title"}>
                World Clocks
            </div>
        );
    }
}

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }

    updateHands() {
        const now = this.state.date;
        const secondHand = document.querySelector('.second-hand');
        const minsHand = document.querySelector('.min-hand');
        const hourHand = document.querySelector('.hour-hand');

        const seconds  = now.getSeconds();
        const secondsDegrees = ((seconds / 60) * 360) + 90;
        secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

        const mins = now.getMinutes();
        const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
        minsHand.style.transform = `rotate(${minsDegrees}deg)`;

        const hour = now.getHours();
        const hourDegrees = ((hour / 12) * 360) + ((mins/60)*30) + 90;
        hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
        this.updateHands();
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
        this.updateHands();
    }
    render() {
        return(
            <div className="clock">
                <div className="outer-clock-face">
                    <div className="marking marking-one"></div>
                    <div className="marking marking-two"></div>
                    <div className="marking marking-three"></div>
                    <div className="marking marking-four"></div>
                    <div className="inner-clock-face">
                        <div className="digital">
                            <h2>{this.state.date.getHours()}:{(this.state.date.getMinutes() < 10)? '0' +
                                this.state.date.getMinutes(): this.state.date.getMinutes()}:{(this.state.date.getSeconds()
                                < 10)? '0' + this.state.date.getSeconds(): this.state.date.getSeconds()}</h2>
                        </div>
                        <div className="hand hour-hand"></div>
                        <div className="hand min-hand"></div>
                        <div className="hand second-hand"></div>
                    </div>
                </div>
            </div>
        );
    }
}

class App extends React.Component {
    render() {
        return(
            <div>
                <Title />
                <Clock />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
