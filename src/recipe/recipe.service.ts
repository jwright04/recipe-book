import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe } from './interfaces/recipe.interface';
import { CreateRecipeDTO } from './dto/create-recipe.dto';
import { GetRecipesFilterDTO } from './dto/get-recipes-filter-d-t.o';

@Injectable()
export class RecipeService {

  constructor(@InjectModel('Recipe') private readonly recipeModel: Model<Recipe>) {}

  async addRecipe(createRecipeDTO: CreateRecipeDTO): Promise<Recipe> {
    const newRecipe = await this.recipeModel(createRecipeDTO);
    return newRecipe.save();
  }

  async getAllRecipes(): Promise<Recipe[]> {
    const recipes = await this.recipeModel.find().exec();
    return recipes;
  }

  async getRecipe(recipeID): Promise<Recipe> {
    const recipe = await this.recipeModel.findById(recipeID).exec();
    return recipe;
  }

  async updateRecipe(recipeID, createRecipeDTO: CreateRecipeDTO): Promise<Recipe> {
    const updateRecipe = await this.recipeModel.findByIdAndUpdate(recipeID, createRecipeDTO, {new: true});
    return updateRecipe;
  }

  async deleteRecipe(recipeID): Promise<any> {
    const deleteRecipe = await this.recipeModel.findByIdAndRemove(recipeID);
    return deleteRecipe;
  }

  async getFilteredRecipes(filterDTO: GetRecipesFilterDTO): Promise<Recipe[]>{
    const { category, search } = filterDTO;
    let recipes = await this.getAllRecipes();

    if(search) {
      recipes = recipes.filter((recipe) => {
        return recipe.title.includes(search) || recipe.description.includes(search) || recipe.instructions.includes(search);
      });
    }

    if(category) {
      recipes = recipes.filter((recipe) => {
        return recipe.category === category;
      });
    }

    return recipes;
  }
}
