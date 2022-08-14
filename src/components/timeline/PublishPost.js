import React, {useState, useEffect} from "react";
import axios from "axios";
import styled from "styled-components";

export default function PublishPost(props) {
  const [imgLocal, setImgLocal] = useState('')
  const [enabled, setEnabled] = useState(true)
  const [url, setUrl] = useState('')
  const local = localStorage.getItem("token");
  const [description, setDescription] = useState('')
  const { getPost } = props
  const config = {
      headers: {
          "Authorization": 'Bearer ' + local
      }
  }
  function publish() {
      setEnabled(false)
      const promise = axios.post('http://localhost:4000/post', {
          url: url,
          description: description
      }, config)
      promise.catch(tratarError)
      promise.then(tratarSucesso)

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
                      <ContainerPost>
                          <ShareHeader>What are you going to share today?</ShareHeader>
                          <input type='text' value={url} placeholder="http://..." onChange={e => setUrl(e.target.value)} />
                          <textarea value={description} type='text' placeholder="Awesome article about #javascript" onChange={e => setDescription(e.target.value)}></textarea>
                          <button onClick={publish}>Publish</button>
                      </ContainerPost>
                  </Publish>
                  :
                  <Publish>
                      <ProfileImage>
                        <img src = {imgLocal} alt =''/>
                      </ProfileImage>
                      <ContainerPost>
                          <ShareHeader>What are you going to share today?</ShareHeader>
                          <input type='text' placeholder="http://..." disabled />
                          <input type='textarea' placeholder="Awesome article about #javascript" disabled/>
                          <button>Publishing...</button>
                      </ContainerPost>
                  </Publish>
          }
      </>
  )
}

const Publish = styled.div`
display: flex;
justify-content: space-between;
width: 40%;
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

const ContainerPost = styled.div`
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
