import Modal from './modal.js'

const modal = Modal()

const modalTitle = document.querySelector(".modal h2")
const modalDescription = document.querySelector(".modal p")
const modalButton = document.querySelector(".modal button")

const cancelButton = document.querySelector('div.cancel')
const checkButtons = document.querySelectorAll("a.check")
const deleteButtons = document.querySelectorAll(".actions a.delete")

cancelButton.addEventListener("click", modal.close);

checkButtons.forEach(button => {
    //Quando um botão for clicado
    button.addEventListener("click", handleClick)
})

deleteButtons.forEach(button => {
    button.addEventListener("click", (event) => handleClick(event, false))
})

function handleClick(event, check = true) {
    event.preventDefault();

    //get the text to put in the modal
    const text = check ? "Marcar como Lida" : "Excluir"
    //modify the modal
    modalTitle.innerHTML = `${text} esta Pergunta`
    modalDescription.innerHTML = `Tem certeza que você deseja ${text.toLowerCase()} esta pergunta?`
    modalButton.innerHTML = `Sim, ${text}`
    //button
    check ? modalButton.classList.remove('red') : modalButton.classList.add('red')
    
    
    //get variables to build the form
    const slug = check ? "check" : "delete" //action
    const roomId = document.querySelector("#room-id").dataset.id;//get the roomid
    const form = document.querySelector('.modal form') //get the form
    const questionId = event.target.dataset.id;

    //build the new form
    form.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`)

    //abre a modal
    modal.open()
}

//A modal precisa fechando quando clicamos em confirmar. Se não, dois requests podem ser enviados.
// const modalButton2 = document.querySelectorAll(".modal button")[1];
// modalButton2.addEventListener("click", modal.close());