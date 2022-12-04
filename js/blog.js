window.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault
    //Cuando el documento haya cargado entero ejecutara esto.
    var button_ShowUsers = document.getElementById('btn-users');
    var button_ShowPosts = document.getElementById('btn-posts');
    printTableUsers();
    printTablePost();




    button_ShowPosts.addEventListener('click', (e => {
        showPosts();
        e.target.disabled = true;
        hideUsers();
    }))

    button_ShowUsers.addEventListener('click', (e) => {
        showUsers();
        e.target.disabled = true;
        hidePosts();
    });







})

var post = [];
var index = 0;
var max = 0;
var start = 0;
var finish = 0;


async function getAllUsers() {
    return fetch(`https://jsonplaceholder.typicode.com/users`)
        .then((response) => response.json())
        .then((users) => {

            return users;
        })
        .catch((error) => {
            console.log("error")
        });
}

async function getAllPosts() {
    return fetch(`https://jsonplaceholder.typicode.com/posts`)
        .then((response) => response.json())
        .then((posts) => {

            return posts;
        })
        .catch((error) => {
            console.log("error")
        });
}

async function getPost(id) {
    return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
        .then((response) => response.json())
        .then((post) => {

            return post;
        })
        .catch((error) => {
            console.log("error")
        })
}

function printTableUsers() {
    getAllUsers().then((allData) => {
        console.log(allData);
        const data_placeholder = document.getElementById('data-place-holder')

        allData.forEach(data => {
            let tr = document.createElement("tr");
            let th = document.createElement("th")
            th.innerText = `${data.id}`;

            let td_name = document.createElement("td");

            let a_name = document.createElement("a");
            a_name.textContent = `${data.name}`;
            a_name.setAttribute("href", `javascript:displayUser(${data.id})`);


            let td_mail = document.createElement("td");
            td_mail.textContent = `${data.email}`;

            let td_post = document.createElement("td");
            let a_post = document.createElement("a");
            a_post.setAttribute("href", `javascript:showPost(${data.id})`);
            a_post.textContent = "POST"

            tr.append(th);
            td_name.append(a_name);
            tr.append(td_name);
            tr.append(td_mail);
            td_post.append(a_post);
            tr.append(td_post);


            data_placeholder.append(tr);
        });
        hideUsers();
    });
}

function printTablePost() {
    getAllPosts().then((allPost) => {
        console.log(allPost);
        const post_placeholder = document.getElementById('post-place-holder');
        /*
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID USUARIO</th>
              <th scope="col">Titulo</th>
              <th scope="col-3">Contenido</th>
            </tr>
        */
        allPost.forEach(post => {
            let tr = document.createElement("tr");
            let id = document.createElement("th")
            id.innerText = `${post.id}`;

            let td_id_user = document.createElement("td");
            td_id_user.textContent = `${post.userId}`;

            let td_title = document.createElement("td");
            td_title.textContent = `${post.title}`;

            let td_content = document.createElement("td");
            td_content.textContent = `${post.body}.`

            tr.append(id);
            tr.append(td_id_user);
            tr.append(td_title);
            tr.append(td_content);
            post_placeholder.append(tr)

        });
        hidePosts();






    })
}


function displayCards(s, f) {
    console.log(`start: ${start}, finish: ${finish}`);

    const post_placeholder_container = document.getElementById("post-placeholder-container");
    const post_placeholder = document.getElementById("post-placeholder");

    for (let i = s; i < f; i++) {
        let card_body = document.createElement("div");
        card_body.classList.add("card-body");

        let card_h5 = document.createElement("h5");
        card_h5.classList.add("card-title");
        card_h5.textContent = post[i].title;


        let card_p = document.createElement("p");
        card_p.classList.add("card-body2")
        card_p.textContent = post[i].body;

        card_body.append(card_h5);
        card_body.append(card_p);

        post_placeholder.append(card_body);
    }

    start = s + 5;
    finish = f;

    if (finish === max) {
        document.getElementById("button-more-container").querySelectorAll(".button_more")[0].style.display = "none";
    }

    post_placeholder_container.style.display = "block";
}

function showPost(id) {
    getPost(id).then((posts) => {
        post = posts;
        index = 0;
        max = Object.keys(posts).length;

        handleEventListenerButton();
        displayCards(0, max >= 5 ? 5 : max);
    });
}

function handleEventListenerButton() {
    let btn_more_container = document.getElementById("button-more-container");
    let btn_more = document.createElement("button");
    btn_more.classList.add("button_more");
    btn_more.innerHTML = "More";
    btn_more.addEventListener('click', () => {
        displayCards(start, finish + 5 < max ? finish + 5 : max);
    })
    btn_more_container.append(btn_more);

    const post_placeholder_container = document.getElementById("post-placeholder-container");
    const post_placeholder = document.getElementById("post-placeholder");
    let btn_close = document.getElementById("close-button");
    btn_close.addEventListener('click', () => {
        btn_more.style.display = "block";
        post_placeholder_container.style.display = "none";

        clearElement(post_placeholder);

        toRemove = document.getElementById("button-more-container").querySelectorAll(".button_more");
        toRemove.forEach(element => {
            element.parentNode.removeChild(element);
        });

        start = 0;
        finish = 0;
    })
}

function clearElement(element) {

    let listElementToRemove = [];
    listElementToRemove = element.querySelectorAll(".card-body");
    listElementToRemove.forEach(element => {
        element.parentNode.removeChild(element);
    });


}

function createButtonMore(index, element) {
    let button_more = document.createElement("button");
    button_more.addEventListener('click', (e) => {
        getPost(index).then
    })
}


function hideUsers() {
    let div = document.getElementById('user-data');
    div.style.display = "none"

}

function showUsers() {
    let postButton = document.getElementById('btn-posts')
    console.log(postButton)
    let div = document.getElementById('user-data');
    div.style.display = "block";
    if (postButton.disabled) {
        postButton.disabled = false;
    }
    

}

function hidePosts() {
    let div = document.getElementById('post-data');
    div.style.display = "none";
}
function showPosts() {
    let userButton = document.getElementById('btn-users')
    let div = document.getElementById('post-data');
    div.style.display = "block";
    if(userButton.disabled){
        userButton.disabled = false;
    }
    
}

function showPersonalData(element){
    element.style.display = "block";
}
function hidePersonalData(element){
    element.style.display = "none";
}
function clearPersonalData(){
    let userContainer = document.getElementById("user-data-container");
    userContainer.parentNode.removeChild(userContainer);
}



function displayUser(id) {
    getUser(id).then((userData) => {
        console.log(userData);
        const user_container = document.getElementById("user-placeholder-container")
        const user_placeholder = document.getElementById("user-placeholder");
        const button_user_close = document.getElementById("close-button-user")
        button_user_close.addEventListener('click', (e) =>{
            
            clearPersonalData();
            hidePersonalData(user_container);
            showUsers();
        })
        
        
            let div_container_all = document.createElement("div");
            div_container_all.setAttribute("id","user-data-container");
            
            //datos personales
            let container_personal_Data = document.createElement("div");
            let personal_data_list = document.createElement('ul');
            let id = document.createElement("li");
            id.textContent = `ID: ${userData.id}`;
            let name = document.createElement("li");
            name.textContent = `Nombre: ${userData.name}`;

            let username = document.createElement("li");
            username.textContent = `Usuario: ${userData.username}`;

            let email = document.createElement("li");
            email.textContent = `Correo Electronico: ${userData.email}`;


            let phone = document.createElement("li");
            phone.textContent = `Telefono: ${userData.phone}`;

            let website = document.createElement("li");
            website.textContent = `Pagina web: ${userData.website}`;
            //llenamos <ul> y lo guardamos en el div
            personal_data_list.append(name);
            personal_data_list.append(username);
            personal_data_list.append(email);
            personal_data_list.append(phone);
            personal_data_list.append(website);

            container_personal_Data.append(personal_data_list);



            //datos direccion
            let container_address_data = document.createElement("div")
            let address_list = document.createElement("ul");

            let address_street = document.createElement("li");
            address_street.textContent = `Calle: ${userData.address.street}`;

            let address_suite = document.createElement("li");
            address_suite.textContent = `Suite: ${userData.address.suite}`;

            let address_city = document.createElement("li");
            address_city.textContent = `Ciudad: ${userData.address.city}`;


            let address_zipcode = document.createElement("li");
            address_zipcode.textContent = `Codigo postal: ${userData.address.zipcode}`;

            //Rellenamos <ul> y lo guardamos en el div
            address_list.append(address_street);
            address_list.append(address_suite);
            address_list.append(address_city);
            address_list.append(address_zipcode);
            container_address_data.append(address_list);


            //geolocalizacion
            let container_geo_data = document.createElement("div");
            let geo_list = document.createElement("ul");

            let geo_lat = document.createElement("li");
            geo_lat.textContent = `Latitud: ${userData.address.geo.lat}`;

            let geo_lng = document.createElement("li");
            geo_lng.textContent = `Longitud: ${userData.address.geo.lng}`;

            //Rellenamos <ul> y lo guardamos en el div
            geo_list.append(geo_lat);
            geo_list.append(geo_lng);

            container_geo_data.append(geo_list);


            //empresa
            let container_company = document.createElement("div");
            let company_list = document.createElement("ul");

            let company_name = document.createElement("li");
            company_name.textContent = `Empresa: ${userData.company.name}`;

            let company_catchPhrase;
            company_catchPhrase = document.createElement("li");
            company_catchPhrase.textContent = `Eslogan: ${userData.company.catchPhrase}`;

            let company_bs = document.createElement("li");
            company_bs.textContent = `Funcion: ${userData.company.bs}`;

            company_list.append(company_name);
            company_list.append(company_catchPhrase);
            company_list.append(company_bs);

            container_company.append(company_list);


            //Metemos todos los div en el container principal

            div_container_all.append(container_personal_Data);
            div_container_all.append(container_address_data);
            div_container_all.append(container_geo_data);
            div_container_all.append(container_company);

            user_placeholder.append(div_container_all);


        
        showPersonalData(user_container);
        hideUsers();
        

    });

}

async function getUser(id) {
    return fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((response) => response.json())
        .then((userData) => {
            console.log(userData);
            return userData;
        })
        .catch((error) => {
            console.log("error")
        });
}


//function para mostrar usuarios de 5 en 5.
//console.log(Object.keys(users).length) devuelve las entradas de la cantidad de usuarios 

