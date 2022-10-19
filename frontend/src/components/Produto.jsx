import { useState } from "react"

export default function Produto(props) {
  const [expandido, setExpandido] = useState(false)

  function handleBotaoExpandir() {
    // Toggle expansão dos detalhes do produto
    setExpandido(prevState => !prevState)
  }

  return (
    // Container
    <div className="produto-container my-4 mx-auto max-w-4xl bg-[#405163e6] flex flex-wrap sm:flex-nowrap justify-center sm:justify-start items-center">
      {/* Imagem */}
      <img className="rounded-lg m-4 max-w-[12em]" src={props.imagem} alt={"Capa do " + props.nome} />
      {/* Detalhes */}
      <div className="m-4">
        <h2 className="font-bold text-xl">{props.nome}</h2>
        {/* Descrição desktop */}
        <p className="text-justify hidden sm:block">{props.descricao}</p>
        {/* Descrição mobile */}
        <p className="text-justify sm:hidden">{props.descricao.length > 42 ? `${props.descricao.slice(0, 182)}...` : props.descricao}</p>
        {/* Produto expandido */}
        <div className={expandido ? `block` : `hidden`}>Expandido</div>
        {/* Preço e Ver detalhes */}
        <div className="bg-[#2c3946e6] flex items-center justify-between mt-2">
          <span className="font-extrabold mx-4">R$ {props.preco}</span>
          <button onClick={handleBotaoExpandir} className="py-2 px-4 m-1 bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-300 rounded-sm font-bold">Ver detalhes</button>
        </div>
      </div>
    </div>
  )
}