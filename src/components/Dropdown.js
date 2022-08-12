import styled from 'styled-components';
import { useEffect,useState } from 'react';
import axios from 'axios';

export default function Dropdown ({usernameString,querieController}){
    const [querie, setQuerie]= useState([]);
    const route =`http://localhost:4000/user/${usernameString}`;
    useEffect(()=>{
        const querieUsernames =async ()=>{
            try{
                const arrayUsernames = await axios.get(route);
                setQuerie([...arrayUsernames]);
            }catch(error){
                alert(error)
            }
        }
        if(usernameString.length>= 3){
            querieUsernames();
        }
        
    },[querieController])
    return(
        <DropdownContainer>
            {querie?.map((item, index)=> {
                return(
                    <ItemDiv key ={index}>
                        <h1>{item.profileImgUrl}</h1>
                        <h1>{item.username}</h1>
                    </ItemDiv>
                )
            })}
        </DropdownContainer>
    )
}

const DropdownContainer = styled.div`
    box-sizing: border-box;
    position: absolute;
    z-index: 1;
    min-width: 500px;
    max-width: 100%;
    max-height: 300px;
    top: 46px;
    left: 0;
    background-color: #E7E7E7;
    overflow: hidden;
    overflow-y: scroll;
    padding: 20px 5px;
    border-bottom-left-radius:8px ;
    border-bottom-right-radius:8px ;
    ::-webkit-scrollbar {
        display: none;
    }
`;
const ItemDiv = styled.div`
    z-index: 1;
    box-sizing: border-box;
    min-width: 500px;
    max-width: 100%;
    background-color: transparent;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    :hover{
        background-color: gray;
    }
`;