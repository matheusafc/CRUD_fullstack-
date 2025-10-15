import './style.css'

function Home() {

  return (

    <div className='container'>
      <form>
        <h1>Gerenciador de Cadastros</h1>
        <input name='name' type='text'></input>
        <input name='email' type='email'></input>
        <input name='occupation' type='text'></input>
        <button type='button'>Cadastrar</button>
      </form>

      <div>
        <p>Nome:</p>
        <p>E-mail:</p>
        <p>Cargo:</p>
        <p>Data Criação:</p>
      </div>

      <button></button>
      <button></button>
    </div>

  )
}

export default Home
