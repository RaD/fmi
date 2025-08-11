import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder, FormControl, FormGroup, ReactiveFormsModule,
  Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { StorageService } from './service';
import { Recipe } from './interface';

@Component({
  selector: 'app-yaml-console',
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './template.html',
  styleUrl: './styles.less'
})
export class YamlConsolePage implements OnInit {
  private readonly destroy$ = new Subject<void>();
  private formBuilder = inject(FormBuilder);
  protected form: FormGroup;

  protected recipes: Recipe[] = [];
  protected original: Recipe;
  protected selected: Recipe;

  protected labelTitle: string = 'Действия';
  protected labelConsole: string = 'Консоль';
  protected labelFieldTitle: string = 'Название действия';
  protected labelFieldTitlePlaceholder: string = 'Блинчики';

  constructor(private service: StorageService) {
    this.original = this.selected = this.createNew();
    this.form = this.formBuilder.group({
      pk: [this.selected?.pk, Validators.required],
      title: [this.selected?.title, Validators.required],
      content: [this.selected?.content, Validators.required],
    });
  }

  ngOnInit(): void {
    this.initializeConsole();

    // Отлов изменений формы с задержкой в 1 секунду
    this.form.valueChanges
      .pipe(
        debounceTime(1000), // Задержка в 1 секунду
        distinctUntilChanged(), // Отправка только уникальных значений
        takeUntil(this.destroy$)
      )
      .subscribe((values) => {
        console.log('Form changes:', values);
        // Обработка изменений формы
        this.onFormChange(values);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeConsole(): void {
    this.recipes = this.service.getAll();
    this.original = this.selected = this.createNew();
    this.form.patchValue(this.selected);
  }

  private onFormChange(values: any): void {
    console.log('onFormChange...', values);
  }

  protected onSubmit(): void {
    // событие отлавливается в главном компоненте приложения
    console.log('onSubmit...');
  }

  public choose(recipe: Recipe): void {
    console.log("Выбран рецепт", recipe);
    this.selected = recipe;
    this.form.patchValue(this.selected);
  }

  createNew(): Recipe {
    const title = `Рецепт ${this.recipes.length + 1}`;
    const recipe: Recipe = this.service.create(title, 'YAML');
    return recipe;
  }

  deleteSelected(): void {
    const confirmed = confirm(`Удалить рецепт "${this.selected.title}"?`);
    if (confirmed) {
      this.service.delete(this.selected.pk);
      this.initializeConsole();
    }
  }

  clearForm(): void {
    if (this.selected) {
      const confirmed = confirm('Изменения могут быть не сохранены. Очистить?');
      if (!confirmed) return;
    }
    this.initializeConsole();
  }

  get isEqual(): boolean {
    return (
      this.original.title === this.selected.title &&
      this.original.content === this.selected.content
    )
  }

  save(): void {
    this.selected = {
      ...this.selected,
      title: this.form.value.title,
      content: this.form.value.content,
    }
    this.service.update(this.selected);

    if (!this.isEqual) {
      alert(`Рецепт "${this.selected.title}" сохранён.`);
    } else {
      alert(`Рецепт "${this.selected.title}" создан.`);
    }
    this.recipes = this.service.getAll();

    this.original = this.selected;
  }

  execute(): void {
      alert(`Выполняем рецепт:\n${this.selected.title}\n\nСодержимое:\n${this.selected.content || '(пусто)'}`);
  }
}
