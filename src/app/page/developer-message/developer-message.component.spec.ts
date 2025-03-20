import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperMessageComponent } from './developer-message.component';

describe('DeveloperMessageComponent', () => {
  let component: DeveloperMessageComponent;
  let fixture: ComponentFixture<DeveloperMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeveloperMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeveloperMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
