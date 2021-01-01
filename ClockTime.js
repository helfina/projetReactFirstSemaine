/*class Horloge */
class ClockTime extends React.Component{

    constructor()
    {
        super();

        this.state =
            {
                dateTime : new Date(),
                seconds: "",
                minute : "",
                hours : "",
            }

        this.dateTime = this.dateTime.bind(this);
    }

    componentDidMount(){
        console.log("props", this.props);
        console.log("fluide ? ", this.props.fluids);

        let periode;
        if(this.props.fluids){
            periode = 10;
        }else{
            periode = 1000;
        }
        setInterval(this.dateTime, periode);
        console.log("période : " + periode + "ms");
    }

    /** Pour gérer this.props.fluids
     * si fluide :
     * _interval dateTime() : 10ms
     * _nombres précis à la miiseconde près pour les secondes,minutes,heures
     *
     * si non fluid :
     * _interval dateTime() : 1000ms
     * _nombres entiers pour les secondes,minutes,heures
     */

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
        let seconds = now.getSeconds()
        let minutes = now.getMinutes()
        let hours = now.getHours()

        if(this.props.fluids){
            seconds = seconds + miliSeconds / 1000;
            minutes = minutes + seconds / 60 ;
            hours = hours + minutes / 60 ;
        }

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
