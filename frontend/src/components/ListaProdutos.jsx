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
        // Transformar plataformas e lojas em uma lista/array
        const lista_plataformas = elemento.plataformas.split("/")
        const lista_lojas = elemento.lojas.split("/")
        // Renderizar Produto e seus detalhes
        return (
          <Produto
            key={elemento.id} 
            id={elemento.id}
            imagem={elemento.imagem}
            nome={elemento.nome}
            descricao={elemento.descricao}
            preco={elemento.preco}
            plataformas={lista_plataformas}
            lojas={lista_lojas}
          />
        )
      })}
    </div>
  )
}