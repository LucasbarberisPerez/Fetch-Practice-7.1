async function getData(user){
  return fetch(`https://jsonplaceholder.typicode.com/users?username=${user}`)
  .then((response) => response.json())
  .then((json) =>  {
    return json[0]['address']['zipcode']
    
  })
  .catch((error) => {
      console.log("error")
    });
    
}

async function getZipcode(username){
  let response = await fetch(`https://jsonplaceholder.typicode.com/users?username=${username}`);
  let userData = await response.json();
  console.log("xd "+userData[0]['username']);
  return userData[0][username] //no funciona.
}


let dato = getData("Bret").then((resultado) =>{console.log(resultado)}).catch((error) =>{console.log(error)})



