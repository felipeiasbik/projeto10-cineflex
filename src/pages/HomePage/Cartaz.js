import styled from "styled-components";
import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Cartaz(){

    const [filmes,setFilmes] = useState(null);

    useEffect(() => {

        const url = "https://mock-api.driven.com.br/api/v8/cineflex/movies";
        const requisicao = axios.get(url);
    
        requisicao.then( resp => {
            setFilmes(resp.data);
        });
    
        requisicao.catch ( err => {
            setFilmes(err.response.data);
        });

    },[]);

    
    if (filmes === null) {
        return <Carregando>CARREGANDO...</Carregando>;
    }

    return (
        filmes.map( filme => {
            return (
                <MovieContainer data-test="movie">
                    <Link to={`/sessoes/${filme.id}`} key={filme.id}>
                        <img src={filme.posterURL} alt={filme.title}/>
                    </Link>
                </MovieContainer>
            )
        })
    )
}
const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        width: 130px;
        height: 190px;
    }
`

const Carregando = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 330px;
    height: 150px;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
`