import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
  import { getFirestore, collection, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

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

  const realisationsRef = collection(db, "scenariste-realisation");

  const q = query(realisationsRef, orderBy("title"));

  const container = document.getElementById("realisationsContainer");

  onSnapshot(q, (snapshot) => {
    container.innerHTML = ""; // reset
    if (snapshot.empty) {
      container.innerHTML = `<p style="color:var(--muted)">Aucune réalisation pour le moment.</p>`;
      return;
    }

    snapshot.forEach(doc => {
      const data = doc.data();
      container.innerHTML += `
        <div class="card">
          <h3>${data.title}</h3>
          <p><strong>Pitch :</strong> ${data.pitch}</p>
          <p><strong>Synopsis :</strong> ${data.synopsis}</p>
          <p><strong>Avec :</strong> ${data.with}</p>
          ${data.url ? `<p><a href="${data.url}" target="_blank">Lien externe</a></p>` : ''}
        </div>
      `;
    });
  }, (error) => {
    container.innerHTML = `<p style="color:red">Impossible de charger les réalisations pour le moment.</p>`;
    console.error("Erreur Firestore :", error);
  });
  