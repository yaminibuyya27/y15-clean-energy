import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../config/api.config';

interface InvestmentData {
  year: number;
  technology: string;
  investment_billions: number;
}

interface RegionalData {
  region: string;
  year: number;
  capacity_mw: number;
}

@Injectable({
  providedIn: 'root',
})
export class Chart {
  private apiUrl = `${API_URL}/api/charts`;

  constructor(private http: HttpClient) {}

  getInvestmentData(): Observable<{ success: boolean; data: InvestmentData[] }> {
    return this.http.get<{ success: boolean; data: InvestmentData[] }>(
      `${this.apiUrl}/investments`
    );
  }

  getRegionalData(): Observable<{ success: boolean; data: RegionalData[] }> {
    return this.http.get<{ success: boolean; data: RegionalData[] }>(
      `${this.apiUrl}/regional`
    );
  }
}
