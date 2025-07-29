import '../App.css';
import React from 'react';

export default function Form() {

    const [ingredients, setIngredients] = React.useState([]);

    const ingredientsListItems = ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))




    function handleSubmit(event) {
        event.preventDefault();
        const ingredient = event.target.ingredient.value;
        if (ingredient) {
            const formData = new FormData(event.target);
            const newIngredient = formData.get('ingredient');
            setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
            event.target.ingredient.value = '';
        }
    }


    return (
        <>
            <main className='bg-beige py-14'>
                <div className="flex items-center justify-center bg-off-white">
                    <form onSubmit={handleSubmit} className="w-full sm:max-w-xl lg:max-w-5xl p-6 bg-off-white">
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
                <div className="w-full sm:max-w-xl lg:max-w-5xl mx-auto bg-off-white mt-8 p-6 rounded">
                    <h2 className="text-center text-2xl mb-4">Ingredients List</h2>
                    <ul className="list-decimal list-inside text-left text-xl">
                        {ingredientsListItems}
                    </ul>
                </div>



            </main>
        </>

    );


}