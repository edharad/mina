'use client'
import { useState } from "react";

// Déclare un type pour la recette
type Recipe = {
  name: string;
  ingredients: string;
  instructions: string;
  image: string; // Ajout de l'image pour afficher la recette
};

export default function About() {
  const [recipe, setRecipe] = useState<Recipe | null>(null); // État pour stocker la recette
  const [loading, setLoading] = useState(false); // État pour savoir si l'appel est en cours

  // Fonction pour appeler l'API et récupérer une recette aléatoire
  const generateRecipe = async () => {
    setLoading(true); // Démarre le chargement
    try {
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
      const data = await response.json();
      const meal = data.meals[0]; // Récupère la première recette de la réponse

      // Formater la recette
      const recipe: Recipe = {
        name: meal.strMeal,
        ingredients: formatIngredients(meal),
        instructions: meal.strInstructions,
        image: meal.strMealThumb,
      };
      setRecipe(recipe); // Met à jour l'état avec la recette récupérée
    } catch (error) {
      console.error("Erreur lors de l'appel API :", error);
    } finally {
      setLoading(false); // Fin du chargement
    }
  };

  // Formate les ingrédients (la base de l'API est sous forme de strIngredient1, strIngredient2, etc.)
  const formatIngredients = (meal: any): string => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      if (ingredient) {
        ingredients.push(ingredient);
      }
    }
    return ingredients.join(", ");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
        color: "white",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        overflow: "hidden",
        padding: "1rem",
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          fontWeight: "bold",
          color: "#ffdf6c",
          marginBottom: "2rem",
        }}
      >
        Bonjour Mina ✨
      </h1>

      {/* Bouton pour générer une recette */}
      <button
        onClick={generateRecipe}
        style={{
          padding: "1rem 2rem",
          backgroundColor: "#ffdf6c",
          border: "none",
          borderRadius: "5px",
          fontSize: "1.2rem",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "transform 0.2s ease-in-out",
          marginBottom: "2rem", // Espace entre le bouton et la recette
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLButtonElement).style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLButtonElement).style.transform = "scale(1)";
        }}
      >
        {loading ? "Chargement..." : "Générer une recette 🍴"}
      </button>

      {/* Affichage de la recette générée */}
      {recipe && (
        <div
          style={{
            maxHeight: "70vh", // Limite la hauteur de la fenêtre de la recette
            overflowY: "auto", // Permet le défilement si nécessaire
            marginTop: "2rem",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            padding: "2rem",
            borderRadius: "8px",
            color: "#fff",
            width: "100%",
            textAlign: "left",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            marginBottom: "2rem",
            boxSizing: "border-box",
          }}
        >
          <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>{recipe.name}</h2>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
            {/* Liste des ingrédients */}
            <div style={{ width: "48%" }}>
              <p style={{ marginBottom: "1rem" }}>
                <strong>Ingrédients :</strong>
              </p>
              <ul
                style={{
                  marginBottom: "1rem",
                  listStyleType: "disc",
                  paddingLeft: "1.5rem",
                }}
              >
                {recipe.ingredients.split(",").map((ingredient, index) => (
                  <li key={index}>{ingredient.trim()}</li>
                ))}
              </ul>
            </div>

            {/* Image de la recette */}
            <div style={{ width: "48%" }}>
              <img
                src={recipe.image}
                alt={recipe.name}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  marginBottom: "1rem",
                }}
              />
            </div>
          </div>

          {/* Instructions */}
          <p style={{ marginBottom: "1rem" }}>
            <strong>Instructions :</strong>
          </p>
          <div style={{ whiteSpace: "pre-line", lineHeight: "1.6" }}>
            {recipe.instructions}
          </div>
        </div>
      )}
    </div>
  );
}
