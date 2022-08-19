import React from "react"
import { AiOutlineComment } from "react-icons/ai";
import styled from "styled-components";

export default function CommentImg({commentCount , showComments, setShowComments}){

  function handleClick(){
    setShowComments(!showComments)
  }

  return(
    <CommentPage>
      <CommentIcon role='button' onClick={handleClick} />
      <CommentCount>{commentCount} comments</CommentCount>
    </CommentPage>
  )
}

const CommentPage = styled.div`
position: absolute;
top: 135px;
left: 14px;
`

const CommentIcon = styled(AiOutlineComment)`
width: 30px;
height: 36px;
color: white;
margin-left: 12px;
cursor: pointer;
`

const CommentCount = styled.div`
font-family: 'Lato';
font-style: normal;
font-weight: 400;
font-size: 11px;
color: #FFFFFF;
padding-top: 0px;
`