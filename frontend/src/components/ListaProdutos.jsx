// React
import { useEffect, useState } from "react"

// Componentes
import Produto from "./Produto"


export default function ListaProdutos() {
  
  const [jogos, setJogos] = useState([])

  useEffect(() => {
    // Obter lista de produtos após mount
    fetch(`http://${window.location.hostname}:8000/api/jogos`)
      .then(res => res.json())
      .then(({jogos}) => setJogos(jogos))
  }, [])
  

  return (
    <div className="sm:mx-4" id="lista-produtos">
      {jogos.map(elemento => {
        return (
          <Produto
            key={elemento.id} 
            imagem={elemento.imagem}
            nome={elemento.nome}
            descricao={elemento.descricao}
            preco={elemento.preco}
          />
        )
      })}
    </div>
  )
}