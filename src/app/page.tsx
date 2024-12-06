'use client'
import { useState } from "react";
import Image from "next/image";

// Déclare un type pour la recette
type Recipe = {
  name: string;
  ingredients: string;
  instructions: string;
  image: string; // Ajout de l'image pour afficher la recette
};

// Déclare un type pour la structure de l'objet `meal` venant de l'API
type Meal = {
  strMeal: string, 
  strMealThumb: string;
  strInstructions: string;
  [key: string] : string | null;
}

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

  // Formate les ingrédients (avec les quantités) de l'API
  const formatIngredients = (meal: Meal): string => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];  // Quantité correspondante à l'ingrédient

      if (ingredient && measure) {
        ingredients.push(`${measure} ${ingredient}`);
      } else if (ingredient) {
        ingredients.push(ingredient);  // Si la mesure est manquante, on affiche seulement l'ingrédient
      }
    }
    return ingredients.join(", ");
  };

  return (
    <div className="container">
      <h1 className="title">
        Bonjour Mina 👩🏻‍🍳
      </h1>

      <button
        onClick={generateRecipe}
        className="generate-button"
      >
        {loading ? "Chargement..." : "Nouvelle recette 🍴"}
      </button>
      
      {/* Affichage de la recette générée */}
      {recipe && (
        <div className="recipe-container">
          <h2 className="recipe-title">{recipe.name} 🔪</h2>

          <div className="recipe-body">
            <div className="image-container">
              <Image
                src={recipe.image}
                alt={recipe.name}
                width={400}
                height={400}
                className="recipe-image"
              />
            </div>

            <div className="ingredients-container">
              <h2><strong className="ingredients-title">Ingrédients 🌮</strong></h2>
              <ul>
                {recipe.ingredients.split(",").map((ingredient, index) => (
                  <li key={index}>{ingredient.trim()}</li>
                ))}
              </ul>
            </div>
          </div>

          <p><strong className="instructions-title">Instructions ⏲️</strong></p>
          <div className="instructions-container">
            {recipe.instructions}
          </div>
        </div>
      )}
    </div>
  );
}
