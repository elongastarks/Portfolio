import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
  import { getFirestore, collection, query, where, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

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

  const portfolioContainer = document.getElementById("portfolioContainer");

 
  const projectsRef = collection(db, "scenariste_projects");
  const q = query(
    projectsRef, 
    where("isPortfolio", "==", true), 
    orderBy("highlightOrder")
  );

 
  onSnapshot(q, (snapshot) => {
    portfolioContainer.innerHTML = ""; // reset container
    if (snapshot.empty) {
      portfolioContainer.innerHTML = "<p style='color:var(--muted); text-align:center;'>Aucun projet vedette pour le moment.</p>";
      return;
    }

    snapshot.forEach(doc => {
      const data = doc.data();
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${data.imageUrl}" alt="${data.title}">
        <div class="card-content">
          <h4>${data.title}</h4>
          <p><strong>Type :</strong> ${data.type}<br>
             <strong>Genre :</strong> ${data.genre}<br>
             <strong>Année :</strong> ${data.year}<br>
             <strong>Statut :</strong> ${data.status}</p>
          <p>${data.pitch}</p>
          <a class="btn-view" href="${data.videoUrl}" target="_blank">Voir la vidéo</a>
        </div>
      `;
      portfolioContainer.appendChild(card);
    });
  }, (error) => {
    console.error("Erreur Firestore :", error);
    portfolioContainer.innerHTML = "<p style='color:var(--accent-orange); text-align:center;'>Impossible de charger les projets vedettes pour le moment.</p>";
  });