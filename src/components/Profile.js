import React, { useRef, useState, useEffect} from "react";
import styled from "styled-components";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
import {useNavigate} from "react-router-dom"
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import useOutsideAlerter from "../Hooks/ClickHook";


export default function Profile(){

  const wrapperRef = useRef(null);
  const [imgLocal, setImgLocal]= useState('');
  const {modal, setModal} = useContext(UserContext);
  const {local, setLocal} = useContext(UserContext);

  useOutsideAlerter(wrapperRef, setModal);

  const navigate = useNavigate();
  useEffect(()=>{
    const img =localStorage.getItem("img");
    setImgLocal(img);
  },[])

  function HandleClick(){
    let el = document.getElementById('menu').hidden;
    if(el === true && modal === false){
      console.log('1')
      document.getElementById('menu').hidden = false
      setModal(true)
    } 
    if(el === false && modal === true){
      console.log('2')
      document.getElementById('menu').hidden = true
      setModal(false)
    }
  }

  function HandleLogout(){
    localStorage.removeItem('token')
    setLocal({})
    navigate('/')
  }


  return(
  <ProfileComp ref={wrapperRef}>
    {modal ? 
      <IconUp onClick={HandleClick}/> 
      :
      <IconDown onClick={HandleClick}/> }

      <ProfileImage onClick={HandleClick}><img src ={imgLocal} alt =''></img></ProfileImage>
      
      <Menu id={'menu'} hidden={true}>
        <p onClick={HandleLogout}>Logout</p>
      </Menu>
  </ProfileComp>
  )
}

const ProfileComp = styled.div`
display: flex;
align-items: center;
height: 70px;
`

const Menu = styled.div`
  position: absolute;
  align-items: center;
  justify-content:center;
  color: white;
  top: 72px;
  width:100px;
  background-color: #151515;
  height: 40px;
  border-radius: 0px 0px 0px 20px;

  P{
    font-family: 'Lato';
    font-weight: 700;
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: center;
  }
`

const IconDown = styled(VscChevronDown)`
color: #FFFFFF;
width: 25%;
height: 40px;
margin-top: 15px;
margin-right: 10px;

`

const IconUp = styled(VscChevronUp)`
color: #FFFFFF;
width: 25%;
height: 40px;
margin-top: 15px;
margin-right: 10px;

`

const ProfileImage = styled.div`
background-color : #FFFFFF;
width: 50px;
height: 50px;
border-radius: 50%;
margin-top: 5px;
display: flex;
justify-content: center;
align-items: center;
img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
`