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


// Fonction pour afficher les étudiants
function AfficheEtudiant(EtudiantAffiche) {
    const tbody = document.getElementById('Tbody');
    tbody.innerHTML = '';

    // utliser la boucle for pour afficher
    for (let i = 0; i < EtudiantAffiche.length; i++) {
        const student = EtudiantAffiche[i];
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${student.nom}</td><td>${student.prenom}</td><td>${student.note}</td><td>${student.age}</td>`;
        tbody.appendChild(tr);
    }

    // tiliser map et une boucle for pour afficher
    // const studentMap = students.map(student => {
    //     const tr = document.createElement('tr');
    //     tr.innerHTML = `<td>${student.nom}</td><td>${student.prenom}</td><td>${student.note}</td><td>${student.age}</td>`;
    //     return tr
    // })
    // for (const lignes of studentMap) {
    //     tbody.appendChild(lignes)
    // }
    // une autre utilisation de map
    // EtudiantAffiche.map(student => {
    //     const tr = document.createElement('tr');
    //     tr.innerHTML = `<td>${student.nom}</td><td>${student.prenom}</td><td>${student.note}</td><td>${student.age}</td>`;
    //     tbody.appendChild(tr);
    // });

}


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

function filtre() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const EtudiantFiltres = students.filter(student =>
        student.nom.toLowerCase().includes(searchInput) || student.prenom.toLowerCase().includes(searchInput)
    );

    const startIndex = (PageCurrent - 1) * NbreEtudiantsPage;
    const EtudiantAffiche = EtudiantFiltres.slice(startIndex, startIndex + NbreEtudiantsPage);

    AfficheEtudiant(EtudiantAffiche);
    Pagination(EtudiantFiltres);

    document.getElementById('MoyGen').innerText = Moyenne();
    document.getElementById('card1').innerText=SommeNote();
    document.getElementById('card2').innerText="La somme des ages est égale à " + SommeAge()
    document.getElementById('card3').innerText="Le nombre de note est égale à " + compterNotes(students)
    document.getElementById('card4').innerText="Le nombre de ages est égale à " + compterAge(students)

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

        localStorage.setItem('nom', document.getElementById('nomAjout').value);
        localStorage.setItem('prenom', document.getElementById('prenomAjout').value);
        localStorage.setItem('age', document.getElementById('ageAjout').value);
        localStorage.setItem('note', document.getElementById('noteAjout').value);

        // modal.style.display='none';
        viderFormulaire();
        filtre();
    }
})




