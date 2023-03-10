import styled from "styled-components";
import CORES from "./Cores";

export default function Assento({listaAssentos, selecionado, setSelecionado, assentosSelecionados, setAssentosSelecionados, nomeInput, cpfInput}){


    return (
        listaAssentos.seats.map( assento => {

            function selecionar(){
                if (!selecionado.ids.includes(assento.id)){
                    if (assento.isAvailable === true){
                        const selecao = {ids: [...selecionado.ids,assento.id], name: nomeInput, cpf: cpfInput};
                        setSelecionado(selecao);
                        assento.isAvailable = null;
                        const assentosSelec = [...assentosSelecionados,assento.name];
                        setAssentosSelecionados(assentosSelec);
                    } else {
                        alert("Esse assento não está disponível");
                    }         
                } else if (selecionado.ids.includes(assento.id)) {
                    if (assento.isAvailable === null){
                        const selecao = {ids: [...selecionado.ids,assento.id], name: nomeInput, cpf: cpfInput};
                        const filterSelecao = selecao.ids.filter( valor => valor !==assento.id );
                        const novaSelecao = {ids: filterSelecao, name: {nomeInput}, cpf: {cpfInput}};
                        setSelecionado(novaSelecao);
                        const filterAssentosSelecionados = assentosSelecionados.filter( valor => valor !== assento.name);
                        setAssentosSelecionados(filterAssentosSelecionados);
                        assento.isAvailable = true;   
                    }     
                }
            }

            return <SeatItem data-test="seat" onClick={() => selecionar()} key={assento.id} CORES={CORES} isAvailable={assento.isAvailable}>{assento.name}</SeatItem>
        })
    )
}

const SeatItem = styled.div`
    border: 1px solid ${props => {
        if (props.isAvailable === true){
            return props.CORES[1].borda;
        } else if (props.isAvailable === false){
            return props.CORES[2].borda;
        } else if (props.isAvailable === null) {
            return props.CORES[0].borda;
        }
    }};
    background-color: ${props => {
        if (props.isAvailable === true){
            return props.CORES[1].cor;
        } else if (props.isAvailable === false){
            return props.CORES[2].cor;
        } else if (props.isAvailable === null) {
            return props.CORES[0].cor;
        }
    }};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`