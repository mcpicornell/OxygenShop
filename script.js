// Selection of HTML objects
const burger = document.querySelector('.burger i');
const nav = document.querySelector('.nav');

// Defining a function
function toggleNav() {
    burger.classList.toggle('fa-bars');
    burger.classList.toggle('fa-times');
    nav.classList.toggle('nav-active');
}

// Calling the function after click event occurs
burger.addEventListener('click', function() {
    toggleNav();
});


// DOM to change the current value in the pricing section

const actualSelection = document.getElementById("selector");

actualSelection.addEventListener("change", async() => {

    let value = actualSelection.value;
    let symbol = "";

    if (value === "eur") {
        symbol = "€";
    } else if (value === "usd") {
        symbol = "$";
    } else if (value === "gbp"){
        symbol = "£";
    }

    try {
        let response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/${value}.json`);

        if (response.ok) {
            let data = await response.json();

            let currency = data[value];
            let basic = Math.round(0 * currency);
            let pro = Math.round(25 * currency);
            let premium = Math.round(60 * currency);

            document.getElementById("basic-price").innerHTML = symbol + basic;
            document.getElementById("pro-price").innerHTML = symbol + pro;
            document.getElementById("premium-price").innerHTML = symbol + premium;

            
        } else {
            console.log("these aren't the droids you're looking for...");
        }
        
    } catch (error) {
        console.log(error);
    }
    
});

//Get and post Client form data

const btnForm = document.getElementById("sendBtn");

const regexpName = /^.{2,100}$/;
const regexpEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

btnForm.addEventListener("click",async (event) => {
    event.preventDefault();
    const name = document.getElementById("name");
    const email = document.getElementById("email");

    const check = document.getElementById("consent");

    let client = {
        name: name.value,
        email: email.value
    }

    if (!regexpName.test(name.value)) {
        name.classList.add("input-error");
    } else {
        name.classList.remove("input-error");
    }
    if (!regexpEmail.test(email.value)) {
        email.classList.add("input-error");
    } else {
        email.classList.remove("input-error");
    }

    if (regexpName.test(name.value) && regexpEmail.test(email.value) && check.checked) {

        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/users/1/posts', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
            },
            body: JSON.stringify(client)
        })
            if(response.ok){
            const data = await response.json();
            console.log(data);
            }
    
            else{
                console.log("I have a bad feeling about this...")
            }
            console.log('I am in')
        }
        catch(error){
                console.log(error);
        }    
    }
});
    

//Modal Form

function modalFormValidator(nombre, email, checkbox) {
    let validator = true;
    if (nombre.length < 2 || nombre.length > 100) {
        validator = false;
        document.getElementById("modalName").placeholder = "Wrong name (2-50 caracteres)";
        document.getElementById("modalName").classList.add("error-form");
        document.getElementById("modalName").value = "";
    }

    else if (email.test() === false) {
        validator = false;
        document.getElementById("modalEmail").placeholder = "Wrong email address";
        document.getElementById("modalEmail").classList.add("error-form");
        document.getElementById("modalEmail").value = "";
    }
    else if (checkbox === false) {
        validator = false;
        document.getElementById("modal-terminos").classList.add("error-form-text");
    }
    return validator;
}

window.sessionStorage.setItem("modalAlreadyShown", "false");

window.addEventListener("scroll", function () {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;

    if (window.sessionStorage.getItem("modalAlreadyShown") === "false") {
        if (scrolled > 25) {
            document.getElementById("modal").showModal();
            window.sessionStorage.setItem("modalAlreadyShown", "true");
        }
    }
});


setTimeout(function modalController() {
    if (window.sessionStorage.getItem("modalAlreadyShown") === "false") {
        document.getElementById("modal").showModal();
        window.sessionStorage.setItem("modalAlreadyShown", "true");
    }
}, 5000);


window.addEventListener("keypress", function(event){
    if(event.key === 'ESC'){
        document.getElementById("modal").close();
    }
});

document.getElementById("modalform-close").addEventListener('click', function(event){    
    document.getElementById("modal").close();
    }
);

window.addEventListener("click", function(event){
    let elemento = document.getElementById("modal");
    if(!elemento.contains(event.target)){
        elemento.close();
    }
});


/*Return Button*/




const returnBtn = document.querySelector(".return-button").addEventListener("click", () => {

        setTimeout(() => {
            window.scroll({
                top: 0,
                behavior: "smooth",
            })
        }, 200);
        
    });

    window.addEventListener("scroll", () => {
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (winScroll / height) * 100;
        if (scrolled > 50) {
            document.getElementById("return-button").style.visibility = "visible";
        }
    
        else if (scrolled < 50) {
            document.getElementById("return-button").style.visibility = "hidden";
        }
    })

    // Scrollbar


window.onscroll = function onScroll(){
    let pixelsFromTop = window.scrollY;

    let documentHeight = document.body.clientHeight;

    let windowHeight = window.innerHeight;

    let difference = documentHeight - windowHeight;

    let percentage = (pixelsFromTop *100) / difference;

    document.querySelector(".progress-bar").style.width = `${percentage}%`;
}


