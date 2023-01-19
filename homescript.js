const url = "https://striveschool-api.herokuapp.com/api/product/"
postName = document.getElementById("post-name");
postDesc = document.getElementById("post-description");
postBrand = document.getElementById("post-brand");
postPrice = document.getElementById("post-price");
postImage = document.getElementById("post-image");

let arrayOfIds=[];

postObject = async(myObject)=>{
    try{
        let res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(myObject),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MzVjZmU3MzczODAwMTUzNzQzNzkiLCJpYXQiOjE2NzQxMzA4OTUsImV4cCI6MTY3NTM0MDQ5NX0.Lhwgk1EUUirn_mddnwsquUI0rwmcT740RTl3AXgqUL0'
            }
        })
        res = await res.json();
        console.log(res);
        getArrayofObjects();
        if(res.ok) {
            successAlert()
          } else {
            throw res.status + " " + res.statusText
          }  

    }catch(error){
        console.log(error);
    }
}

putItem = async(object,id)=>{
    try{
        let res = await fetch(url+id, {
            method: 'PUT',
            body: JSON.stringify(object),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MzVjZmU3MzczODAwMTUzNzQzNzkiLCJpYXQiOjE2NzQxMzA4OTUsImV4cCI6MTY3NTM0MDQ5NX0.Lhwgk1EUUirn_mddnwsquUI0rwmcT740RTl3AXgqUL0'
            }
        })
        res = await res.json();
        console.log(res);
        getArrayofObjects();
        if(res.ok) {
            successAlert()
          } else {
            throw res.status + " " + res.statusText
          }  

    }catch(error){
}
}
getObject=()=>{
    let object=
    {
        name:`${postName.value}`,
        description:`${postDesc.value}`,
        brand:`${postBrand.value}`,
        imageUrl:`${postImage.value}`,
        price:`${postPrice.value}`
    }
    if(object.name!==''&&object.description!==''&&object.brand!==''&&object.imageUrl!==''&&object.price!==''){
        postObject(object)
        postName.value="";
        postDesc.value="";
        postPrice.value="";
        postBrand.value="";
        postImage.value="";
    }
    else{
        alert("Check your inputs!");
    }
}

editObject=()=>{
    let id=editID.value;
    console.log(id);
    let object=
    {
        name:`${editName.value}`,
        description:`${editDesc.value}`,
        brand:`${editBrand.value}`,
        imageUrl:`${editImage.value}`,
        price:`${editPrice.value}`
    }
    if(object.name!==''&&object.description!==''&&object.brand!==''&&object.imageUrl!==''&&object.price!==''){
        putItem(object,id)
        postName.value="";
        postDesc.value="";
        postPrice.value="";
        postBrand.value="";
        postImage.value="";
    }
    else{
        alert("Check your inputs!");
    }
}

getArrayofObjects = async()=>{
    try{
        let res = await fetch(url, {
            method: 'GET',
            headers:{
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MzVjZmU3MzczODAwMTUzNzQzNzkiLCJpYXQiOjE2NzQxMzA4OTUsImV4cCI6MTY3NTM0MDQ5NX0.Lhwgk1EUUirn_mddnwsquUI0rwmcT740RTl3AXgqUL0'
            }
        })
        res = await res.json();
        arrayOfIds=[];
        res.forEach(item => {
            arrayOfIds.push(item._id)
        });
        console.log(res);
        renderObjectsHome(res);
    }catch(error){
        console.log(error);
    }
}
displayItems = document.getElementById("display-items")
renderObjects = (objects)=>{
    displayItems.innerHTML="";
    objects.forEach(item=>{
        displayItems.innerHTML+=`
        <div class="card col-lg-3 col-md-4 col-sm-6 col-12">
            <img class="card-img-top" src="${item.imageUrl}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">${item.brand}</p>
                <p class="card-text">${item.description}</p>
                <p class="card-text">£${item.price}</p>
                <a class="btn btn-primary" onclick="editItem('${item._id}','${item.name}','${item.description}','${item.brand}','${item.price}','${item.imageUrl}')">Edit</a>
                <a class="btn btn-danger" onclick="deleteItem('${item._id}')">Delete</a>
            </div>
        </div>
`
    })
}
homeProducts = document.getElementById("products-here");
renderObjectsHome = (objects)=>{
    homeProducts.innerHTML="";
    objects.forEach(item=>{
        homeProducts.innerHTML+=`
        <div class="card col-lg-3 col-md-4 col-sm-6 col-12">
            <img class="card-img-top" src="${item.imageUrl}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">${item.brand}</p>
                <p class="card-text">${item.description}</p>
                <p class="card-text">£${item.price}</p>
            </div>
        </div>
`
    })
}
editID = document.getElementById("edit-id");
editName = document.getElementById("edit-name");
editDesc = document.getElementById("edit-description");
editBrand = document.getElementById("edit-brand");
editPrice = document.getElementById("edit-price");
editImage = document.getElementById("edit-image");

editItem = (id,name,description,brand,price,url) =>{
    editID.value = id;
    editName.value = name;
    editDesc.value = description;
    editBrand.value = brand;
    editPrice.value = price;
    editImage.value = url;
}
const deleteItem = async (idToDelete) => {
    //add confirmation
  try {
    let res = await fetch(url + idToDelete, {
      method: "DELETE",
      headers:{
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5MzVjZmU3MzczODAwMTUzNzQzNzkiLCJpYXQiOjE2NzQxMzA4OTUsImV4cCI6MTY3NTM0MDQ5NX0.Lhwgk1EUUirn_mddnwsquUI0rwmcT740RTl3AXgqUL0'
    }
    })
    getArrayofObjects();
  } catch (error) {
    console.log(error);
  }
}

const deleteAllItems = async()=>{
    arrayOfIds.forEach(item=>{
        deleteItem(item);
    })
}
window.onload =() => {
    getArrayofObjects();
}