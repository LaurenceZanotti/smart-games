export default function Header(props) {
  return (
    <header className={props.className} id="cta">
      <div className="max-w-[54em] flex flex-wrap justify-evenly items-center mx-auto">
        <img className="mx-6 h-[192px]" src="android-chrome-192x192.png" alt="SG Logo" />
        <div className="my-14 max-w-sm mx-4 text-justify">
            Os melhores games pelos melhores preços! <span className="font-bold">No shopping mais perto de você.</span> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores ut harum ab voluptas consectetur.
        </div>
      </div>
      <a href="#jogos" className="block m-auto sm:my-16 max-w-xs text-center text-white outline-none font-bold bg-blue-500 hover:bg-green-400 shadow-lg hover:shadow-green-400/40 active:bg-red-400 active:shadow-red-400/40 visited:text-white p-4 rounded-full">
        Encontre o seu jogo favorito!
      </a>
    </header>
  )
}