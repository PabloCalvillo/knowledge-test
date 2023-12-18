import { Component } from '@angular/core';
import { HomeService } from './services/home.service';
import { SelectOption } from 'src/app/shared/models/form.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public homeOptions$: Observable<SelectOption[]> = this.homeService.getOptions();

  constructor(private homeService: HomeService) {}

}
