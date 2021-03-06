import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaypalMobilePage } from './paypal-mobile.page';

describe('PaypalMobilePage', () => {
  let component: PaypalMobilePage;
  let fixture: ComponentFixture<PaypalMobilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaypalMobilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaypalMobilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
