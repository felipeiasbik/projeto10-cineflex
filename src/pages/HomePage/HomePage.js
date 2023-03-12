import styled from "styled-components";
import Cartaz from "./Cartaz";
import { useEffect } from "react";

export default function HomePage( {selecionado, setSelecionado} ) {

    useEffect(() => {
        const zerarIds = {ids: [], name: "", cpf: ""};
        setSelecionado(zerarIds);
        console.log(selecionado);
    },[]);

    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>
                <Cartaz />
            </ListContainer>

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
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`