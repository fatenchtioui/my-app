import React from 'react';

function App() {
  // État pour stocker la question et la réponse
  const [question, setQuestion] = React.useState('');
  const [response, setResponse] = React.useState('');

  // Fonction pour gérer l'envoi du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    try {
      const res = await fetch('http://localhost:8000/ask/', {
        method: 'POST', // Assurez-vous que c'est bien POST
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }), // Convertir la question en JSON
      });

      // Vérifier si la réponse est correcte
      if (!res.ok) {
        throw new Error('Erreur lors de la requête');
      }

      const data = await res.json(); // Convertir la réponse en JSON
      setResponse(data.response); // Mettre à jour l'état avec la réponse
    } catch (error) {
      console.error('Erreur:', error); // Afficher l'erreur dans la console
      setResponse('Une erreur est survenue.'); // Mettre à jour l'état avec un message d'erreur
    }
  };

  return (
    <div>
      <h1>Posez votre question</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)} // Mettre à jour l'état de la question
          placeholder="Votre question"
        />
        <button type="submit">Envoyer</button>
      </form>
      {response && <p>Réponse : {response}</p>} {/* Afficher la réponse si elle existe */}
    </div>
  );
}

export default App; // Exporter le composant App
