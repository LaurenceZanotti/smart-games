export default function Navbar(props) {
    return (
    <nav className={props.className}>
      <span className="text-4xl m-2">🎮</span>
      <h1 className="font-bold text-3xl text-slate-100 border-r border-r-white pr-4">Smart Games</h1>
    </nav>
  )
}