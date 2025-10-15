import React, { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash.svg'
import Edit from '../../assets/edit.svg'
import api from '../../services/api'


function Home() {
  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputEmail = useRef()
  const inputOccupation = useRef()

  // function listar todos users cadastrados
  async function getUsers() {
    const usersApi = await api.get('/users')

    setUsers(usersApi.data)
  }

  // function crir usuario com feedback e validação de campos
  async function createUser() {
    const name = inputName.current.value;
    const email = inputEmail.current.value;
    const occupation = inputOccupation.current.value;

    if (!name || !email || !occupation) {
      alert("Por favor, preencha todos os campos.");
      return;
    } try {
      await api.post('/users', {
        name: name,
        email: email,
        occupation: occupation,
      });

      alert("Usuário cadastrado com sucesso.");
      getUsers();

      inputName.current.value = '';
      inputEmail.current.value = '';
      inputOccupation.current.value = '';

    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("E-mail já cadastrado.");
        return;
      }
      console.error("Erro ao cadastrar usuário.", error);
      alert("Erro ao cadastrar usuário.");
    }
  }

  // function delete com confirmação e feedback
  async function deleteUsers(id) {
    const userConfirmed = window.confirm("Deseja realmente excluir este usuário?");
    if (!userConfirmed) {
      return;
    } try {
      await api.delete(`/users/${id}`);
      alert("Usuário excluido com sucesso.");
      getUsers();
    } catch (error) {
      console.error("Erro ao excluir usuário.", error);
      alert("Erro ao excluir usuário.");
    }
  }

  // function update com feedback
  async function updateUsers(id) {
    try {
      await api.put(`/users/${id}`, {
        name: inputName.current.value,
        email: inputEmail.current.value,
        occupation: inputOccupation.current.value,
      })
      alert("Usuário atualizado com sucesso.");
      getUsers()
    } catch (error) {
      console.error("Erro ao atualizar usuário.", error);
      alert("Erro ao atualizar usuário.");
    }
  }



  useEffect(() => {
    getUsers()
  }, [])

  return (

    <div className='container'>
      <form>
        <h1>Cadastrar Usuário</h1>
        <input placeholder="Nome" name='name' type='text' ref={inputName}></input>
        <input placeholder="E-mail" name='email' type='email' ref={inputEmail}></input>
        <input placeholder="Cargo" name='occupation' type='text' ref={inputOccupation}></input>
        <button type='button' onClick={createUser}>Cadastrar</button>
        <input placeholder="Buscar por E-mail" name='buscar' type='text'></input>
        <button type='button'>Buscar</button>

      </form>

      {users.map((user) =>
        <div key={user._id} className='card'>
          <div>
            <p>Nome: {user.name} </p>
            <p>E-mail: {user.email}</p>
            <p>Cargo: {user.occupation}</p>
            <p>Cadastrado em: {new Date(user.dataCriacao).toLocaleDateString()}</p>
          </div>
          <div className='action-buttons'>
            <button onClick={() => updateUsers(user._id)}>
              <img src={Edit} alt="editIcon" />
            </button>
            <button onClick={() => deleteUsers(user._id)}>
              <img src={Trash} alt="trashIcon" />
            </button>
          </div>
        </div>
      )}
    </div>

  )
}

export default Home
