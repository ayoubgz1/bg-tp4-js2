//i used a single step to complete the  website.

//importation des composents HTML
const ajouterBtn=document.getElementsByClassName("ajouterBtn")[0];
const tableau=document.getElementById("tableau");
const consoleBtn=document.getElementsByClassName("consoleBtn")[0];
const supprimerBtn=document.getElementsByClassName("supprimerBtn")[0];
const totalPoint =document.getElementById("totalPoint")
const totalLigne=document.getElementById("totalLigne")
 

//import table information from localstorage if we have else table = empty 
let table= JSON.parse(localStorage.getItem("tableau")) || [] ;
updateTableau();

//i use this function to update the state of  points and ligne Counter
function updateTotalPointLinge(){
    let points=0;
//calculate the sum
    table.forEach((etudiant)=>{
         points += Number(etudiant.points);
    })

    totalPoint.innerHTML= points;
    totalLigne.innerHTML= table.length;
}

//ajouterEtudiant for creat new item into table 
function ajouterEtudiant(){
const nom=document.getElementById("nom");
const prenom=document.getElementById("prenom");
const points=document.getElementById("points");

//data validation
if(nom.value==="" || prenom.value==="" || points.value===""){
    alert("incorrect values") 
    return
}


if(points.value >20 || points.value<0){
    alert("points value inccorect");
    return
}
//push new item from inputs.value
table.push({nom:nom.value,prenom:prenom.value,points:points.value,checked:false});

//clear old data created
nom.value="";
prenom.value="";
points.value="";
//update the table and save the new table
localStorage.setItem("tableau",JSON.stringify(table));
updateTableau();


}

//print in console all iten in table
function consoleTableau(){
    table.forEach((etudiant,index)=>{
        console.log(`Etudiant ${index+1}: Nom: ${etudiant.nom}, Prenom: ${etudiant.prenom}, Points: ${etudiant.points} ,Checked: ${etudiant.checked}`);
    });
}
//supprimer etudiant checked (checkBox==true) and update table
function supprimerEtudiant(){
    const newTable=table.filter(etudiant=>!etudiant.checked);
    localStorage.setItem("tableau",JSON.stringify(newTable));
    updateTableau();
}
//change state of etudiant true to false....
function selectEtudiant(index){
 table[index-1].checked=!table[index-1].checked;
 localStorage.setItem("tableau",JSON.stringify(table))  
}
//update table and creat the new tableau add new rows
function updateTableau(){
    table =JSON.parse(localStorage.getItem("tableau")) || [];
    tableau.innerHTML=`
                <tr class="table-header">
                <th>N</th>
                <th>Nom</th>
                <th>Prenom</th>
                <th>Points</th>
                <th>Select</th>
                </tr>`;
    table.forEach((etudiant,index)=>{
    const newRow=tableau.insertRow(tableau.rows.length);
    newRow.appendChild(document.createElement("td")).innerHTML=tableau.rows.length-1;
    newRow.appendChild(document.createElement("td")).innerHTML=etudiant.nom;
    newRow.appendChild(document.createElement("td")).innerHTML=etudiant.prenom;
    newRow.appendChild(document.createElement("td")).innerHTML=etudiant.points;
    newRow.appendChild(document.createElement("td")).innerHTML=`<input onchange="selectEtudiant(${tableau.rows.length-1})" type="checkbox">`;
});

   updateTotalPointLinge();
}

//add the events for each buttons creat/delete/console
ajouterBtn.addEventListener("click",ajouterEtudiant);
consoleBtn.addEventListener("click",consoleTableau);
supprimerBtn.addEventListener("click",supprimerEtudiant);