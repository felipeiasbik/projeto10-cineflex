import styled from "styled-components";
import Horario from "./Horario";

export default function Sessao({filme}){
    return (
        filme.days.map( hor => {
            return (
                <SessionContainer key={hor.id}>
                    {hor.weekday} - {hor.date}
                    <ButtonsContainer>
                        <Horario hor={hor}/>
                    </ButtonsContainer>
                </SessionContainer>
            )
        })
    )
}

const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
        cursor: pointer;
    }
    a {
        text-decoration: none;
    }
`