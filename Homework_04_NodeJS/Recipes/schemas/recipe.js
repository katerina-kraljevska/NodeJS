import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const recipeSchema = new Schema({
  title: { type: String, required: true },
  description: {
    type: String,
    minlenght: 20,
    maxlength: 300,
    required: [true, "description is required"],
  },
  ingredients: {
    type: [String],
    type: [String],
    minlenght: 1,
    maxlength: 50,
    required: [true, "ingridients is required"],
  },
  instructions: {
    type: [String],
    minlenght: 1,
    maxlength: 50,
    required: [true, "instruction is required"],
  },
  cookingTime: { type: Number, min: 1, max: 120 }, //vo minuti
  difficulty: { type: String, enum: ["easy", "medium", "hard"] },
  isVegetarian: { type: Boolean, required: true },
  category: { type: String, enum: ["breakfast", "lunch", "dinner", "dessert"] },
});

const Recipe = model("Recipe", recipeSchema, "recipes");

export default Recipe;
