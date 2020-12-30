/*class Horloge */
class ClockTime extends React.Component{

    constructor(props)
    {
        super(props);

        this.state =
            {
                dateTime : new Date(),
                seconds: "",
                minute : "",
                hours : "",
                interval : null,
                status :  false,
                timer: 1000,
            }

        this.dateTime = this.dateTime.bind(this);
        setInterval(this.dateTime, 10);
        console.log(this.props.fluids);
    }

    render() {

        return (

            <div>

                <h2 className="title">Horloge</h2>
                <div className="wrapper">
                    <section className="app-horloge">

                        <div className="clock">
                            <span className="hand hours">{this.state.hours}</span>
                            <span className="hand minutes">{this.state.minute}</span>
                            <span className="hand seconds">{this.state.seconds}</span>
                        </div>

                    </section>

                </div>

                {
                    <p>
                        {this.state.dateTime.toDateString()}<br/>
                        {this.state.dateTime.toLocaleTimeString()}
                    </p>
                }

            </div>
        )
    }
    dateTime(){

        const hoursHand = document.querySelector('.hours');
        const minutesHand = document.querySelector('.minutes');
        const secondsHand = document.querySelector('.seconds');

        let now = new Date;

        let miliSeconds = now.getMilliseconds();
        let seconds = now.getSeconds() + miliSeconds / 1000;
        let minutes = now.getMinutes() + seconds / 60 ;
        let hours = now.getHours() + minutes / 60 ;

        let hoursAngle = (360 * hours) / 12;
        let minutesAngle = (360 * minutes) / 60;

        //1 Millisecondes = 0.001 Secondes
        let secondsAngle = (360 * seconds) / 60;

        hoursHand.style.transform = `rotate(${hoursAngle}deg) translate(0, -50%)`;
        minutesHand.style.transform = `rotate(${minutesAngle}deg) translate(0, -50%)`;
        secondsHand.style.transform = `rotate(${secondsAngle}deg) translate(0, -50%)`;


        this.setState({
            dateTime: now,
            seconds : seconds,
            minute : minutes,
            hours :  hours,
        })

    }
}
