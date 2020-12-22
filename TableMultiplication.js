/*classe TableMultiplication*/
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

                <div>
                    <p>{this.state.text}</p>
                    <p>vies : {this.state.vies}</p>
                    <p>score : {this.state.score}</p>
                    <h6>Historiques</h6>
                    <ul>
                        <li>{this.state.histScore}</li>
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
            vies = 3;
            console.log("score vaut : " + score );
            console.log("vies vaut : " + vies );
            this.regeneQuestions();
        }

        //sinon si vie est superieur de 0 ou egal a 1
        else if(vies >= 1){
            vies = vies - 1;
            texte = "Ressayez !"
            console.log("ressayez score = " + score)
            console.log("ressayez vies = " + vies);
        }
        else{
            texte = "ce n'est pas la bonne reponse";
            result = false;

            //si vie est egale a 0  ou score = 0
            if(vies == 0 || score == 0){
                // tu stocke score dans un tableau ./
                histScore.push(score);
                texte = "game over";
                //tu regenere une questions
                this.regeneQuestions();
                vies = 3;
            }
            //si tu perd des vies ton score reste fixe, if vies == vies - 1 alors scrore vaut this;state.score
            if(vies == vies - 1 ){
                score = this.state.score;
                console.log(score);
            }

            // mais si tu une bonne reponse,
            // vies reste fix et score s'incremente
            //si le resultat est faux
            if(resultat != reponse && vies == 0){
                score = score - 1;
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
