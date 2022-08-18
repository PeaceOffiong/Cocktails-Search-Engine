import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("a")
  const [cocktails, setCocktails] = useState([])

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url} ${searchTerm}`);
      const data = await response.json();
      const { drinks } = data; 
      if (drinks) {
        const newItems = drinks
        setLoading(false);
        const newCocktails = drinks.map((drink) => {
          const {
            idDrink,
            strDrink,
            strDrinkThumb,
            strAlcoholic,
            strGlass,
          } = drink;
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          }
        })
        setCocktails(newCocktails)
      } else {
        setCocktails([])
        setLoading(false);
      }
        setLoading(false);
    } catch (error) {
      
    }
  }

  useEffect(() => {
    fetchData();
  }, [searchTerm])
  return <AppContext.Provider value={{
    loading,
    searchTerm,
    cocktails,
    setSearchTerm,
  }}>
    {children}
  </AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
