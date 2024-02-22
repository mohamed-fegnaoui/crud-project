let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes= document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");


// set global variables  
let mood = "create";
let tmp;

// get total function 
function getTotal() {
    if (price.value !== "") {
        let result = (+price.value + + taxes.value + + ads.value) - discount.value;
        total.innerHTML = result;
        total.style.background = "green";
    } else {
        total.innerHTML = "";
        total.style.background = "red";
    };
};

// check local storage 
let dataPro;
if (localStorage.getItem("product") !== null) {
    dataPro = JSON.parse(localStorage.getItem("product"));
    showProducts();
} else {
    dataPro = [];
};

// add event and function to submitBtn
submit.addEventListener("click", function () {
    let newPro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        count: count.value ,
        total: total.innerHTML,
        category: category.value,
    };
    if (mood === "create") {
        if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++){
            dataPro.push(newPro);
        }
    }else {
            dataPro.push(newPro);
        }
    } else {
        dataPro[tmp] = newPro;
        setBackToDefault();
   }
    // add to local storage 
    localStorage.setItem("product", JSON.stringify(dataPro));
    // envoked functions 
    showProducts();
    // clear all inputs 
    clearInputs();
});

// show products 
function showProducts() {
    let table;
    for (let i = 0; i < dataPro.length; i++){
        table +=`<tr> 
                 <td>${i+ 1}</td>
                 <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</th>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateProduct(${i})" class="update">update</button></td>
                <td><button onclick="deleteProduct(${i})" class="delete">delete</button></td></tr>`
    };
    if (dataPro.length > 1) {
        let deletAllBtn = document.getElementById("delete-all");
        deletAllBtn.innerHTML = `<button onclick="deleteAll()">delete All (${dataPro.length}) </button>`;
        deletAllBtn.style.margin = "15px 0";
    } else {
        let deletAllBtn = document.getElementById("delete-all");
        deletAllBtn.innerHTML = "";
    }
    let tbody = document.getElementById("tbody");
    tbody.innerHTML = table;
}

// clear inputs 
function clearInputs() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
};

// delete all  
function deleteAll() {
    dataPro.splice(0);
    showProducts();
    localStorage.clear();
}

// delete product  
function deleteProduct(i) {
    dataPro.splice(i, 1);
    localStorage.setItem("product", JSON.stringify(dataPro));    
    showProducts();
};

// update product 
function updateProduct(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    category.value = dataPro[i].category;
    mood = "update";
    tmp = i;
    submit.innerHTML = "update";
    count.style.display = "none";
    scroll({
        top: 0,
        behavior: "smooth",
    });
};

// set back to default function  
function setBackToDefault() {
    submit.innerHTML = "create";
    mood = "create";
    count.style.display = "block";
    total.style.background = "red";
};






































    





















   


























