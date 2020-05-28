import React, { Component } from 'react';
import './styles.css';

export default class Notas extends Component {
    constructor(props) {
        super(props);

        this.state = {

            nota: [],
            info: '',
            edit: {                     // objeto utilizado para fazer a verificação de quando é ou nao
                podeEditar: false,      // possivel editar, o id serve para verificar o indice do elemento
                id: '',                 // que sera alterado
            }
        };
    }



    setValor(event) {
        event.preventDefault();


        var date = new Date();
        var dia = date.getDate();
        var mes = date.getMonth();
        var ano = date.getFullYear();
        var str_data = dia + '/' + (mes + 1) + '/' + ano;

        this.setState(prevState => ({
            nota: [
                ...prevState.nota,
                { "conteudo": this.state.info, "data": str_data }
            ]
        }))  //funcao que seta o estado servindo como um push de um vetor
    }

    funquitionTwo(id) {
        this.setState({ edit: { podeEditar: !this.state.edit.podeEditar, id: id ? Number(id) :  '' } }) 
        //funcao utilizada para setar os valores ao editar e clicar concluir, o ! serve para sempre 
        //alterar o valor de podeEditar para o contrario já que é um boolean        
        // o if ternario serve também para o tratamento no caso de chegar um valor inesperado no id
        
    }

    componentDidUpdate() {
        console.log(this.state);
    }



    funquition(event) {
        this.setState({ info: event.target.value });  //salva o valor
    }

    funquitionThree(value){ //funcao utilizada ao clicar no botao de editar

        let notas2 = this.state.nota;   // cria um vetor notas temporario 
        notas2[this.state.edit.id].conteudo = value; // altera apenas o valor necessario
        this.setState({ nota : notas2}); // atribui os valores ao nota do estado, mantendo os valores
                                        // e alterando apenas o que foi modificado
    }

    saveStorage() {

    }

    excluirNota(id) {

        this.setState({ nota: this.state.nota.filter((item, index) => index !== Number(id)) });
        // o filter serve para verificar os valores, se o index do vetor for diferente do id passado
        // entao ele filtra os valores e exclui apenas o que eh igual (?)
    }

    render() {
        return (
           <div id="main-div"> 
            <div id="idList2">
                <form onSubmit={(event) => this.setValor(event)}>

                    <div id="div-input">
                        <input type="text" onBlur={(event) => this.funquition(event)} placeholder="O que você não pode esquecer?"></input>

                        <button type="submit">Criar Nota</button>


                    </div>
                </form>
                <div id="idList">


                    
                        {this.state.nota && this.state.nota.map((item, index) => (
                            // os index utilizados sao o indice do vetor  do map que funciona
                            // para exibir os elementos na tela, ele eh amplamente utilizado para    
                            // ser passado como parametro com finalidade de ser usado para comparacao
                            // de forma a validar ou nao uma acao, como excluir e editar
                            <p id="identLista" key={index}>
                                {index === this.state.edit.id && this.state.edit.podeEditar ?   //if ternario completo utilizado para fazer a verificação com os indices e verificar se pode editar 
                                    <input defaultValue={item.conteudo} onBlur={(event) =>    //defaultValue utilizado pra manter o valor na hora q clicar em editar
                                         this.funquitionThree(event.target.value)}></input> : 
                                    item.conteudo}                                              
                                <p id="idData">{item.data}</p>
                                                                                                         
                                {index === this.state.edit.id && this.state.edit.podeEditar ?
                                    <button onClick={() => this.funquitionTwo()}>Concluir</button> :
                                    <button className={index} onClick={(event) =>                       
                                    this.funquitionTwo(event.target.className)}>Editar</button>}        

                                <button  id={index} onClick={(event) => 
                                    this.excluirNota(event.target.id)}>Excluir</button>
                            </p>
                        ))}
                </div>
            </div>
            </div>
        )
    }
}