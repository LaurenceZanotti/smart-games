import { useEffect, useState } from "react"

export default function ListaProdutos() {
  
  const [jogos, setJogos] = useState([])

  useEffect(() => {
    // Obter lista de produtos após mount
    fetch("http://"+window.location.hostname+":8000"+"/api/jogos")
      .then(res => res.json())
      .then(({jogos}) => setJogos(jogos))
  }, [])
  

  return (
    <div className="mx-4" id="lista-produtos">
      {jogos.map(el => {
        return (<div key={el.id}>{el.nome}</div>)
      })}
    </div>
  )
}