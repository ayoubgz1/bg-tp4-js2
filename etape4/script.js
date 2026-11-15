
const ajouterBtn=document.getElementsByClassName("ajouterBtn")[0];
const tableau=document.getElementById("tableau");
const consoleBtn=document.getElementsByClassName("consoleBtn")[0];
const supprimerBtn=document.getElementsByClassName("supprimerBtn")[0];
const totalPoint =document.getElementById("totalPoint")
const totalLigne=document.getElementById("totalLigne")

let table= JSON.parse(localStorage.getItem("tableau")) || [] ;
updateTableau();

function updateTotalPointLinge(){
    let points=0;

    table.forEach((etudiant)=>{
         points += Number(etudiant.points);
    })

    totalPoint.innerHTML= points;
    totalLigne.innerHTML= table.length;
}


function ajouterEtudiant(){
const nom=document.getElementById("nom");
const prenom=document.getElementById("prenom");
const points=document.getElementById("points");


if(nom.value==="" || prenom.value==="" || points.value===""){
    alert("incorrect values") 
    return
}


if(points.value >20 || points.value<0){
    alert("points value inccorect");
    return
}
table.push({nom:nom.value,prenom:prenom.value,points:points.value,checked:false});

nom.value="";
prenom.value="";
points.value="";

localStorage.setItem("tableau",JSON.stringify(table));
updateTableau();


}


function consoleTableau(){
    table.forEach((etudiant,index)=>{
        console.log(`Etudiant ${index+1}: Nom: ${etudiant.nom}, Prenom: ${etudiant.prenom}, Points: ${etudiant.points} ,Checked: ${etudiant.checked}`);
    });
}
    
function supprimerEtudiant(){
    const newTable=table.filter(etudiant=>!etudiant.checked);
    localStorage.setItem("tableau",JSON.stringify(newTable));
    updateTableau();
}

function selectEtudiant(index){
 table[index-1].checked=!table[index-1].checked;
 localStorage.setItem("tableau",JSON.stringify(table))  
}

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

ajouterBtn.addEventListener("click",ajouterEtudiant);
consoleBtn.addEventListener("click",consoleTableau);
supprimerBtn.addEventListener("click",supprimerEtudiant);