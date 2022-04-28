import { createContext, useState, useEffect } from "react"
import IProducts from "@interfaces/IProducts"
import { getCategoriesAndDocuments } from "utils/firebase/firebase.utils"


const CategoriesContext = createContext<IProducts | {categoriesMap:any}>({categoriesMap:{
  id: 0,
  name: "",
  imageUrl: "",
  price: 0,
  quantity: 0,
}});

const CategoriesProvider = ({ children }:{children: JSX.Element}) => {
  const [categoriesMap, setCategoriesMap] = useState({})

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments()
      console.log(categoryMap)
      setCategoriesMap(categoryMap)
    }

    getCategoriesMap()
  }, [])

  const sampleAppContext:any = { categoriesMap }
  return (
    <CategoriesContext.Provider value={sampleAppContext}>{children}</CategoriesContext.Provider>
  )
}

export {
  CategoriesContext,
  CategoriesProvider
}