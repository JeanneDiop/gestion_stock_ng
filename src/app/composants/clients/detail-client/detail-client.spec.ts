import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { DetailsClientComponent } from './detail-client';
import { ClientService } from '../../../services/client';

describe('DetailsClientComponent', () => {
  let component: DetailsClientComponent;
  let fixture: ComponentFixture<DetailsClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsClientComponent],
      providers: [
        provideRouter([]),
        { provide: ClientService, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsClientComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
