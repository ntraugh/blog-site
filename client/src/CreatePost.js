import React, { useState } from 'react'
import {Button, Form} from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import axios from "axios"


const CreatePost = () => {
  const navigate = useNavigate()
  const [post, setPost] = useState({
    title: "",
    description: "",
  })

const handleChange = (e) => {
  e.preventDefault()
  const { value, name } = e.target
  setPost((prev) => {
    return {
      ...prev,
      [name]: value
    }
  })

}

const handleClick = (e) => {
  
  
  e.preventDefault()
  if(!post.title || !post.description) {
    alert("Please fill out all fields")
    return 
  }
  axios.post("/create", post)
    .then(res => console.log(res))
    .catch(err => console.log(err))

  navigate("posts")
}


  return (
    <div style={{width: "90%", textAlign: "center", margin: "auto auto"}}>
        <h1>Create a Post</h1>
        <Form>
        <Form.Group>
          <Form.Control 
          value={post.title}
          name='title' 
          placeholder='Title' 
          style={{marginBottom: "1rem"}}
          onChange={handleChange}/>
          <Form.Control 
          value={post.description}
          name='description'
          placeholder='Description' 
          style={{marginBottom: "1rem"}}
          onChange={handleChange}/>
        </Form.Group>
        <Button 
        variant="outline-success"
        style={{width: "100%", marginBottom: "1rem"}}
        onClick={handleClick}>Create</Button>
      </Form>
        <Button 
        variant="outline-dark"
        style={{width: "100%"}}
        onClick={() => navigate("/")}>Back</Button>
    </div>
  )
}

export default CreatePost