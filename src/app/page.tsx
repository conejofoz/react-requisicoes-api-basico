"use client"
//import axios from 'axios';
import { api } from "@/config/api"

import { useEffect, useRef, useState } from "react";
import { User } from "../types/User";

const Page = ()=>{
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [legendInput, setLegendInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getUsers = async ()=>{
    setLoading(true);
    try {
      const resposta = await fetch('https://jsonplaceholder.typicode.com/users');
      const json = await resposta.json()
      setUsers(json);
    } catch (error) {
      console.log("DEU ALGO ERRADO ", error)
    }
    setLoading(false);
  }

  const handleAddNewPost = async()=>{
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers:{
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({
        title: 'Post de teste',
        body: 'Corpo do post de teste',
        userId: 99
      })
    });

    const json = await res.json();
    console.log(json);
  }

  const handleFileSend = async()=>{
    if(fileInputRef.current?.files && fileInputRef.current.files.length > 0){
      const fileItem = fileInputRef.current.files[0];
      const allowed = ['image/jpg', 'image/jpeg', 'image/png']
      console.log(fileItem)
      
      if(allowed.includes(fileItem.type)){

        const data = new FormData();
        data.append('image', fileItem);
        data.append('legend', legendInput);

        const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST', 
          headers: {
            'Content-type': 'multipart/form-data'
          }, 
          body: data
        })

        const json = await res.json();
        console.log(json);

      } else {
        alert('Arquivo inválido!')
      }

      
    } else {
      alert('Selecione um arquivo!')
    }
  }

  const handleGetPosts = async()=>{
    //const res = await axios.get('https://jsonplaceholder.typicode.com/comments', {
    const res = await api.get('/posts', {
      params: {
        postId: 1
      }
    });
    console.log(res.data)
  }

  const handleAddNewPostAxios = async ()=>{
     const response = await api.post('/posts', {
      userId: 98,
      title: 'Título muito louco',
      body: 'Corpo do título muito louco'
     })

     console.log(response)

     if(response?.data?.id){
      console.log('Inseriu com sucesso!')
     } else {
      console.log('Não foi possível inserir!')
     }
  }

  useEffect(()=>{
    getUsers(); //segundo o professor useEffect não aceita async
  }, []);

  /* useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(json => {
      setUsers(json)
    })
    .catch(()=>{
      console.log('DEU UM ERRO');
    })
    .finally(()=>{
      setLoading(false);
    });
  }, []) */

  return (
    <div className="container mx-auto">
      <button onClick={handleAddNewPost}>Adicionar novo post</button>
      <h1 className="text-3xl">Lista de usuários</h1>
      {loading && "Carregando..."}
      {!loading && users.length > 0 &&
        <ul>
          {
            users.map(item=>(
              <li key={item.id}>{item.name} {item.address.city}</li>
            ))
          }
        </ul>
      }
      {!loading && users.length === 0 && "Não há usuários para exibir."}


      <div className="flex flex-col gap-3 max-w-md border border-dotted border-white p-3 mt-4">
        <h1 className="text-3xl mt-4">Upload de Imagem</h1>
        
        <input 
          type="file" 
          ref={fileInputRef} 
        />

        <input 
          type="text" 
          placeholder="Digite uma legenda"
          className="p-3 bg-white rounded-md text-black"
          value={legendInput}
          onChange={e => setLegendInput(e.target.value)}
        />

        <button onClick={handleFileSend}>Enviar imagem</button>

      </div>

      <div className="mt-5 p-5 border">
        <h1 className="text-3xl">Requisição com axios</h1>
        <button onClick={handleGetPosts}>Pegar posts</button>
        <button onClick={handleAddNewPostAxios}>Adicionar novo post com axios</button>
      </div>
    </div>
  )
}

export default Page;