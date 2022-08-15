import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import {RiEditBoxFill} from 'react-icons/ri';
import {TiPencil} from 'react-icons/ti'

export default function EditPost({userId, setEditing, editing, top}){
    const [showIcon, setShowIcon]= useState(false);
    const localId = localStorage.getItem("id");
    useEffect(()=>{
        if(parseInt(localId)===parseInt(userId)&& userId){
            setShowIcon(true);
        }
        console.log(userId);
    },[userId])
    function handleClick(){
        if(editing){
            setEditing(false)
        }else{
            setEditing(true);
        }
    }

    return(
        <>
            {showIcon?<Icon top={top} editing={editing} onClick={()=> handleClick()} />:null}
        </>
    )
}


const Icon = styled(TiPencil)`
    position: absolute;
    top: ${props => props.top >0 ?  props.top:props.top};
    right: 15px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    color: ${props => props.editing ? "#000000":"#FFFFFF"}
`;