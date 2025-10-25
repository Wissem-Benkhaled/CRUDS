let title=document.getElementById("title");

let price=document.getElementById("price");
let taxes=document.getElementById("taxes");
let ads=document.getElementById("ads");
let discount=document.getElementById("discount");
let total=document.getElementById("Total");

let count=document.getElementById("count");
let category=document.getElementById("category");
let search=document.getElementById("search");

let submit_create=document.getElementById('submit');

let index;
function get_total(){
    if(price.value!=""){
        let result= (+price.value + +taxes.value + +ads.value )- +discount.value ;
        total.style.background="#75ef44";
        total.innerHTML= result;

    }else{
        total.innerHTML= '';
        total.style.background="#EF4444";

    }
}


let data_produit;
if(localStorage.Produit!=null){
    data_produit=(JSON.parse(localStorage.Produit));

}else{
    data_produit=[];
}
///Create
submit_create.onclick=function(){
    if(isValid()){
        if(submit_create.innerText=="Create"){
            let new_produit={
                title:title.value.toLowerCase(),
                price:price.value,
                taxes:taxes.value,
                ads:ads.value,
                discount:discount.value,
                total:total.innerText,
                count:count.value,
                category:category.value.toLowerCase()     ,
                
                }; 
                if(count.value>1){
                    for(let i=0 ; i<count.value ; i++){
                        
                        data_produit.push(new_produit);     
                    }
                }
                else{
                    data_produit.push(new_produit);     
                }
                localStorage.setItem('Produit' , JSON.stringify( data_produit))
                clear_inputs()
                afficher()
                console.log("creat is done !")

            }else{
                let update_produit={
                    title:title.value,
                    price:price.value,
                    taxes:taxes.value,
                    ads:ads.value,
                    discount:discount.value,
                    total:total.innerText,
                    category:category.value,    
                };

                data_produit[index]=update_produit;
                clear_inputs()
                afficher()
                count.style.display="block";
                submit_create.innerHTML="Create"

                console.log("update is done !")

            }
    }
}
function clear_inputs(){
    title.value=""
    price.value=""
    taxes.value=""
    ads.value=""
    discont=discount.value=""
    count.value="",
    category.value=""
    get_total()        
}
///Read
function afficher(){
    let table=''
    for(let i =0 ; i<data_produit.length ; i++){
        table+=`
         <tr>
            <td>${i+1}</td>
            <td>${data_produit[i].title}</td>
            <td>${data_produit[i].price}</td>
            <td>${data_produit[i].taxes}</td>
            <td>${data_produit[i].ads}</td>
            <td>${data_produit[i].discount}</td>
            <td>${data_produit[i].total}</td>
            <td>${data_produit[i].category}</td>
            <td><button onclick="updateData(${i})" type="submit">update</button></td>
            <td><button onclick="deleteData(${i})" class="delete">delete</button></td>               
        </tr>
        `
    }

    document.getElementById('tbody').innerHTML=table;
    deleteAll=document.getElementById("deleteAll")
    if(data_produit.length>0){
        deleteAll.innerHTML=`
        <button onclick="delete_All_Data()" >Delete All(${data_produit.length})</button>
        `
    }else{
        deleteAll.innerHTML=''

    }
}
///delete

function deleteData(i){
    data_produit.splice(i,1);
    localStorage.Produit=JSON.stringify(data_produit);
    afficher();
}
function delete_All_Data(){
    localStorage.clear();
    data_produit.splice(0);
    afficher()

}

/// Update
function updateData(i){
    title.value=data_produit[i].title;
    price.value=data_produit[i].price;
    ads.value=data_produit[i].ads;
    taxes.value=data_produit[i].taxes;
    discount.value=data_produit[i].discount;
    get_total()

    count.style.display="none";
    submit_create.innerHTML="UPDATE"
    category.value=data_produit[i].category;
    index=i;
    scroll({
        top:0,
        behavior:"instant",
    })

}

//Search
let mood_search="category";

function seach_by(id){
    mood_search=(id=="seach_by_category"?'category' : 'title' )
    search.placeholder="seach by "+ mood_search
    search.value=''
}
function search_data(text_search){
    let table_search=''
    for(let i=0;i<data_produit.length;i++){

        if(mood_search=='title'){  
            if(data_produit[i].title.includes(text_search.toLowerCase())){
            table_search+=`
                    <tr>
                        <td>${i+1}</td>
                        <td>${data_produit[i].title}</td>
                        <td>${data_produit[i].price}</td>
                        <td>${data_produit[i].taxes}</td>
                        <td>${data_produit[i].ads}</td>
                        <td>${data_produit[i].discount}</td>
                        <td>${data_produit[i].total}</td>
                        <td>${data_produit[i].category}</td>
                        <td><button onclick="updateData(${i})" type="submit">update</button></td>
                        <td><button onclick="deleteData(${i})" class="delete">delete</button></td>               
                    </tr>
                    `
                    }
                
        }else{
            if(data_produit[i].category.includes(text_search.toLowerCase())){
                table_search+=`
                        <tr>
                            <td>${i+1}</td>
                            <td>${data_produit[i].title}</td>
                            <td>${data_produit[i].price}</td>
                            <td>${data_produit[i].taxes}</td>
                            <td>${data_produit[i].ads}</td>
                            <td>${data_produit[i].discount}</td>
                            <td>${data_produit[i].total}</td>
                            <td>${data_produit[i].category}</td>
                            <td><button onclick="updateData(${i})" type="submit">update</button></td>
                            <td><button onclick="deleteData(${i})" class="delete">delete</button></td>               
                        </tr>
                        `
                    }
        
                }
              
    }    
    document.getElementById('tbody').innerHTML=table_search;

}

//condition data 
function isValid(){
    test=true
    if(title.value=="" || price.value =="" || category==""){
        console.log("check your value , this product is invalid")
        test=false
        clear_inputs()
    }
    return test
}

afficher()
