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

// Scrollbar
window.onscroll = function onScroll(){
    let pixelsFromTop = window.scrollY;

    let documentHeight = document.body.clientHeight;

    let windowHeight = window.innerHeight;

    let difference = documentHeight - windowHeight;

    let percentage = (pixelsFromTop *100) / difference;

    document.querySelector(".progress-bar").style.width = `${percentage}%`;
}


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

const postClientForm = document.addEventListener("submit", async () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    let client = {
        name: name,
        email: email
    }
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1/posts', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
        },
        body: JSON.stringify(client)
    });

        if(response.ok){
        const data = await response.json();
        console.log(data);
        }

        else{
            console.log("I have a bad feeling about this...")
        }

    }
    catch(error){
        console.log(error);
    }

});

postClientForm();

/*Return Button*/
const returnBtn = document.querySelector(".return-button").addEventListener("click", () => {
    setTimeout(() => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        })
    }, 200);
});