import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';
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

  // Cache storage
  private investmentCache$: Observable<{ success: boolean; data: InvestmentData[] }> | null = null;
  private regionalCache$: Observable<{ success: boolean; data: RegionalData[] }> | null = null;

  // Cache timestamp to track when data was fetched
  private investmentCacheTime: number = 0;
  private regionalCacheTime: number = 0;

  // Cache duration in milliseconds (5 minutes)
  private cacheDuration = 5 * 60 * 1000;

  constructor(private http: HttpClient) {}

  getInvestmentData(): Observable<{ success: boolean; data: InvestmentData[] }> {
    const now = Date.now();

    // Check if cache exists and is still valid
    if (this.investmentCache$ && (now - this.investmentCacheTime) < this.cacheDuration) {
      return this.investmentCache$;
    }

    // Make new API call and cache the result
    this.investmentCacheTime = now;
    this.investmentCache$ = this.http.get<{ success: boolean; data: InvestmentData[] }>(
      `${this.apiUrl}/investments`
    ).pipe(
      shareReplay(1) // Share the result with multiple subscribers
    );

    return this.investmentCache$;
  }

  getRegionalData(): Observable<{ success: boolean; data: RegionalData[] }> {
    const now = Date.now();

    // Check if cache exists and is still valid
    if (this.regionalCache$ && (now - this.regionalCacheTime) < this.cacheDuration) {
      return this.regionalCache$;
    }

    // Make new API call and cache the result
    this.regionalCacheTime = now;
    this.regionalCache$ = this.http.get<{ success: boolean; data: RegionalData[] }>(
      `${this.apiUrl}/regional`
    ).pipe(
      shareReplay(1) // Share the result with multiple subscribers
    );

    return this.regionalCache$;
  }
}
