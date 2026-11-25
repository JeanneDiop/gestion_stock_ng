import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsProduit } from './details-produit';

describe('DetailsProduit', () => {
  let component: DetailsProduit;
  let fixture: ComponentFixture<DetailsProduit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsProduit],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsProduit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
