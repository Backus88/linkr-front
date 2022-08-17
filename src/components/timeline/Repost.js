import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {BiRepost} from "react-icons/bi"
import ModalRepost from "./modalRepost";
import axios from "axios";

export default function Repost(props){

  const {userId, postId, getPost, hashtagController, setHashtagController} = props

  const [modal, setModal] = useState(false)

  const repost = 0;
  // useEffect (()=>{
  //   if(repost === 0){
  //     document.getElementById('comm').hidden = true;
  //       } else{
  //         document.getElementById('comm').hidden = false;
  //       }
  //   },[repost])

  return(
    <RepostPage>
      <RepostIcon   onClick={() => setModal(!modal)}/>
      <RepostCount id={'comm'}>{repost} re-posts</RepostCount>
      <ModalRepost modal={modal} setModal={setModal} postId={postId} getPost={getPost} hashtagController={hashtagController} setHashtagController={setHashtagController} userId={userId}/>
    </RepostPage>
  )
}

const RepostPage = styled.div`
position: absolute;
top: 190px;
left: 16px;
`

const RepostIcon = styled(BiRepost)`
width: 30px;
height: 36px;
color: white;
margin-left: 10px;
`

const RepostCount = styled.div`
font-family: 'Lato';
font-style: normal;
font-weight: 400;
font-size: 11px;
color: #FFFFFF;
margin-top: -6px;
margin-left: 2px;
`