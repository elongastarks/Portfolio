import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
  import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

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

  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      await addDoc(collection(db, "contact_messages"), {
        name,
        email,
        message,
        date: serverTimestamp(),
        view: "unread"
      });

      contactForm.reset();
      alert("Merci ! Votre message a été envoyé avec succès.");

    } catch (err) {
      console.error("Erreur lors de l'envoi :", err);
      alert("Impossible d'envoyer le message pour le moment. Réessayez plus tard.");
    }
  });