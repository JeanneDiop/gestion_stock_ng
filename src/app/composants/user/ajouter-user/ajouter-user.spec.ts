import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterUser } from './ajouter-user';

describe('AjouterUser', () => {
  let component: AjouterUser;
  let fixture: ComponentFixture<AjouterUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterUser],
    }).compileComponents();

    fixture = TestBed.createComponent(AjouterUser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});