import Logo from "../images/logo.svg"

export default function Header({ score }) {
  return (
    <header className="scoreborad_container">
      <figure className="logo_container">
        <img src={Logo} alt="logo" />
      </figure>
      <div className="score_container">
        <p className="title_score">Score</p>
        <p className="score">{score}</p>
      </div>
    </header>
  )
}
