import Recipe from "../schemas/recipe.js";

export default class RecipeService {
  async getAll(filter = {}) {
    return await Recipe.find(filter);
  }
  async getById(id) {
    const recipe = Recipe.findById(id);
    return recipe;
  }
  async create(body) {
    return await Recipe.create(body);
  }
  async update(id, body) {
    let recipe = await Recipe.findById(id);
    const updateData = { ...recipe, ...body };
    recipe.set(updateData);
    await recipe.save();
    return recipe;
  }
  async delete(id) {
    return Recipe.findByIdAndDelete(id);
  }
}
