import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
  import { getFirestore, collection, onSnapshot, query, where, orderBy } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

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

  const container = document.getElementById("projectsContainer");

  
  const projectsRef = collection(db, "scenariste_projects");

  const q = query(projectsRef, where("isPortfolio", "==", false), orderBy("highlightOrder"));

  onSnapshot(q, (snapshot) => {
    container.innerHTML = ""; 
    snapshot.forEach(doc => {
      const data = doc.data();

      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        ${data.imageUrl ? `<img src="${data.imageUrl}" alt="${data.title}">` : ""}
        <div class="title">${data.title}</div>
        <div class="meta">
          <strong>Type:</strong> ${data.type} | 
          <strong>Genre:</strong> ${data.genre} | 
          <strong>Année:</strong> ${data.year} | 
          <strong>Status:</strong> ${data.status}
        </div>
        <p>${data.pitch}</p>
        <p>${data.synopsis}</p>
        ${data.videoUrl ? `<a href="${data.videoUrl}" target="_blank">Voir le teaser</a>` : ""}
        <p><strong>Tags :</strong> ${Array.isArray(data.tags) ? data.tags.join(", ") : data.tags}</p>
      `;

      container.appendChild(card);
    });
  }, (error) => {
    console.error("Erreur récupération projets :", error);
    container.innerHTML = "<p>Impossible de charger les projets pour le moment.</p>";
  });