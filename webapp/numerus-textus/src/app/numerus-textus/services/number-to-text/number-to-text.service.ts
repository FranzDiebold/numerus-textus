import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { NumberToTextResponse } from './number-to-text-response.model';

@Injectable()
export class NumberToTextService {
  private API_PATH = environment.apiEndpoint;

  constructor(private httpClient: HttpClient) { }

  loadPossibleWordsForNumber(number: string, locale: string): Observable<NumberToTextResponse> {
    return this.httpClient
      .get<NumberToTextResponse>(`${this.API_PATH}/${locale}/${number}/`);
  }
}
