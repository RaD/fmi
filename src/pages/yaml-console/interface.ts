export interface RecipeT {
  pk: string;
  title: string;
  content: string;
}

export class Recipe implements RecipeT {
  constructor(
    public pk: string,
    public title: string,
    public content: string,
  ) {};

  // статичный метод фабрики для создания объекта из словаря
  static from(payload: Partial<RecipeT>): Recipe {
    return new Recipe(
      payload.pk!,
      payload.title!,
      payload.content!,
    );
  }
}
