/*classe TableMultiplication*/
// TODO j'aimerais stocker chaque question avec sa reponse dans un tableaux
class TableMultiplication extends React.Component{
    constructor() {
        super();
        this.state =
            {
                randNumber : this.getRandomInteger(0,10),
                randNumber2 : this.getRandomInteger(0,10),
                question : "Combien font",
                text : "",
                reponse: "",
                score : 0,
                result: "",
                vies: 3,
                histScore: [],
            }

        this.getValueInput = this.getValueInput.bind(this);
        this.compareReponse = this.compareReponse.bind(this);
        this.hiddenText = this.hiddenText.bind(this);
    }

    render() {
        return (
            <div className="App">

                <form onSubmit={this.compareReponse}>
                <label>{this.state.question} : {this.state.randNumber} X {this.state.randNumber2}  ? </label>
                <input className="multiInput"
                       type="number"
                       value={this.state.reponse}
                       onChange={this.getValueInput}
                       onFocus={this.hiddenText}

                />

                <button>Valider ma réponse</button>
                </form>

                <h2>{this.state.text}</h2>

                <div>
                    <p>vies : {this.state.vies}</p>
                    <p>score : {this.state.score}</p>
                    <h6>Historiques</h6>
                    <ul>
                       {this.state.histScore.map(
                           (histScores,index) => (
                               <li key={index}>
                                    <span> score : </span>
                                    {histScores}
                                </li>
                           )
                       ).reverse()}
                    </ul>


                </div>
            </div>
        )
    }

    /*
     * genere un nombre entier aleatoirement
     */
    getRandomInteger(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min +1)) + min;
    }

    /*
     * Met a jour le state reponse
     */
    getValueInput(event){
        this.setState({
            reponse : event.target.value,
        })
    }

    /*
     * comparaison de la valeur de la  question et de la valeur de la reponse
     */
    compareReponse(event){

        event.preventDefault();

        let rand1 = this.state.randNumber;
        let rand2 = this.state.randNumber2;
        let resultat = rand1 * rand2;
        let reponse = this.state.reponse;
        let texte;
        let score = this.state.score;
        let result;
        let vies = this.state.vies;
        let histScore = [...this.state.histScore];

        // si le resultat est vrai
        if(resultat == reponse){
            texte = "bravo";
            score = score + 1;
            result = true;
            console.log("score vaut : " + score );
            console.log("vies vaut : " + vies );
            this.regeneQuestions();

        }
        else{
            texte = "ce n'est pas la bonne reponse";
            result = false;
            vies = vies - 1;
             console.log("score vaut : " + score );
            console.log("vies vaut : " + vies );

            if(vies == 0){

                histScore.push(score);
                texte = "Game Over !";
                this.regeneQuestions();
                score = 0;
                vies = 3;

            }

        }


        this.setState({
            text : texte,
            score : score,
            result: result,
            vies : vies,
            histScore: histScore,

        })

    }
    /**
     * regenere de nouveaux nombres
     * */
    regeneQuestions(){
        let  rand1 =  this.getRandomInteger(0,10);
        let  rand2 =  this.getRandomInteger(0,10);

        this.setState({
            randNumber: rand1,
            randNumber2: rand2,
            reponse : "",
            text: "",
        })

        /**
         * reinitialize le state text a vide quand on focus l'input
         * */
    }

    hiddenText(){

        this.setState({
            text : "",
        })
    }


}
