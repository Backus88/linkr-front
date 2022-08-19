import styled from 'styled-components';
import { useEffect,useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from "../../contexts/UserContext";
import React from "react";


export default function Dropdown ({usernameString,querieController, setSearching, searching}){
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    // const { postController, setPostController } = useContext(UserContext);
    const [querie, setQuerie]= useState([]);
    const config ={
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }
    const URI = process.env.REACT_APP_DATABASE_URI
    const route =`${URI}/user?username=${usernameString}`;
    useEffect(()=>{
        const querieUsernames = async ()=>{
            try{
                const {data:arrayUsernames} = await axios.get(route, config);
                const arrayUsernamesWithFollowStatus = [...arrayUsernames].sort((a,b) => Number(b.isFollower) - Number(a.isFollower));
                setQuerie(arrayUsernamesWithFollowStatus);
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
                        <Info>
                        <img src={item.profileImgUrl} alt="" />
                        <h1>{item.username}</h1>    
                        </Info>
                        {item.isFollower ? 
                        <FollowStatus>
                        <p> • following</p>
                        </FollowStatus> : 
                        <></>
                        }
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
    flex-direction: row;
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

const Info = styled.div`
display: flex;
flex-direction: row;
align-items: center;
`;
const FollowStatus = styled.div`
display: flex;
align-items: center;
margin-left: 7px;

font-family: 'Lato';
font-style: normal;
font-weight: 400;
font-size: 19px;
line-height: 23px;
color: #C5C5C5;
`;