import '../App.css';
import React from 'react';
import { getRecipeFromMistral } from './ai';
import ReactMarkdown from 'react-markdown';
import loadGif from '../assets/loadingSVG.svg';
import { useRef } from 'react';


export default function Form() {
    const [ingredients, setIngredients] = React.useState([]);
    const [recipeShown, setRecipeShown] = React.useState(false);
    const [recipeMarkdown, setRecipeMarkdown] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const outputRef = useRef(null);


    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")?.trim();

        if (!newIngredient) return;

        setIngredients(prev => {
            if (prev.includes(newIngredient)) return prev;
            return [...prev, newIngredient];
        });
    }

    async function toggleRecipeShown() {
        if (recipeShown) {
            setRecipeShown(false);
            return;
        }

        setLoading(true);
        setRecipeShown(true); 
        setTimeout(() => {
            outputRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100); 
        try {
            const recipe = await getRecipeFromMistral(ingredients);
            setRecipeMarkdown(recipe || "Sorry, no recipe was generated.");
        } catch {
            setRecipeMarkdown("Sorry, something went wrong while generating the recipe.");
        } finally {
            setLoading(false);
        }
    }


    const ingredientsListItems = ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ));

    return (
        <main className='bg-beige py-14'>
            <div className="flex items-center justify-center bg-off-white">
                <form action={addIngredient} className="w-full sm:max-w-xl lg:max-w-5xl p-6 bg-off-white">
                    <label htmlFor="ingredient" className="block text-lg mb-2">Add Ingredients:</label>

                    <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                        <input
                            type="text"
                            id="ingredient"
                            name="ingredient"
                            placeholder="e.g. butter"
                            className="flex-grow p-2 border rounded"
                        />
                        <button
                            type="submit"
                            className="bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-800"
                        >
                            + Add ingredient
                        </button>
                    </div>
                </form>
            </div>


            <section className="w-full sm:max-w-xl lg:max-w-5xl mx-auto bg-off-white mt-8 p-6 rounded">
                <div className="space-y-24">
                    <div>
                        <h2 className="text-center text-2xl mb-4">Ingredients List</h2>
                        <ul className="list-disc text-left text-xl text-gray-700">
                            {ingredientsListItems}
                        </ul>
                    </div>

                    {ingredients.length < 4 && (
                        <div className="text-center text-gray-500 text-lg">
                            Please add at least 4 ingredients to get a recipe suggestion.
                        </div>
                    )}

                    {ingredients.length >= 4 && (
                        <div className="get-recipe-container py-8 px-6 bg-gray-100 rounded-xl">
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold">Ready for a recipe?</h3>
                                <p className="text-sm text-gray-600">
                                    Generate a recipe from your list of ingredients.
                                </p>
                            </div>

                            {!recipeShown && (
                                <button
                                    onClick={toggleRecipeShown}
                                    className="mt-4 bg-red-400 hover:bg-rose-900 rounded-md text-white px-4 py-2 text-sm"
                                >
                                    Get a recipe
                                </button>
                            )}
                        </div>
                    )}

                </div>
            </section>

            {recipeShown && (
                <section className="output w-full sm:max-w-xl lg:max-w-5xl mx-auto bg-fuchsia-50 mt-8 p-6 rounded-xl">
                    <h2 className="text-2xl font-bold mb-4 text-center">Magic Chef Recommends:</h2>

                    {loading ? (
                        <div className="flex justify-center items-center">
                            <img
                                src={loadGif}
                                alt="Loading..."
                                className="w-12 h-12"
                            />
                        </div>
                    ) : (
                        <article className="suggested-recipe-container text-gray-600 prose prose-sm sm:prose-base max-w-none break-words whitespace-pre-wrap overflow-hidden">
                            <ReactMarkdown>{recipeMarkdown}</ReactMarkdown>
                        </article>
                    )}
                </section>
            )}

        </main>
    );
}
