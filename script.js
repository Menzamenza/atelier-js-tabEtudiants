let students = JSON.parse(localStorage.getItem('students')) || [];

const NbreEtudiantsPage = 5;
let PageCurrent = 1;

function Moyenne() {
    if (students.length===0) {
        return 0
    } else {
        let Total = 0;
        for (const student of students) {
            Total += student.note;
        }
        return Total / students.length;  
    }
}

// FONCTION SOMME DES NOTES
function SommeNote() {
    let totalNote = 0;
    for (const chaqueNote of students) {
        totalNote += chaqueNote.note;
    }
    return totalNote;
}

// FONCTION SOMME DES AGES
function SommeAge() {
    let totalAge = 0;
    for (const chaqueAge of students) {
        totalAge += chaqueAge.age;
    }
    return totalAge;
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
const supprimer = '<i class="fa-solid fa-trash border border-danger p-2 rounded" style="color: red;"></i>';
const modifier = '<i class="fa-solid fa-pen ms-4 border border-success p-2 rounded" style="color: green;"></i>';

// Fonction pour afficher les étudiants
function AfficheEtudiant(EtudiantAffiche) {
    const tbody = document.getElementById('Tbody');
    tbody.innerHTML = '';

    for (let i = 0; i < EtudiantAffiche.length; i++) {
        const student = EtudiantAffiche[i];
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${student.nom}</td><td>${student.prenom}</td><td>${student.note}</td><td>${student.age}</td> <td données-id="${i}">${supprimer} ${modifier}</td>`;
        tbody.appendChild(tr);
    }
    localStorage.setItem('students', JSON.stringify(students));
}

// Fonction de la pagination
function Pagination(EtudiantPagination) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const pageCount = Math.ceil(EtudiantPagination.length / NbreEtudiantsPage);

    // Ajouter l'icône "Précédent"
    if (PageCurrent > 1) {
        const prevPageItem = document.createElement('a');
        prevPageItem.href = "#";
        prevPageItem.className = "page-link";
        prevPageItem.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevPageItem.onclick = function (event) {
            event.preventDefault();
            PageCurrent--;
            filtre();
        };
        const prevPageLi = document.createElement('li');
        prevPageLi.className = "page-item";
        prevPageLi.appendChild(prevPageItem);
        pagination.appendChild(prevPageLi);
    }

    for (let i = 1; i <= pageCount; i++) {
        const pageItem = document.createElement('a');
        pageItem.href = "#";
        pageItem.className = "page-link";
        pageItem.innerText = i;
        pageItem.onclick = function (event) {
            event.preventDefault();
            PageCurrent = i;
            filtre();
        };
        const pageLi = document.createElement('li');
        pageLi.className = "page-item";
        if (i === PageCurrent) {
            pageLi.classList.add('active');
        }
        pageLi.appendChild(pageItem);
        pagination.appendChild(pageLi);
    }

    // Ajouter l'icône "Suivant"
    if (PageCurrent < pageCount) {
        const nextPageItem = document.createElement('a');
        nextPageItem.href = "#";
        nextPageItem.className = "page-link";
        nextPageItem.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextPageItem.onclick = function (event) {
            event.preventDefault();
            PageCurrent++;
            filtre();
        };
        const nextPageLi = document.createElement('li');
        nextPageLi.className = "page-item";
        nextPageLi.appendChild(nextPageItem);
        pagination.appendChild(nextPageLi);
    }
}

// Fonction du filtre là où j'ai appelé les autres fonctions
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
    document.getElementById('card2').innerText = "La somme des ages est égale à " + SommeAge();
    document.getElementById('card3').innerText = "Le nombre total de notes est égale à " + compterNotes(students);
    document.getElementById('card4').innerText = "Le nombre total d'âges est égale à " + compterAge(students);
}

document.getElementById('searchInput').addEventListener('input', () => {
    PageCurrent = 1;
    filtre();
});

// Afficher le modal
let bouttonAjout = document.getElementById('bouttonAjout');
let modal = document.getElementById('modal');
let closeModal = document.getElementById('closeModal');

// Une fonction pour vider les champs du formulaire quand on ferme
function viderFormulaire() {
    let formulaire = document.getElementById('formulaire');
    formulaire.reset();
}

// Événement pour afficher le modal à partir du bouton ajouter
bouttonAjout.addEventListener('click', () => {
    modal.style.display = 'block';
});

// Un autre événement pour fermer le modal à partir du bouton fermer
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    viderFormulaire();
});

// Événement pour fermer le modal en cliquant à l'extérieur de celui-ci
document.getElementById('modal').addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        viderFormulaire();
    }
});

// Enregistrer les données dans le local storage et l'afficher dans le tableau
let envoyerModal = document.getElementById('envoyerModal');
envoyerModal.addEventListener('click', () => {
    let prenomAjout = document.getElementById('prenomAjout').value;
    let nomAjout = document.getElementById('nomAjout').value;
    let ageAjout = document.getElementById('ageAjout').value;
    let noteAjout = document.getElementById('noteAjout').value;

    if (prenomAjout === '' || nomAjout === '' || ageAjout === '' || noteAjout === '' || noteAjout >20) {
        alert('Veuillez renseigner les champs correctement');
    } else {
        const newStudent = {
            nom: nomAjout,
            prenom: prenomAjout,
            note: parseFloat(noteAjout),
            age: parseInt(ageAjout)
        };

        students.push(newStudent);
        localStorage.setItem('students', JSON.stringify(students));

        viderFormulaire();
        filtre();
        modal.style.display = 'none';
    }
});

// Fonction pour supprimer un étudiant par l'icône supprimer 
function supprimerEtudiant(event) {
    const index = event.target.closest('td').getAttribute('données-id');
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students)); // Mise à jour du localStorage après suppression
    filtre();
}

// Fonction pour modifier les informations de l'étudiant 
function modifierEtudiant(event) {
    const index = event.target.closest('td').getAttribute('données-id');
    const student = students[index];

    document.getElementById('prenomAjout').value = student.prenom;
    document.getElementById('nomAjout').value = student.nom;
    document.getElementById('ageAjout').value = student.age;
    document.getElementById('noteAjout').value = student.note;

    modal.style.display = 'block';

    // Supprimer les gestionnaires d'événements précédents pour éviter les doublons
    envoyerModal.replaceWith(envoyerModal.cloneNode(true));
    envoyerModal = document.getElementById('envoyerModal');

    envoyerModal.onclick = function () {
        const prenomAjout = document.getElementById('prenomAjout').value;
        const nomAjout = document.getElementById('nomAjout').value;
        const ageAjout = parseInt(document.getElementById('ageAjout').value);
        const noteAjout = parseFloat(document.getElementById('noteAjout').value);

        // Vérifiez si les champs ne sont pas vides et les convertir correctement
        if (prenomAjout !== '' && nomAjout !== '' && !isNaN(ageAjout) && !isNaN(noteAjout)) {
            student.prenom = prenomAjout;
            student.nom = nomAjout;
            student.age = parseInt(ageAjout);
            student.note = parseFloat(noteAjout);

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
    };
}

// Appel des fonctions de modification et de suppression sur les icônes pour s'assurer que ça fonctionne correctement
document.getElementById('Tbody').addEventListener('click', (event) => {
    if (event.target.classList.contains('fa-trash')) {
        supprimerEtudiant(event);
    } else if (event.target.classList.contains('fa-pen')) {
        modifierEtudiant(event);
    }
});

// Initialiser la page avec les données filtrées
window.onload = function () {
    filtre();
};