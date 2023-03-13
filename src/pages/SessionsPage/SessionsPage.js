import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Sessao from "./Sessao";

export default function SessionsPage( {setBotaoVoltar} ) {

    const [filme, setFilme] = useState(undefined);
    const {idFilme} = useParams();

    useEffect(() => {
        setBotaoVoltar(-1);

        const url = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`;

        const promise = axios.get(url);
        promise.then( res => {
            setFilme(res.data);
        });
        promise.catch( err => {
            console.log(err.response.data);
        });

    }, []);

    if (filme === undefined){
        return <Carregando>CARREGANDO...</Carregando>;
    }

    return (
        <PageContainer>
            Selecione o horário
            <div>
                <Sessao filme={filme}/>
            </div>

            <FooterContainer data-test="footer">
                <div>
                    <img src={filme.posterURL} alt={filme.title} />
                </div>
                <div>
                    <p>{filme.title}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
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