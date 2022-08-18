import React from 'react';
import styled from "styled-components";
import axios from "axios";
import {useState, useEffect} from 'react';
import { TbSend } from 'react-icons/tb';
import {BsFillCircleFill} from 'react-icons/bs'


export default function Comments({userId, postId}) {
    const [renderComment, setRenderComment]= useState(false);
    const [cantComment, setCantComment]= useState(false);
    const [commentary, setCommentary]= useState('');
    const [infoComment, setInfoComment] = useState([]);
    const local = localStorage.getItem("token");
    const imgLocal =localStorage.getItem("img");
    console.log(postId);
    const config = {
        headers: {
            "Authorization": 'Bearer ' + local
        }
    }

    useEffect( ()=>{
        const getComments = async ()=>{
            try{
                const {data: commentsInfo} = await axios.get(`http://localhost:4000/comment/${parseInt(postId)}`, config);
                console.log(commentsInfo);
                setInfoComment([...commentsInfo]);
            }catch(error){
                console.log(error);
            }
    }
    getComments();
},[renderComment]);

    function handleKeyDown(e){
        var key = e.key;
        if(key === 'Enter'){
            handleClick(e);
            setRenderComment(!renderComment);
        }
      }

    async function handleClick(e){
        e.preventDefault()
        const body = {
            userId: userId,
            postId: postId,
            commentary: commentary
        }
        try{
            setCantComment(true);
            await axios.post(`http://localhost:4000/comment`,body, config);
            setCantComment(false);
            setCommentary('');
            setRenderComment(!renderComment);
        }catch(error){
            alert('Houve um erro ao publicar seu link', error);
            setCommentary('');
        }
    }


    return (
        <ColumnDiv>
        {infoComment?.map((item, index)=>{
            return(
            <CommentItens key={index}>
                <img src={item.profileImgUrl} alt="" />
                <ColumnDiv>
                    <TitleDiv>
                        <h1>{item.username}</h1>
                        <CircleIcon/>
                        <h2>relacao</h2>
                    </TitleDiv>
                    <TextDiv>
                        <h3>{item.commentary}</h3>
                    </TextDiv>
                </ColumnDiv>
                <Border/>
            </CommentItens>
        )})}
            <CommentBox>
                <img src={imgLocal} alt='' />
                <CommentInputBox>
                    <input  
                        onChange={e => setCommentary(e.target.value)} 
                        type='text' 
                        value={commentary}
                        placeholder='write a comment'
                        onKeyDown={e => handleKeyDown(e)}
                        required />
                    <SendIcon role='button' type='submit' onClick={ e=> handleClick(e)} />
                </CommentInputBox>
            </CommentBox>
        </ColumnDiv>
    )
}

const ColumnDiv = styled.div`
    width: 100%;
    height: auto;
    min-height: 71px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`

const CommentItens = styled.div`
    width: 100%;
    height: auto;
    padding: 5px 0px;
    min-height: 71px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 0px 15px;
    position: relative;
    /* flex-wrap: wrap; */
    word-break: break-all;
    img{
        width: 39px;
        height: 39px;
        border-radius: 50%; 
        object-fit: cover;
        margin-left: 3px;
        margin-right: 18px;
    }
`
const Border = styled.div`
    position: absolute;
    bottom: 0;
    left: 6px;
    width: 93%;
    border-bottom: 1px solid #353535;
`;


const TitleDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: auto;
    height: auto;
    max-width: 60%;
    h1{
        font-size: 16px;
        font-style: bold;
        line-height: 17px;
        color: #f3f3f3;
        margin-right: 6px;
    }
    h2{
        font-size: 16px;
        font-weight: 400;
        line-height: 17px;
        color: #565656;
    }
`

const TextDiv =styled.div`
    width: 90%;
    height: auto;
    display: flex;
    word-wrap: break-word;
    h3{
        font-size: 16px;
        font-weight: 400;
        line-height: 17px;
        color: #ACACAC;
        margin: 2px 0px;
    }
`
const CommentBox = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 83px;
    width: 100%;
    max-width: 560px;
    background-color: #1E1E1E;
    border-radius: 16px;
    padding-left: 15px; 
    img{
        width: 39px;
        height: 39px;
        border-radius: 50%; 
        object-fit: cover;
        margin-left: 3px;
    }
    
`

const CommentInputBox = styled.form`
    margin: auto 20px;
    height: 39px;
    width: 85%;
    background-color: #252525;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'Lato';
    border-radius: 8px;
    input{
        flex: 1 1 50px;
        background-color: transparent;
        padding-left: 5px;
        border: none;
        font-size: inherit;
        color: #ACACAC;
        &:focus{
            outline: none;
        }
        ::placeholder{
            color: #575757;
            font-size: 1.2rem;
        }
    }
`
const SendIcon = styled(TbSend)`
    color: #F3F3F3;
    width: 15px;
    height: 16px;
    cursor: pointer;
    margin-right: 15px;
`;    


const CircleIcon = styled(BsFillCircleFill)`
    color: #565656;
    width: 5px;
    height: 5px;
    margin-right: 5px;
    margin-top: 2px;
`;    