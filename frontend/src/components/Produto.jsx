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
        <p className={`text-justify hidden sm:block`}>{props.descricao.length > 180 && !expandido ? `${props.descricao.slice(0, 250)}...` : props.descricao}</p>
        {/* Descrição mobile */}
        <p className="text-justify sm:hidden">{props.descricao.length > 42 && !expandido ? `${props.descricao.slice(0, 182)}...` : props.descricao}</p>
        {/* Produto expandido */}
        <div className={`my-2 ${expandido ? "block" : "hidden"}`} id="detalhes-container">
          {/* Plataformas do jogo */}
          <div className="my-2" id="plataformas-container">
          {props.plataformas.map(plataforma => {
            return (
              <span className="plataforma border border-blue-500 text-blue-400 ml-0 mx-1 p-1 px-2 hover:bg-blue-400/10 rounded-sm">
                {plataforma}
              </span>                
            )
          })}
          </div>
          {/* Lojas que vendem o jogo */}
          <div className="my-2" id="lojas-container">
          {props.lojas.map(loja => {
            return (
              <span className="loja border border-green-400 text-green-300 ml-0 mx-1 p-1 px-2 hover:bg-green-400/10 rounded-sm cursor-pointer" title="Clique para ver no Google Maps">
                {loja}
              </span>                
            )
          })}
          </div>
        </div>
        {/* Preço e Ver detalhes */}
        <div className="bg-[#2c3946e6] flex items-center justify-between mt-2">
          <span className="font-extrabold mx-4">R$ {props.preco}</span>
          <button onClick={handleBotaoExpandir} className={`py-2 px-4 m-1 bg-gradient-to-r ${expandido ? "from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-300" : "from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300"} rounded-sm font-bold`}>{expandido ? "Ver menos" : "Ver detalhes"}</button>
        </div>
      </div>
    </div>
  )
}