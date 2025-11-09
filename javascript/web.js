import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
  import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyA3YY-YkJ4tfSiBF1I_M8UVhxyzfMN5238",
    authDomain: "es-portfolio-a6c08.firebaseapp.com",
    projectId: "es-portfolio-a6c08",
    storageBucket: "es-portfolio-a6c08.firebasestorage.app",
    messagingSenderId: "342830960639",
    appId: "1:342830960639:web:be05ff6d2996dff20a21ca"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const projectsContainer = document.getElementById("projectsContainer");

  onSnapshot(collection(db, "web_projects"), (snapshot) => {
    projectsContainer.innerHTML = ""; 
    snapshot.forEach((doc) => {
      const data = doc.data();
      const card = document.createElement("div");
      card.className = "project-card";
      card.innerHTML = `
        <img src="data.imageUrl" alt="screenshot">
        <h4>${data.nom}</h4>
        <p>${data.description}</p>
        <p><strong>Stack:</strong>${data.stack}</p>
        <a href="${data.lien}" target="_blank">Voir le projet</a>
      `;
      projectsContainer.appendChild(card);
    });
  });