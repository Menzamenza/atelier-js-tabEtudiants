const students = [
    { nom: "Ndiaye", prenom: "Fatima", note: 14, age: 22 },
    { nom: "Ndiaye", prenom: "Sokhna", note: 12, age: 20 },
    { nom: "Ndiaye", prenom: "Aby", note: 16, age: 28 },
    { nom: "Ndiaye", prenom: "Ousmane", note: 11, age: 23 },
    { nom: "Ndiaye", prenom: "Binta", note: 13, age: 25 },
    { nom: "Ndiaye", prenom: "Mbissane", note: 10, age: 21 },
    { nom: "Ndiaye", prenom: "Mariama", note: 15, age: 15 },
    { nom: "Ndiaye", prenom: "Falilou", note: 9, age: 24 },
    { nom: "Ndiaye", prenom: "Doucoure", note: 17, age: 25 },
    { nom: "Ndiaye", prenom: "Khoudoss", note: 8, age: 2 }
];

const NbreEtudiantsPage = 5;
let PageCurrent = 1;

function Moyenne() {
    let Total = 0;
    for (const student of students) {
        Total += student.note;
    }
    return Total / students.length;
}

// FONCTION SOMME DES NOTES
function SommeNote() {
    let totalNote = 0
    for (const chaqueNote of students) {
        totalNote += chaqueNote.note
    }
    return totalNote
}


// FONCTION SOMME DES AGES
function SommeAge() {
    let totalAge = 0
    for (const chaqueAge of students) {
        totalAge += chaqueAge.age
    }
    return totalAge
}

// FONCTION NOMBRE DE NOTES
function compterNotes() {
    return students.length;
}

// FONCTION NOMBRE D'AGES
function compterAge() {
    return students.length;
}
// mettre les icones dans les variables
const supprimer = '<i class="fa-solid fa-trash border border-danger p-2 rounded" style="color: red;" onclick="supprimerEtudiant(event)"></i>';
const modifier = '<i class="fa-solid fa-pen ms-4 border border-success p-2 rounded" style="color: green;"onclick="modifierEtudiant(event)" ></i>'
// Fonction pour afficher les étudiants
function AfficheEtudiant(EtudiantAffiche) {
    const tbody = document.getElementById('Tbody');
    tbody.innerHTML = '';

    // utliser la boucle for pour afficher
    for (let i = 0; i < EtudiantAffiche.length; i++) {
        const student = EtudiantAffiche[i];
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${student.nom}</td><td>${student.prenom}</td><td>${student.note}</td><td>${student.age}</td> <td données-id="${i}">${supprimer} ${modifier}</td>`;
        tbody.appendChild(tr);
    }
    localStorage.setItem('students', JSON.stringify(students));

}

// fonction pour supprimer un etudiant par l'icone supprimer 
function supprimerEtudiant(event) {
    const index = event.target.closest('td').getAttribute('données-id');
    students.splice(index, 1);
    filtre();
}

// fonction de la pagination
function Pagination(EtudiantPagination) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const pageCount = Math.ceil(EtudiantPagination.length / NbreEtudiantsPage);

    // parcourir le nombre de page (=2) et mettre les liens de switch entre les paginations
    for (let i = 1; i <= pageCount; i++) {
        const pageItem = document.createElement('a'); //creer le lien 
        pageItem.href = "#"; //lui mettre le href à #
        pageItem.className = "page-link"; //lui ajouter une classe
        pageItem.innerText = i; //mnt changer le contenu pour le mettre à i c-à-d qu'il va correspondre au nombre d'itération
        pageItem.onclick = function (event) { // afficher la page correspondante au click du lien
            event.preventDefault();
            PageCurrent = i;
            filtre();
        };
        const pageLi = document.createElement('li');
        pageLi.className = "page-item";
        pageLi.appendChild(pageItem);
        pagination.appendChild(pageLi);
    }
}

// fonction du filtre là où j'ai appelé les autres fonctions
function filtre() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const EtudiantFiltres = students.filter(student =>
        student.nom.toLowerCase().includes(searchInput) || student.prenom.toLowerCase().includes(searchInput)
    );

    const startIndex = (PageCurrent - 1) * NbreEtudiantsPage;
    const EtudiantAffiche = EtudiantFiltres.slice(startIndex, startIndex + NbreEtudiantsPage);

    AfficheEtudiant(EtudiantAffiche);
    Pagination(EtudiantFiltres);

    document.getElementById('MoyGen').innerText = Math.round(Moyenne() * 100) / 100;
    document.getElementById('card1').innerText = SommeNote();
    document.getElementById('card2').innerText = "La somme des ages est égale à " + SommeAge()
    document.getElementById('card3').innerText = "Le nombre total de notes est égale à " + compterNotes(students)
    document.getElementById('card4').innerText = "Le nombre total d'âges est égale à " + compterAge(students)

}

document.getElementById('searchInput').addEventListener('input', () => {
    PageCurrent = 1;
    filtre();
});


window.onload = filtre;

// Afficher le modal
let bouttonAjout = document.getElementById('bouttonAjout');
let modal = document.getElementById('modal');
let closeModal = document.getElementById('closeModal');

// une fonction pour vider les champs du formulaire quand on ferme
function viderFormulaire() {
    let formulaire = document.getElementById('formulaire')
    formulaire.reset()
}
// evenement pour afficher le modal à partir du boutton ajouter
bouttonAjout.addEventListener('click', () => {
    modal.style.display = 'block';
});

// un autre évenement pour fermer le modal à partir du bouton fermer
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    viderFormulaire()
});

// evenement pour fermer le modal en cliquant à l'extérieur de celui-ci
document.getElementById('modal').addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        viderFormulaire()
    }
});

// enregister les données dans le local storage et l'afficher dans le tableau
let envoyerModal = document.getElementById('envoyerModal')
envoyerModal.addEventListener('click', () => {
    let prenomAjout = document.getElementById('prenomAjout').value
    let nomAjout = document.getElementById('nomAjout').value
    let ageAjout = document.getElementById('ageAjout').value
    let noteAjout = document.getElementById('noteAjout').value

    if (prenomAjout === '' || nomAjout === '' || ageAjout === '' || noteAjout === '') {
        alert('veuiller renseigner les champs')
    } else {
        const newStudent = {
            nom: nomAjout,
            prenom: prenomAjout,
            note: parseFloat(noteAjout),
            age: parseInt(ageAjout)
        };

        students.push(newStudent);
        localStorage.setItem('students', JSON.stringify(students));


        // modal.style.display='none';
        viderFormulaire();
        filtre();
    }
})
// fonction pour modifier les informations de l'étudiant 
function modifierEtudiant(event) {
    const index = event.target.closest('td').getAttribute('données-id');
    const student = students[index];
    
    document.getElementById('prenomAjout').value = student.prenom;
    document.getElementById('nomAjout').value = student.nom;
    document.getElementById('ageAjout').value = student.age;
    document.getElementById('noteAjout').value = student.note;
    
    modal.style.display = 'block';
    
    console.log(student.prenom);
    console.log(nomAjout);
    console.log(ageAjout);
    console.log(noteAjout);
    envoyerModal.click = function() {
        student.prenom= document.getElementById('prenomAjout').value;
        student.nom = document.getElementById('nomAjout').value;
        student.age = parseInt(document.getElementById('ageAjout').value);
        student.note = parseFloat(document.getElementById('noteAjout').value);

à       
        // Vérifiez si les champs ne sont pas vides et les convertir correctement
        if (prenomAjout !== '' && nomAjout !== '' && !isNaN(ageAjout) && !isNaN(noteAjout)) {
            student.prenom= document.getElementById('prenomAjout').value;
            console.log(student.prenom);
            student.nom = nomAjout;
            student.age = ageAjout;
            student.note = noteAjout;

            // Enregistrer les modifications
            students[index] = student;
            localStorage.setItem('students', JSON.stringify(students));
            
            // Fermer le modal
            modal.style.display = 'none';
            viderFormulaire();
            filtre();
        } else {
            alert('Veuillez remplir tous les champs correctement.');
        }
        envoyerModal.click = null;

    };
} 


