import Category from '../models/Category'

export const createCategory = async (req,res) => {
  try {
    const { name } = req.body
    const newCategoryInstance = new Category({ name })
    const newCategory = await newCategoryInstance.save()
    const category = newCategory.toJSON()
    return res.status(201).json({
      success: true,
      content: category,
      message: 'Categoría creada exitosamente'
    }) 
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      content: error.toString(),
      message: 'Error interno del servidor al crear categoría'
    })
  }
}

export const getCategories = async (req,res) => {
  try {
    const categories = await Category.find({})
    const allCategories = categories.map(category => category.toJSON())
    return res.status(200).json({
      success: true,
      content: allCategories,
      message: 'Categorías obtenidas exitosamente'
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      content: error.toString(),
      message: 'Error interno al obtener categorías'
    })
  }
}

export const getCategoryById = async (req,res) => {
  try {
    const { categoryId } = req.params
    const categoryObject = await Category.findById(categoryId)
    /* Checking that the category exists */
    if(!categoryObject){
      const error = new Error('Category not found')
      console.log(error)
      return res.status(404).json({
        success: false,
        content: error.toString(),
        message: 'Categoría no encontrada'
      })
    }
    /* returning the category */
    const category = categoryObject.toJSON()
    return res.status(200).json({
      success: true,
      content: category,
      message: "Categoría obtenida correctamente"
    })
  } catch (error) {
    console.log(error)
    if(error.path === '_id'){
      return res.status(400).json({
        success: false,
        content: error.toString(),
        message: 'Id inválido'
      })
    }
    return res.status(500).json({
      success: false,
      content: error.toString(),
      message: 'Error interno al obtener categoría'
    })
  }
}

export const updateCategoryById = async (req,res) => {
  try {
    /* Getting the id and the category data */
    const { name } = req.body
    const { categoryId } = req.params
    /* Validating the category exists */
    const oldCategory = await Category.findById(categoryId)
    if(!oldCategory){
      const error = new Error('Category not found')
      console.log(error)
      return res.status(404).json({
        success: false,
        content: error.toString(),
        message: 'Categoría no encontrada'
      })
    }
    /* Updating the category */
    oldCategory.name = name
    const categoryObject = await oldCategory.save()
    const categoryToServe = categoryObject.toJSON()
    /* Returning the updated category */
    return res.status(200).json({
      success: true,
      content: categoryToServe,
      message: 'Categoría actualizada correctamente'
    })
  } catch (error) {
    console.log(error)
    if(error.path === '_id'){
      return res.status(400).json({
        success: false,
        content: error.toString(),
        message: 'Id inválido'
      })
    }
    return res.status(500).json({
      success: false,
      content: error.toString(),
      message: 'Error interno al actualizar categoría'
    })
  }
}

export const deleteCategoryById = async (req,res) => {
  try {
    const { categoryId } = req.params
    const categoryObject = await Category.findById(categoryId)
    /* Checking that the category exists */
    if(!categoryObject){
      const error = new Error('Category not found')
      console.log(error)
      return res.status(404).json({
        success: false,
        content: error.toString(),
        message: 'Categoría no encontrada'
      })
    }
    /* Deleting the category and return the deleting category */
    await Category.findByIdAndDelete(categoryId)
    return res.status(200).json({
      success: true,
      content: null,
      message: 'Categoría elminada correctamente'
    })
  } catch (error) {
    console.log(error)
    if(error.path === '_id'){
      return res.status(400).json({
        success: false,
        content: error.toString(),
        message: 'Id inválido'
      })
    }
    return res.status(500).json({
      success: false,
      content: error.toString(),
      message: 'Error interno al eliminar categoría'
    })
  }
}