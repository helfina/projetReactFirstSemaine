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
            }

        this.getValueInput = this.getValueInput.bind(this);
        this.compareReponse = this.compareReponse.bind(this);
        this.hiddenText = this.hiddenText.bind(this);
    }

    render() {
        return (
            <div className="App">
                <p>{this.state.question} : {this.state.randNumber} X {this.state.randNumber2}  ? </p>
                <input className="multiInput" type="number" value={this.state.reponse} onChange={this.getValueInput} onFocus={this.hiddenText} />
                <button type="submit" onClick={this.compareReponse} >Valider ma réponse</button>
                <p>{this.state.text}</p>
                <p>score : {this.state.score}</p>

            </div>
        )
    }
    /**
     * genere un nombre entier aleatoirement
     * */
    getRandomInteger(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min +1)) + min;
    }

    /**
     * Met a jour le state reponse
     * */
    getValueInput(event){
        this.setState({
            reponse : event.target.value,
        })
    }

    /**
     * comparaison de la valeur de la  question et de la valeur de la reponse
     * */
    compareReponse(){
        let rand1 = this.state.randNumber;
        let rand2 = this.state.randNumber2;
        let resultat = rand1 * rand2;
        let reponse = this.state.reponse;
        let texte;
        let score;
        let result;
        if(resultat == reponse){
            texte = "bravo";
            score = this.state.score+1;
            result = true;
            this.regeneQuestions();

        }else{
            texte = "ce n'est pas la bonne reponse";
            score = this.state.score-1;
            result = false;
        }
        this.setState({
            text : texte,
            score : score,
            result: result,
        })

    }
    /**
     * regenere de nouveaux nombre
     * */
    regeneQuestions(){
        let  rand1 =  this.getRandomInteger(0,10);
        let  rand2 =  this.getRandomInteger(0,10);

        this.setState({
            randNumber: rand1,
            randNumber2: rand2,
            reponse : "",
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
