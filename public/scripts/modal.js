const checkWrapper = document.querySelector(".modal-wrapper");
//const deletewrapper = document.querySelector(".modal-wrapper");

export default function Modal() {

    function open(){
        checkWrapper.classList.add("active");
    }
    function close(){
        checkWrapper.classList.remove("active");
    }
    
    return {
        open,
        close
    }
}