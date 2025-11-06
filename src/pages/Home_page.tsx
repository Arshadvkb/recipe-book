import { useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { useFirebaseStore, type Recipe } from '../store/UseFirebaseStore';

const HomePage = () => {
  const { recipeList, getData } = useFirebaseStore();

  useEffect(() => {
    console.log('useEffect: Calling getData...'); 
    getData().then(() => {
      console.log('getData Promise resolved in useEffect'); 
    }).catch((err) => {
      console.error('getData rejected:', err); 
    });
  }, []);

  console.log('RENDER LOG:', {
    type: typeof recipeList,
    isArray: Array.isArray(recipeList),
    length: recipeList?.length || 0,
    sample: recipeList?.[0],
  });

  return (
    <div>
      <Navbar />
     <main className="container mx-auto px-4 py-8 bg-secondary min-h-screen min-w-screen">
        {Array.isArray(recipeList) ? (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center pt-4">Recipes</h2>
            {recipeList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipeList.map((recipe: Recipe) => (
                  <div
                    key={recipe.id}
                    className="bg-accent rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {recipe.title || `Recipe ID: ${recipe.id}`}
                      </h3>
                      <div className="prose prose-sm max-w-none mb-4">
                        <p className="text-gray-700 leading-relaxed">{recipe.instructions}</p>
                      </div>
                      <details className="group">
                        <summary className="cursor-pointer font-medium text-gray-800 flex items-center justify-between py-2 hover:text-blue-600 transition-colors">
                          Ingredients ({recipe.ingredients?.length || 0})
                          <span className="transition-transform group-open:rotate-180">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </span>
                        </summary>
                        <ul className="mt-3 ml-4 space-y-1">
                          {recipe.ingredients?.length ? (
                            recipe.ingredients.map((ingredient, idx) => (
                              <li key={idx} className="text-gray-600 list-disc list-inside text-sm">
                                {ingredient}
                              </li>
                            ))
                          ) : (
                            <li className="text-gray-500 text-sm italic">No ingredients</li>
                          )}
                        </ul>
                      </details>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
                  <p className="text-gray-500 italic">No recipes found.</p>
                </div>
              </div>
            )}
          </div>
        ) : recipeList === null ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading recipes...</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-red-500">Unexpected state: {JSON.stringify(recipeList)}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;