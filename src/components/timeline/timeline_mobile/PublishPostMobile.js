import React, {useState, useEffect, useRef, useCallback} from "react";
import axios from "axios";
import styled from "styled-components";
import EditPost from "../EditPost";

export default function PublishPostMobile(props) {
  const URI = process.env.REACT_APP_DATABASE_URI
  const [imgLocal, setImgLocal] = useState('')
  const [enabled, setEnabled] = useState(true)
  const [url, setUrl] = useState('')
  const local = localStorage.getItem("token");
  const [description, setDescription] = useState('')
  const inputPublish = useRef();
  const { getPost, postDescription, postUrl, editing, postId, setEditing, userId } = props
  const config = {
      headers: {
          "Authorization": 'Bearer ' + local
      }
  }

  console.log(description)

  useEffect(()=>{
    if(postUrl){
        inputPublish.current.focus();
        setDescription(postDescription);
        setUrl(postUrl);
    }
  },[])

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setDescription(postDescription);
      setUrl(postUrl)
      setEditing(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction);

    return () => {
      document.removeEventListener("keydown", escFunction);
    };
  }, [escFunction]);


  function publish() {
      setEnabled(false)
      if(editing){
        const body ={
            url: url,
            description: description,
            id: postId
        }
        console.log(body)
        const promise = axios.put(`${URI}/post`,body, config)
        promise.catch(tratarError);
        promise.then(tratarSucesso);
      }else{
        const promise = axios.post(`${URI}/post`, {
            url: url,
            description: description
        }, config)
        promise.catch(tratarError)
        promise.then(tratarSucesso)
      }
      function tratarError() {
          alert('Houve um erro ao publicar seu link')
          setEnabled(true)
      }
      function tratarSucesso() {
          setEnabled(true)
          setUrl('')
          setDescription('')
          getPost()

      }
  }

  function handleKeyDown(e){
    var key = e.key;
    if(key === 'Enter'){
      publish(e);
    }
  }

  useEffect(()=>{
    const img =localStorage.getItem("img");
    setImgLocal(img);
},[])

  return (
      <>
          {
              (enabled === true) ?
                  <Publish>

                      <EditPost userId ={userId} setEditing={setEditing} editing={true} top={'10px'}/>
                      <ContainerPost onSubmit={publish}>
                          <ShareHeader>What are you going to share today?</ShareHeader>
                          <input onKeyDown={e => handleKeyDown(e)} ref={inputPublish} type='text' value={url} placeholder="http://..." onChange={e => setUrl(e.target.value)} />
                          <textarea onKeyDown={e => handleKeyDown(e)} value={description} type='text' placeholder="Awesome article about #javascript" onChange={e => setDescription(e.target.value)}></textarea>
                          <button type="submit">Publish</button>
                      </ContainerPost>
                  </Publish>
                  :
                  <Publish>

                      <ContainerPost>
                          <ShareHeader>What are you going to share today?</ShareHeader>
                          <input onKeyDown={e => handleKeyDown(e)} ref={inputPublish} type='text' value={url} placeholder="http://..." onChange={e => setUrl(e.target.value)} disabled/>
                          <textarea onKeyDown={e => handleKeyDown(e)} value={description} type='text' placeholder="Awesome article about #javascript" onChange={e => setDescription(e.target.value)} disabled></textarea>
                          <button>Publishing...</button>
                      </ContainerPost>
                  </Publish>
          }
      </>
  )
}

const Publish = styled.div`
position: relative;
display: flex;
justify-content: space-between;
width: 100%;
height: 164px;
margin: 20px auto;
background: #FFFFFF;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 0;
`

const ContainerPost = styled.form`
    font-family: 'Lato';
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 16px;

    input{
      font-family: 'Lato';
        width: 95%;
        height: 30px;
        margin-top: 0.5rem;
        border-radius: 6px;
        border: none;
        background-color: #EFEFEF;
        padding-left: 6px;
        font-size: 1rem;
        color: #949494;
        ::placeholder{
            color: #949494;
        }
    }
    textarea{
        font-family: 'Lato';
        font-size: 1rem;
        width: 95%;
        height: 48px;
        margin-top: 0.313rem;
        border-radius: 6px;
        resize: none;
        border: none;
        background-color: #EFEFEF;
        padding: 6px;
        color: #949494;
        ::placeholder{
            color: #949494;
        }
    }

    button{
        width: 7rem;
        height: 1.37rem;
        margin-top: 6px;
        align-self: flex-end;
        margin-right: 0.7rem;
        border: none;
        background-color: #1877F2;
        border-radius: 0.31rem;
        color: white;
        font-size: 0.8rem;
        font-family: 'Lato';
        font-weight: 700;
    }
`

const ShareHeader = styled.div`
font-family: 'Lato';
font-style: normal;
font-weight: 300;
font-size: 1.25rem;
color: #707070;
text-align: start;
margin-top: 1rem;
`
