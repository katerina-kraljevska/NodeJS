import RecipeService from "../services/recipeServices.js";

export default class RecipeController {
  constructor() {
    this.RecipeService = new RecipeService();
  }

  async getAllRecipes(req, res) {
    try {
      const filter = {};
      const recipes = await this.RecipeService.getAll(filter);
      res.send(recipes);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  async getRecipeById(req, res) {
    try {
      const recipe = await this.RecipeService.getById(req.params.id);
      if (!recipe) {
        res.status(404).json({ message: "Recipe doesn't exist" });
      }
      res.send(recipe);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  async createRecipe(req, res) {
    try {
      const {
        title,
        description,
        ingredients,
        instructions,
        cookingTime,
        difficulty,
        isVegetarian,
        category,
      } = req.body;
      const newRecipe = {
        title,
        description,
        ingredients,
        instructions,
        cookingTime,
        difficulty,
        isVegetarian,
        category,
        createdAt: new Date(),
      };
      const id = await this.RecipeService.create(newRecipe);
      res.send({ id, ...newRecipe });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  async updateRecipe(req, res) {
    try {
      const recipeBody = req.body;
      const recipeId = req.params.id;
      const recipe = await this.RecipeService.update(recipeId, recipeBody);
      res.send(recipe);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  async deleteRecipe(req, res) {
    try {
      const recipeId = req.params.id;
      await this.RecipeService.delete(recipeId);
      res.status(200).send({ message: "Recipe deleted" });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  async getRecipesByCategory(req, res) {
    try {
      const category = req.params.category;
      const recipes = await this.RecipeService.getAll({ category });

      if (recipes.length === 0) {
        return res
          .status(404)
          .send({ message: "No recipes found for this category" });
      }

      res.send(recipes);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  async getVegetarianRecipes(req, res) {
    try {
      const vegetarianRecipes = await this.RecipeService.getAll({
        isVegetarian: true,
      });
      res.send(vegetarianRecipes);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async searchRecipes(req, res) {
    try {
      const title = req.query.title;
      if (!title) {
        return res
          .status(400)
          .send({ message: "Title query parameter is required" });
      }

      const recipes = await this.RecipeService.getAll({ title: String(title) });

      if (recipes.length === 0) {
        return res
          .status(404)
          .send({ message: "No recipes found matching your search" });
      }

      res.send(recipes);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
}
