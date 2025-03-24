import { Router } from "express";
import RecipeController from "../controller/recipeController.js";

const router = Router();
const recipeController = new RecipeController();

router.get("/recipes", (req, res) => recipeController.getAllRecipes(req, res));

router.post("/recipes", (req, res) => recipeController.createRecipe(req, res));
router.patch("/recipes/:id", (req, res) =>
  recipeController.updateRecipe(req, res)
);
router.delete("/recipes/:id", (req, res) =>
  recipeController.deleteRecipe(req, res)
);

router.get("/recipes/category/:category", (req, res) =>
  recipeController.getRecipesByCategory(req, res)
);

router.get("/recipes/vegetarian", (req, res) =>
  recipeController.getVegetarianRecipes(req, res)
);

router.get("/recipes/search", (req, res) =>
  recipeController.searchRecipes(req, res)
);

router.get("/recipes/:id", (req, res) =>
  recipeController.getRecipeById(req, res)
);
export default router;
