// React
import { useState } from "react"

// Bibliotecas
import { SpinnerGap } from "phosphor-react"

export default function Produto(props) {
  /**
   * Estado do componente
   */
  const [expandido, setExpandido] = useState(false)
  const [compra, setCompra] = useState({
    'msg': '',
    'is_processando': false
  })

  /**
   * Funções de comportamento do Componente abaixo tem o padrão:
   * 
   * function handleNomeDaFuncao() {...}
   */

  /**
   * Toggle expansão dos detalhes do produto
   */
  function handleBotaoExpandir() {
    setExpandido(prevState => !prevState)
  }

  /**
   * Efetuar tentativa de compra
   * 
   * @param {*} evento 
   * @param {*} produto_id 
   */
  function handleBotaoComprar(evento, produto_id) {
    evento.preventDefault()
    // Se não tiver id do produto por algum motivo, não fazer nada
    if (!produto_id) return

    // Chamar API para comprar o jogo e mudar estado da compra para carregando
    setCompra(prevState => {
      return {
        ...prevState,
        is_processando: !prevState.is_processando
      }
    })
    fetch(
      `http://${window.location.hostname}:8000/api/jogos/${produto_id}/comprar`, 
      {method: "post"}
    )
      .then(res => res.json())
      .then(dados => {
        // Mudar processando para false e obter mensagem do servidor
        setCompra(prevState => {
          return {
            ...prevState,
            is_processando: false,
            msg: dados.msg
          }
        })
        // Apagar mensagem após 10 segundos
        setTimeout(() => setCompra(prevState => {
          return {
            ...prevState,
            msg: ""
          }
        }), 10000)
      })
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
          {props.plataformas.map((plataforma, indice) => {
            return (
              <span key={indice} className="plataforma border border-blue-500 text-blue-400 ml-0 mx-1 p-1 px-2 hover:bg-blue-400/10 rounded-sm">
                {plataforma}
              </span>                
            )
          })}
          </div>
          {/* Lojas que vendem o jogo */}
          <div className="my-2" id="lojas-container">
          {props.lojas.map((loja, indice) => {
            return (
              <span key={indice} className="loja border border-green-400 text-green-300 ml-0 mx-1 p-1 px-2 hover:bg-green-400/10 rounded-sm cursor-pointer" title="Clique para ver no Google Maps">
                {loja}
              </span>                
            )
          })}
          </div>
        </div>
        {/* Preço, Comprar e Ver detalhes */}
        <div className="bg-[#2c3946e6] flex items-center justify-between mt-4" id="acoes-container">
          <span className="font-extrabold mx-4">R$ {props.preco}</span>
          <div>
            {/* Botão comprar */}
            {
            expandido &&
            <button onClick={ev => handleBotaoComprar(ev, props.id)} className={
              `
              py-2 px-4 m-1 bg-gradient-to-r 
              rounded-sm font-bold
              from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 
              active:from-green-500 active:to-green-400 
              `
              } disabled={compra.is_processando}>
              {
                compra.is_processando ? 
                <SpinnerGap size={24} color="#fff" className="animate-spin" /> : 
                "Comprar"
              }
            </button>
            }
            {/* Botão Ver detalhes */}
            <button onClick={handleBotaoExpandir} className={`
              py-2 px-4 m-1 bg-gradient-to-r 
              rounded-sm font-bold 
              ${expandido ? 
                "from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-300" : 
                "from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300"
              } 
            `}>
              {expandido ? "Ver menos" : "Ver detalhes"}
            </button>
          </div>
        </div>
        {/* Mensagem de ação */}
        <div className={`
          ${compra.msg ? "block" : "hidden"} 
          p-4 my-4 border rounded-md
          border-emerald-400
          bg-emerald-400/10
          text-emerald-400
          `} 
          id="mensagem"
        >
          {
            compra.is_processando ? 
            <SpinnerGap size={32} color="#fff" className="animate-spin" /> : 
            compra.msg
          }
        </div>
      </div>
    </div>
  )
}