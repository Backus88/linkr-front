import styled from 'styled-components';
import { useEffect,useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React from "react";


export default function DropdownMobile ({usernameString,querieController, setSearching, searching}){
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    // const { postController, setPostController } = useContext(UserContext);
    const [querie, setQuerie]= useState([]);
    const config ={
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }
    const route =`https://linkr-db.herokuapp.com/user?username=${usernameString}`;
    useEffect(()=>{
        const querieUsernames =async ()=>{
            try{
                const {data:arrayUsernames} = await axios.get(route, config);
                setQuerie([...arrayUsernames]);
            }catch(error){
                console.log(error)
            }
        }
        if(usernameString.length>= 3){
            querieUsernames();
        }
    
    },[querieController]);

    function renderById(id){
        setSearching(!searching)
        // setPostController(!postController)
        navigate(`/user/${id}`);
    }

    return(
        <DropdownContainer>
            {querie?.map((item, index)=> {
                return(
                    <ItemDiv onClick={()=>renderById(item.id)} key ={index}>
                        <img src={item.profileImgUrl} alt="" />
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
    min-height: 0px;
    min-width: inherit;
    max-height: 131px;
    width: 100%;
    top: 46px;
    left: 0;
    background-color: #E7E7E7;
    overflow: hidden;
    overflow-y: scroll;
    padding-bottom: 20px;
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
    width: auto;
    background-color: transparent;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-top: 14px;
    padding-bottom: 12px;
    padding-left:12px;
    :hover{
        background-color: gray;
        cursor: pointer;
    }
    h1{
        font-family: 'Lato';
        font-size: 19px;
        line-height: 23px;
        color: #515151;
    }
    img{
        width: 39px;
        height: 39px;
        border-radius: 50%;
        margin-right: 12px;
        object-fit: cover;
    }
`;