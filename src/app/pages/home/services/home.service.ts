import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectOption } from 'src/app/shared/models/form.model';

@Injectable()
export class HomeService {
  constructor(private http: HttpClient) { }

  public getOptions(): Observable<SelectOption[]> {
    const optionsUrl: string = 'assets/data/home-options.json';
    return this.http.get<SelectOption[]>(optionsUrl);
  }
}
