
import Modal from 'react-modal';
import styled from "styled-components";
import axios from 'axios';
import { useState } from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function ModalDelete(props) {
    const { visible, setVisible, postId, getPost } = props
    const [loading, setLoading]= useState(false)
    const local = localStorage.getItem("token");
    const config = {
        headers: {
            "Authorization": 'Bearer ' + local
        }
    }
    function yesDelete() {
        setLoading(true)
        const promise = axios.delete(`http://localhost:4000/delete/${postId}`, config)
        promise.then(treatSucess).catch(treatError)
    }
    function notDelet() {
        setVisible(false)
    }
    function treatSucess() {
        console.log('sucesso')
        setLoading(false)
        setVisible(false)
        getPost()
        
    }

    function treatError(error) {
        console.log(error)
        setVisible(false)
        alert('Não foi possível excluir o post')
    }
   
    return (
        <Modal
            isOpen={visible}
            style={customStyles}
        >
            {loading ? <>
            <IconLoading />
            <MsgLoading>loading...</MsgLoading>
            </>
                :
                <>
            <ModalF>Are you sure you want
            to delete this post?</ModalF>
        <Buttons>
            <Buttom1 onClick={notDelet}><One>No, go back</One></Buttom1>
            <Buttom2 onClick={yesDelete}><Two>Yes, delete it</Two></Buttom2>
        </Buttons>
        </>
            }
        </Modal>
    )
}

const customStyles = {
    content: {
        width: '25%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: '#333333',
        borderRadius: '50px',
        display: 'flex',
        flexDirection: 'column'

    },
    overlay: {
        background: '#DCDCDC'
    }
};

const ModalF = styled.div`
font-family: 'Lato';
font-style: normal;
font-weight: 700;
font-size: 20px;
text-align: center;
color: #FFFFFF;

`
const Buttons = styled.div`
display: flex;
align-self: center;
width: 100%;
margin-top: 10px;
justify-content: center;
`
const Buttom1 = styled.div`
background: #FFFFFF;
border-radius: 5px;
width: 30%;
height: 30px;


`
const Buttom2 = styled.div`
background: #1877F2;
border-radius: 5px;
width: 30%;
height: 30px;
margin-left: 15px;


`
const One = styled.div`
text-align: center;
font-size: 12px;
color: #1877F2;
font-family: 'Lato';
margin-top: 7px;

`
const Two = styled.div`
text-align: center;
font-size: 12px;
color: #FFFFFF;
font-family: 'Lato';
margin-top: 7px;
`
const IconLoading = styled(AiOutlineLoading3Quarters)`
color: #FFFFFF;
margin-top: 60px;
width: 60%;
height: 50px;
align-self: center;
`
const MsgLoading = styled.div`
color: white;
margin-top: 10px;
font-family: 'Lato';
font-style: normal;
font-weight: 400;
font-size: 30px;
align-self: center;
`