import Modal from 'react-modal';
import styled from "styled-components";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function ModalRepost(props) {
    const { modal, setModal, postId, getPost, hashtagController, setHashtagController, userId } = props

    const [loading, setLoading]= useState(false)
    const local = localStorage.getItem("token");
    const localId = localStorage.getItem("id");
    const URI = process.env.REACT_APP_DATABASE_URI
    const config = {
        headers: {
            "Authorization": 'Bearer ' + local
        }
    }

    function yesDelete() {
        console.log(postId)
        console.log(userId)
        const repost = {
          postId,
          userId
        }
        setLoading(true)
        // const promise = axios.delete(`${URI}/delete/${postId}`, config)
        // promise.then(treatSucess).catch(treatError)
    }
    function notDelet() {
        setModal(false)
        setLoading(false)
    }
    function treatSucess() {
        setHashtagController(!hashtagController)
        console.log('sucesso')
        setLoading(false)
        setModal(false)
        getPost()
        setHashtagController(hashtagController)
        
    }

    function treatError(error) {
        console.log(error)
        setLoading(false)
        setModal(false)
        alert('Não foi possível excluir o post')
    }
   
    return (
        <>
        <Modal isOpen={modal} style={customStyles}>
          {loading ? 
          <>
            <IconLoading />
            <MsgLoading>loading...</MsgLoading>
          </>
          :
          <>
          <ModalInfo>
              <ModalF> Do you want to re-post this link? </ModalF>
              <Buttons>
                  <Buttom1 onClick={notDelet}><One>No, cancel</One></Buttom1>
                  <Buttom2 onClick={yesDelete}><Two>Yes, share!</Two></Buttom2>
              </Buttons>
          </ModalInfo>
          </>}
        </Modal>
        </>
    )
}

const ModalInfo = styled.div`
`

const customStyles = {
    content: {
        width: '600px',
        height: '262px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        margin: 'auto',
        transform: 'translate(-50%, -50%)',
        background: '#333333',
        borderRadius: '50px',
        display: 'flex',
        flexDirection: 'column',

        opacity: 1,
    },
    overlay: {
        background: 'rgba(255, 255, 255, 0.9)',
    },
    modal: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: '#DCDCDC',
        opacity: 1,
    }
};

const ModalF = styled.div`
width: 70%;
font-family: 'Lato';
font-style: normal;
font-weight: 700;
font-size: 212%;
text-align: center;
color: #FFFFFF;
margin: 0 auto 0 auto;
line-height: 120%;
`
const Buttons = styled.div`
display: flex;
align-self: center;
width: 100%;
margin-top: 10px;
justify-content: center;
margin-top: 10%;
flex-shrink: 1;
`
const Buttom1 = styled.div`
background: #FFFFFF;
border-radius: 5px;
width: 134px;
height: 38px;
`
const Buttom2 = styled.div`
background: #1877F2;
border-radius: 5px;
width: 134px;
height: 38px;
margin-left: 15px;
`
const One = styled.div`
text-align: center;
font-size: 1.1rem;
color: #1877F2;
font-family: 'Lato';
margin-top: 10px;
font-weight: 700;
cursor: pointer;
`
const Two = styled.div`
text-align: center;
font-size: 1.1rem;
color: #FFFFFF;
font-family: 'Lato';
font-weight: 700;
margin-top: 10px;
cursor: pointer;
`
const IconLoading = styled(AiOutlineLoading3Quarters)`
color: #FFFFFF;
margin-top: 50px;
width: 60%;
height: 50px;
align-self: center;
`
const MsgLoading = styled.div`
color: white;
margin-top: 10px;
margin-left: 10px;
font-family: 'Lato';
font-style: normal;
font-weight: 400;
font-size: 30px;
align-self: center;
`