import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import axios from "axios";
import Assento from "./Assento";
import CORES from "./Cores";

export default function SeatsPage( {selecionado, setSelecionado, compra, setCompra} ) {

    const [listaAssentos,setListaAssentos] = useState(undefined);
    const {idSessao} = useParams();
    const [nomeInput,setNomeInput] = useState("");
    const [cpfInput,setCpfInput] = useState("");
    const navigate = useNavigate();

    useEffect(() => {   
        const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`;

        const promise = axios.get(url);
        promise.then( res => {
            const finalizacao = {nomeFilme: res.data.movie.title, diaFilme: res.data.day.date, horaFilme: res.data.name};
            setCompra(finalizacao);
            const listagemAssentos = res.data;
            setListaAssentos(listagemAssentos);
        })
        promise.catch ( err => {
            console.log(err.response.data);
    })

    }, [])

    if (listaAssentos === undefined){
        return <Carregando>CARREGANDO...</Carregando>;
    }

    function enviarCompra(event){
        event.preventDefault();
        if (selecionado.ids.length !== 0){
            const body = {ids: [...selecionado.ids], name: {nomeInput}, cpf: {cpfInput}};
            setSelecionado(body);
            
            const URL = "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many";
            const promise = axios.post(URL, body);

            promise.then(res => {
                navigate("/sucesso")
                console.log(res);
            
            });
            promise.catch(err => {alert(`Erro: ${err.response.data}`)});
        }
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                <Assento listaAssentos={listaAssentos} selecionado={selecionado} setSelecionado={setSelecionado} nomeInput={nomeInput} cpfInput={cpfInput}/>
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle CORES={CORES} cor={CORES[0].nome}/>
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle CORES={CORES} cor={CORES[1].nome}/>
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle CORES={CORES} cor={CORES[2].nome}/>
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                <form onSubmit={enviarCompra}>
                    <label htmlFor="campoNome">Nome do Comprador:</label>                
                    <input placeholder="Digite seu nome..." id="campoNome" type="text" value={nomeInput} onChange={e => setNomeInput(e.target.value)} required/>

                    <label htmlFor="campoCPF">CPF do Comprador:</label>                
                    <input placeholder="Digite seu CPF..." id="campoCPF" type="number" value={cpfInput} onChange={e => setCpfInput(e.target.value)} required/>

                    <button >Reservar Assento(s)</button>
                </form>
            </FormContainer>

            <FooterContainer>
                <div>
                    <img src={listaAssentos.movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{listaAssentos.movie.title}</p>
                    <p>{listaAssentos.day.weekday} - {listaAssentos.name} </p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
border: 1px solid ${props => {
    if (props.cor === "Disponível"){
        return props.CORES[1].borda;
    } else if (props.cor === "Indisponível"){
        return props.CORES[2].borda;
    } else {
        return props.CORES[0].borda;
    }
}};
background-color: ${props => {
    if (props.cor === "Disponível"){
        return props.CORES[1].cor;
    } else if (props.cor === "Indisponível"){
        return props.CORES[2].cor;
    } else {
        return props.CORES[0].cor;
    }
}};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`
const Carregando = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
`