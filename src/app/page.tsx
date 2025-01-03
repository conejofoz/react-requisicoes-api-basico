"use client"

import { useEffect, useState } from "react";
import { User } from "../types/User";

const Page = ()=>{
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(()=>{
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
  }, [])
  return (
    <div className="container mx-auto">
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
    </div>
  )
}

export default Page;