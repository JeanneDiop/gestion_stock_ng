import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerProduit } from './supprimer-produit';

describe('SupprimerProduit', () => {
  let component: SupprimerProduit;
  let fixture: ComponentFixture<SupprimerProduit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupprimerProduit],
    }).compileComponents();

    fixture = TestBed.createComponent(SupprimerProduit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
