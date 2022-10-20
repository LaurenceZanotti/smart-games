import Footer from "./components/index/Footer"
import Header from "./components/index/Header"
import Navbar from "./components/index/Navbar"
import ListaProdutos from "./components/ListaProdutos"

export default function App() {

  return (
    <>
    <Navbar className="bg-[#171a21] flex items-center" />
    <Header className="my-4" />
    <main className="min-h-screen" id="jogos">
      <ListaProdutos />
    </main>
    <Footer className="bg-[#171a21] flex justify-center items-center text-white min-h-[10em] text-sm" />
    </>
  )
}