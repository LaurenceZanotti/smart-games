// React
import { useState } from "react"

// Bibliotecas
import { SpinnerGap, XCircle } from "phosphor-react"

export default function Produto(props) {
  /**
   * Estado do componente
   */
  const [expandido, setExpandido] = useState(false)
  const [compra, setCompra] = useState({
    'msg': '',
    'is_processando': false
  })
  const [mapa, setMapa] = useState({
    'componente': null,
    'is_aberto': false
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

  /**
   * Exibir mapa
   * @param {*} ev 
   */
  function handleExibirMapa(ev) {
    const loja = ev.target.innerText
    // Aparência do mapa
    const css_mapa = {
      border: "0",
      maxWidth: "600px",
      maxHeight: "450px",
      minWidth: "100%",
      minHeight: "250px",
    }
    // Dicionário de lojas cacheadas
    const lojas_cache = {
      "Loja tambóre": (<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.7820582231443!2d-46.83653928441172!3d-23.50435828471121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf017b8c1a5da9%3A0x22a277028d33acc!2sShopping%20Tambor%C3%A9!5e0!3m2!1spt-BR!2sbr!4v1666275500925!5m2!1spt-BR!2sbr" 
        style={css_mapa} 
        allowFullScreen="" 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"></iframe>),
      "Loja União": (<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.7509524887187!2d-46.76859448441113!3d-23.54145828469273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ceff41bd4fbbb3%3A0x883f18a9d028d6!2sShopping%20Uni%C3%A3o%20de%20Osasco!5e0!3m2!1spt-BR!2sbr!4v1666275568911!5m2!1spt-BR!2sbr" 
        style={css_mapa}
        allowFullScreen="" 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"></iframe>),
      "Loja Iguatemi": (<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.776355202312!2d-46.85284686943551!3d-23.504563635809575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf0220fcf1dc29%3A0x3b84ef70a4e234e9!2sShopping%20Iguatemi%20Alphaville!5e0!3m2!1spt-BR!2sbr!4v1666275545952!5m2!1spt-BR!2sbr" 
        style={css_mapa}
        allowFullScreen="" 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"></iframe>),
    }
    // Se loja não estiver no cache
    if (!lojas_cache[loja]) {
      console.warn("Loja desconhecida. Redirecionar para o google mapas")
      return
    }
    // Atualizar mapa
    setMapa(() => {
      return {componente: lojas_cache[loja], is_aberto: true}
    })
  }

  /**
   * Fechar mapa
   */
  function handleFecharMapa() {
    // Alterar estado do mapa mapa para fechar
    setMapa({componente: null, is_aberto: false})
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
        <span className="text-sm">Plataformas</span>
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
          <span className="text-sm">Clique na loja para ver no mapa</span>
          <div className="my-2" id="lojas-container">
          {props.lojas.map((loja, indice) => {
            return (
              <span 
                key={indice} 
                className="loja 
                  ml-0 mx-1 p-1 px-2 
                  border border-green-400 text-green-300 
                  hover:bg-green-400/10 rounded-sm cursor-pointer" 
                title={`Clique para ver a ${loja} no mapa`}
                onClick={ev => handleExibirMapa(ev)}
              >
                {loja}
              </span>                
            )
          })}
          </div>
        </div>
        {/* Google Mapas */}
        <div id="mapas-container">
          {mapa.componente}
          {/* Botão fechar mapa */}
          {
          mapa.is_aberto &&
          <button className="
            my-2 p-1 
            border border-blue-400 rounded-md
            text-blue-400
            bg-blue-400/10 hover:bg-blue-400/30
            flex items-center
            
            " 
            onClick={() => handleFecharMapa()}
          >
            <XCircle size={32} color="#60a5fa" className="mr-2"/>
            <span className="mr-2">Fechar mapa</span>
          </button>
          }
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
        {/* Container de mensagem (desaparece após 10 segundos) */}
        <div className={`
          ${compra.msg ? "block" : "hidden"} 
          p-4 my-4 border rounded-md
          border-emerald-400
          bg-emerald-400/10
          text-emerald-400
          `} 
          id="mensagem"
        >
          {/* Mensagem de feedback */}
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