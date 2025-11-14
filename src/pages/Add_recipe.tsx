import React, { useState } from 'react'
import { auth, firestore } from '../lib/firebase/firebase'
import { addDoc, collection } from 'firebase/firestore'
import Navbar from '../components/Navbar/Navbar'

interface Recipe {
    title: string
    ingredients: string[]
    instructions: string
    userId: string
}

const AddRecipeForm: React.FC = () => {
    const [title, setTitle] = useState<string>('')
    const [instructions, setInstructions] = useState<string>('')

    const [ingredients, setIngredients] = useState<string[]>([])
    const [currentIngredient, setCurrentIngredient] = useState<string>('')

    const handleAddIngredient = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (currentIngredient.trim()) {
            setIngredients([...ingredients, currentIngredient.trim()])
            setCurrentIngredient('')
        }
    }

    const handleRemoveIngredient = (indexToRemove: number) => {
        setIngredients(
            ingredients.filter((_, index) => index !== indexToRemove)
        )
    }

    const handleRecipeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const userId = auth.currentUser ? auth.currentUser.uid : null

        if (!title || !instructions || ingredients.length === 0 || !userId) {
            alert('Please fill out all fields and add at least one ingredient.')
            return
        }

        const newRecipe: Omit<Recipe, 'id'> = {
            title,
            ingredients,
            instructions,
            userId,
        }

        console.log('Recipe to be saved:', newRecipe)

        try {
            const docRef = await addDoc(
                collection(firestore, 'recipes'),
                newRecipe
            )
            console.log('Recipe saved with ID: ', docRef.id)

            setTitle('')
            setIngredients([])
            setInstructions('')
            alert('Recipe saved successfully!')
        } catch (err) {
            console.error('Error saving recipe: ', err)
            alert('Error saving recipe. Please try again.')
        }
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen min-w-screen bg-secondary flex items-center justify-center">
                <form
                    onSubmit={handleRecipeSubmit}
                    className="w-full max-w-lg mx-auto p-4 bg-accent shadow-md rounded-lg"
                >
                    <h2 className="text-2xl font-bold mb-4">
                        Add a New Recipe
                    </h2>

                    <div className="mb-4">
                        <label
                            htmlFor="title"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Recipe Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 bg-light rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="ingredient"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Ingredient
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                id="ingredient"
                                value={currentIngredient}
                                onChange={(e) =>
                                    setCurrentIngredient(e.target.value)
                                }
                                className=" px-3 py-2 border border-gray-300 rounded-md bg-light shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={handleAddIngredient}
                                className="px-4 py-2 bg-light text-black rounded-md hover:bg-blue-600"
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    {ingredients.length > 0 && (
                        <div className="mb-4 p-3 bg-gray-50 rounded-md">
                            <h3 className="font-medium mb-2">Ingredients:</h3>
                            <ul className="list-disc list-inside space-y-1">
                                {ingredients.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex justify-between items-center"
                                    >
                                        <span>{item}</span>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemoveIngredient(index)
                                            }
                                            className="text-red-500 text-sm font-medium hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="mb-4">
                        <label
                            htmlFor="instructions"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Instructions
                        </label>
                        <textarea
                            id="instructions"
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                            rows={6}
                            className="w-full px-3 py-2 border bg-light border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-green-600 text-white font-bold rounded-md hover:bg-green-700"
                    >
                        Save Recipe
                    </button>
                </form>
            </div>
        </>
    )
}

export default AddRecipeForm
