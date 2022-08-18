import React from "react"
import { AiOutlineComment } from "react-icons/ai";
import styled from "styled-components";

export default function Comment(){

  return(
    <CommentPage>
      <CommentIcon/>
      <CommentCount>0 comments</CommentCount>
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
`

const CommentCount = styled.div`
font-family: 'Lato';
font-style: normal;
font-weight: 400;
font-size: 11px;
color: #FFFFFF;
padding-top: 0px;
`