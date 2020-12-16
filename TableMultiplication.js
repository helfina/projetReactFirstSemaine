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
                <input className="multiInput" type="number" value={this.state.reponse} onChange={this.getValueInput} onFocus={this.hiddenText} />
                <button>Valider ma réponse</button>
                <p>{this.state.text} - vies : {this.state.vies}</p>
                <p>score : {this.state.score}</p>
                    <h2>Historique</h2>

                <p>{this.state.histScore}</p>

                </form>
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
    compareReponse(event){
        /*
        * quand tu perd  une vie tu pert un point ce n'est pas le comporetement souhaiter, idem   pour la recuperation de vie
        *
        * */
        event.preventDefault();

        let rand1 = this.state.randNumber;
        let rand2 = this.state.randNumber2;
        let resultat = rand1 * rand2;
        let reponse = this.state.reponse;
        let texte;
        let score = this.state.score;
        let result;
        let vies = this.state.vies;

        if(resultat == reponse){
            texte = "bravo";
            score = score + 1;
            result = true;

            if(vies <= 2 ){
                vies = vies + 1;
            }

            this.regeneQuestions();


        }else{
            texte = "ce n'est pas la bonne reponse";
            result = false;

            //si vie est egale a 0
            if(vies == 0){
                texte = "Vous Avez perdue !";
                this.regeneQuestions();

            }

            //sinon si vie est superieur de 0 ou egal a 1 ou vies est inferieure ou egale a 3
            else if(vies >= 1){
                vies = vies - 1;
            }

            //si score est superieur a 0 ou egal a 1
            if(score >= 1){
                score = score - 1;
            }

            // si tu na plus de vie tu affiche game over
            if(vies == 0){
                // tu stocke score dans un tableau
                let tab = this.state.histScore;
                tab.push(score);
                console.log(tab);
                score = score;
                console.log( "vaut" + score);
                // tu rafraichit le jeu
                alert("Game Over");
            }





        }

        this.setState({
            text : texte,
            score : score,
            result: result,
            vies : vies,

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
