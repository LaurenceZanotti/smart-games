export default function App() {

  return (
    <>
    <nav className="bg-slate-900 flex items-center">
      <span className="text-4xl m-2">🎮</span><h1 className="font-bold text-3xl text-slate-100 border-r border-r-white pr-4">Smart Games</h1>
    </nav>
    <header className="my-4" id="cta">
      <div className="flex flex-wrap justify-evenly items-center">
        <img className="mx-6 h-[192px]" src="android-chrome-192x192.png" alt="SG Logo" />
        <div className="my-14 max-w-sm mx-4 text-justify">
          Os melhores games pelos melhores preços! <span className="font-bold">No shopping mais perto de você.</span> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores ut harum ab voluptas consectetur.
        </div>
      </div>
      <a href="#jogos" className="block m-auto sm:my-16 max-w-xs text-center text-white outline-none font-bold bg-cyan-500 hover:bg-green-400 shadow-lg hover:shadow-green-400/40 active:bg-red-400 active:shadow-red-400/40 visited:text-white p-4 rounded-full">
        Encontre o seu jogo favorito!
      </a>
    </header>
    <main className="min-h-screen" id="jogos">
    
    </main>
    <footer className="bg-slate-900 flex justify-center items-center text-white min-h-[10em] text-sm">
      Copyright &copy; 2022 Smart Games Ltda.
    </footer>
    </>
  )
}