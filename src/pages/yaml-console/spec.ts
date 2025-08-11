import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YamlConsoleComponent } from './component';

describe('YamlConsoleComponent', () => {
  let component: YamlConsoleComponent;
  let fixture: ComponentFixture<YamlConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YamlConsoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YamlConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
