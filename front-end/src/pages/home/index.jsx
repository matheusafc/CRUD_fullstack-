import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import Trash from "../../assets/trash.svg";
import Edit from "../../assets/edit.svg";
import api from "../../services/api";

function Home() {
  const [users, setUsers] = useState([]);

  // Estados para o Modal 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [userToEdit, setUserToEdit] = useState(null); 
  const [modalFormData, setModalFormData] = useState({
    name: "",
    email: "",
    occupation: "",
  });

  // Refs para o formulário de cadastro
  const inputName = useRef();
  const inputEmail = useRef();
  const inputOccupation = useRef();

  // function listar registros
  async function getUsers() {
    const usersApi = await api.get("/users");
    setUsers(usersApi.data);
  }
  // fuction validar email
  function validedEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    return regex.test(email);
  }

  // function create
  async function createUser() {
    const name = inputName.current.value;
    const email = inputEmail.current.value;
    const occupation = inputOccupation.current.value;

    if (!name || !email || !occupation) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    if (!validedEmail(email)) {
      alert("Por favor digite um e-mail válido");
      return;
    }
    try {
      await api.post("/users", { name, email, occupation });
      alert("Usuário cadastrado com sucesso.");
      getUsers();
      inputName.current.value = "";
      inputEmail.current.value = "";
      inputOccupation.current.value = "";
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("E-mail já cadastrado.");
      } else {
        console.error("Erro ao cadastrar usuário.", error);
        alert("Erro ao cadastrar usuário.");
      }
    }
  }

  // function delete
  async function deleteUsers(id) {
    const userConfirmed = window.confirm(
      "Deseja realmente excluir este usuário?"
    );
    if (!userConfirmed) return;

    try {
      await api.delete(`/users/${id}`);
      alert("Usuário excluido com sucesso.");
      getUsers();
    } catch (error) {
      console.error("Erro ao excluir usuário.", error);
      alert("Erro ao excluir usuário.");
    }
  }

 

  // function modal (abrir e preencher)
  function openEditModal(user) {
    setUserToEdit(user);
    setModalFormData({
      name: user.name,
      email: user.email,
      occupation: user.occupation,
    });
    setIsModalOpen(true);
  }

  // function fechar modal
  function closeEditModal() {
    setIsModalOpen(false);
    setUserToEdit(null);
  }

  // function para mudança dos inputs
  function handleModalFormChange(event) {
    const { name, value } = event.target;
    setModalFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  // function para atualizar os dados
  async function handleUpdateSubmit(event) {
    event.preventDefault(); 
    if (!userToEdit) return;

    try {
      await api.put(`/users/${userToEdit._id}`, {
        name: modalFormData.name,
        email: modalFormData.email,
        occupation: modalFormData.occupation,
      });
      alert("Usuário atualizado com sucesso.");
      getUsers();
      closeEditModal(); 
    } catch (error) {
      console.error("Erro ao atualizar usuário.", error);
      alert("Erro ao atualizar usuário.");
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <form className="principalForm">
        <h1>Cadastrar Usuário</h1>
        <input placeholder="Nome" name="name" type="text" ref={inputName} />
        <input
          placeholder="E-mail"
          name="email"
          type="email"
          ref={inputEmail}
        />
        <input
          placeholder="Cargo"
          name="occupation"
          type="text"
          ref={inputOccupation}
        />
        <button type="button" onClick={createUser}>
          Cadastrar
        </button>
      </form>

      {users.map((user) => (
        <div key={user._id} className="card">
          <div>
            <p>Nome: {user.name} </p>
            <p>E-mail: {user.email}</p>
            <p>Cargo: {user.occupation}</p>
            <p>
              Cadastrado em: {new Date(user.dataCriacao).toLocaleDateString()}
            </p>
          </div>
          <div className="action-buttons">
            <button onClick={() => openEditModal(user)}>
              <img src={Edit} alt="editIcon" />
            </button>
            <button onClick={() => deleteUsers(user._id)}>
              <img src={Trash} alt="trashIcon" />
            </button>
          </div>
        </div>
      ))}

      
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h1>Editar Usuário</h1>
            <form className="modalForm" onSubmit={handleUpdateSubmit}>
              <input
                placeholder="Nome"
                name="name"
                type="text"
                value={modalFormData.name}
                onChange={handleModalFormChange}
              />
              <input
                placeholder="E-mail"
                name="email"
                type="email"
                value={modalFormData.email}
                onChange={handleModalFormChange}
              />
              <input
                placeholder="Cargo"
                name="occupation"
                type="text"
                value={modalFormData.occupation}
                onChange={handleModalFormChange}
              />
              <div className="modal-buttons">
                <button className="btnsave" type="submit">
                  Salvar Alterações
                </button>
                <button
                  className="btncancel"
                  type="button"
                  onClick={closeEditModal}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
