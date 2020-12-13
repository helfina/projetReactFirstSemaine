/*class Horloge */
class ClockTime extends React.Component{

    constructor()
    {   super();
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
        setInterval(this.dateTime, 1000);

    }
    render() {
        return (
            <div>
                {console.log(this.dateTime)}
                <h2 className="title">Horloge</h2>
                <div id="wrapper">
                    <section id="app-horloge">
                        <div id="clock">
                            <span className="hand hours">{this.state.hours}</span>
                            <span className="hand minutes">{this.state.minute}</span>
                            <span className="hand seconds">{this.state.seconds}</span>
                        </div>

                    </section>

                </div>

                {
                    /* Appelez un ou plusieurs composants ici
                    Que ton horloge ait deux modes possibles
                    Tu utiliserais une props pour définir à lappel du composant le mode choisi
                    Et dans ta page tu afficherais deux horloges, une de chaque mode
                    Ya un mode comme actuellementr
                    Et un nouveau mode,
                    Où les aiguilles bougent de manière fluide, et non plus sacadée, seconde par seconde
                    Est-ce que tu vois ce que je veux dire ?
                    Comme si le temps s'écoulait comme de l'eau, au lieu d'avoir comme des "marches", qui sont les secondes
                    */
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
        let seconds = now.getSeconds();
        let minutes = now.getMinutes();
        let hours = now.getHours();
        let hoursAngle = (360 * hours) / 12;
        let minutesAngle = (360 * minutes) / 60;
        let secondsAngle = (360 * seconds) / 60;

        hoursHand.style.transform = `rotate(${hoursAngle}deg) translate(0, -50%)`;
        minutesHand.style.transform = `rotate(${minutesAngle}deg) translate(0, -50%)`;
        secondsHand.style.transform = `rotate(${secondsAngle}deg) translate(0, -50%)`;

        console.log("coucou");

        this.setState({
            dateTime: now,
            seconds : seconds,
            minutes : minutes,
            hours :hours,
        })

    }
}
