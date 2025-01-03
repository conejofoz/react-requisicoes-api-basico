"use client"

import { useEffect, useState } from "react";
import { User } from "../types/User";

const Page = ()=>{
  const [users, setUsers] = useState<User[]>([]);

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(json => {
      setUsers(json)
    })
  }, [])
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl">Lista de usuários</h1>
      {users.length <= 0 && "Carregando..."}
      {users.length > 0 &&
        <ul>
          {
            users.map(item=>(
              <li key={item.id}>{item.name} {item.address.city}</li>
            ))
          }
        </ul>
      }
    </div>
  )
}

export default Page;