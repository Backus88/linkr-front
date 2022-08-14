import React, {useState} from "react";
import axios from "axios";

export default function PublishPost(props) {
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
  
  return (
      <>
          {
              (enabled === true) ?
                  <Publish>
                      <ProfileImage></ProfileImage>
                      <ContainerPost>
                          <ShareHeader>What are you going to share today?</ShareHeader>
                          <input type='text' value={url} placeholder="http://..." onChange={e => setUrl(e.target.value)} />
                          <input className="input2" value={description} type='text' placeholder="Awesome article about #javascript" onChange={e => setDescription(e.target.value)} />
                          <button onClick={publish}>Publish</button>
                      </ContainerPost>
                  </Publish>
                  :
                  <Publish>
                      <ProfileImage></ProfileImage>
                      <ContainerPost>
                          <ShareHeader>What are you going to share today?</ShareHeader>
                          <input type='text' placeholder="http://..." disabled />
                          <input className="input2" type='text' placeholder="Awesome article about #javascript" disabled />
                          <button>Publishing...</button>
                      </ContainerPost>
                  </Publish>
          }
      </>
  )
}

const Publish = styled.div``

const ProfileImage = styled.div``

const ContainerPost = styled.div``

const ShareHeader = styled.div``
