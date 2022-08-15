import React, {useState, useEffect, useRef, useCallback} from "react";
import axios from "axios";
import styled from "styled-components";
import EditPost from "./EditPost";

export default function PublishPost(props) {
  const [imgLocal, setImgLocal] = useState('')
  const [enabled, setEnabled] = useState(true)
  const [url, setUrl] = useState('')
  const local = localStorage.getItem("token");
  const [description, setDescription] = useState('')
  const inputPublish = useRef();
  const { getPost, postDescription, postUrl, editing, postId, setEditing, userId, hashtagController, setHashtagController } = props
  const config = {
      headers: {
          "Authorization": 'Bearer ' + local
      }
  }

  console.log(description)
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


  function publish(e) {
      e.preventDefault()
      setEnabled(false)
      console.log(editing)
      if(editing){
        const body ={
            url: url,
            description: description,
            id: postId
        }
        console.log(body)
        const promise = axios.put('http://localhost:4000/post',body, config)
        promise.catch(tratarError);
        promise.then(tratarSucesso);
      }else{
        const promise = axios.post('http://localhost:4000/post', {
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
          setHashtagController(!hashtagController)        
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
                      <ProfileImage src={imgLocal} alt =''/>
                      <EditPost userId ={userId} setEditing={setEditing} editing={true} top={'10px'}/>
                      <ContainerPost onSubmit={e =>publish(e)}>
                          <ShareHeader>What are you going to share today?</ShareHeader>
                          <input onKeyDown={e => handleKeyDown(e)} ref={inputPublish} type='text' value={url} placeholder="http://..." onChange={e => setUrl(e.target.value)} />
                          <textarea onKeyDown={e => handleKeyDown(e)} value={description} type='text' placeholder="Awesome article about #javascript" onChange={e => setDescription(e.target.value)}></textarea>
                          <button type="submit">Publish</button>
                      </ContainerPost>
                  </Publish>
                  :
                  <Publish>
                      <ProfileImage src={imgLocal} alt =''/>
                      <ContainerPost>
                          <ShareHeader>What are you going to share today?</ShareHeader>
                          <input ref={inputPublish} type='text' placeholder="http://..." disabled />
                          <input type='textarea' placeholder="Awesome article about #javascript" disabled/>
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
height: 210px;
/* margin-top: 40px; */
margin: 40px auto;
background: #FFFFFF;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 16px;
`

const ProfileImage = styled.img`
width: 50px;
height: 50px;
border-radius: 50%;
margin: 1rem;
object-fit: cover;
`

const ContainerPost = styled.form`
    font-family: 'Lato';
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 100%;
    border-radius: 16px;

    input{
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
        font-size: 1rem;
        width: 95%;
        height: 66px;
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
        height: 2rem;
        margin-top: 15px;
        align-self: flex-end;
        margin-right: 1.3rem;
        border: none;
        background-color: #1877F2;
        border-radius: 1rem;
        color: white;
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
