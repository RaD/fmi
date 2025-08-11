import { Injectable } from "@angular/core";
import { v4 as uuidv4 } from 'uuid';
import { Recipe } from "./interface";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly STORAGE_KEY = 'yaml-recipes';

  constructor() {
    this.loadFromStorage();
  }

  private generateId(): string {
    return uuidv4();
  }

  private saveToStorage(recipes: Recipe[]): void {
    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(recipes)
    );
  }

  private loadFromStorage(): Recipe[] {
    return JSON.parse(
      localStorage.getItem(this.STORAGE_KEY) || '[]'
    );
  }

  public getAll(): Recipe[] {
    return this.loadFromStorage();
  }

  public getById(pk: string): Recipe | undefined {
    return this.getAll().find(r => r.pk === pk);
  }

  public create(title: string, content: string): Recipe {
    const recipe: Recipe = new Recipe(
      this.generateId(),
      title,
      content
    );
    return recipe;
  }

  public update(recipe: Recipe): boolean {
    const recipes = this.getAll();
    const index = recipes.findIndex(r => r.pk === recipe.pk);
    if (index === -1) {
      recipes.push(recipe);
      this.saveToStorage(recipes);
      return false;
    } else {
      recipes[index] = recipe;
      this.saveToStorage(recipes);
      return true;
    }
  }

  public delete(pk: string): boolean {
    const recipes = this.getAll();
    const newRecipes = recipes.filter(r => r.pk !== pk);
    const wasDeleted = recipes.length > newRecipes.length;
    if (wasDeleted) {
      this.saveToStorage(newRecipes);
    }
    return wasDeleted;
  }
}