import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from '../../services/chart';
import { SourceReference } from '../source-reference/source-reference';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, LineController, PointElement, Title, Tooltip, Legend, ChartConfiguration } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, LineController, PointElement, Title, Tooltip, Legend);

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, SourceReference],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports implements OnInit {
  @ViewChild('regionalChart', { static: false }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  chart: ChartJS | null = null;
  loading = true;
  error = '';

  constructor(private chartService: Chart) {}

  ngOnInit() {
    this.loadChartData();
  }

  loadChartData() {
    this.loading = true;
    this.chartService.getRegionalData().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.createChart(response.data);
          this.loading = false;
        }
      },
      error: (err) => {
        console.error('Error loading regional data:', err);
        this.error = 'Failed to load chart data. Please try again.';
        this.loading = false;
      }
    });
  }

  createChart(data: any[]) {
    setTimeout(() => {
      if (!this.chartCanvas) return;

      const regions = [...new Set(data.map(d => d.region))];
      const years = [...new Set(data.map(d => d.year))];

      const datasets = regions.map((region) => {
        const regionData = data.find(d => d.region === region);
        const color = regionData?.color || '#cccccc';

        return {
          label: region,
          data: years.map(year => {
            const item = data.find(d => d.region === region && d.year === year);
            return item ? item.capacity_mw : 0;
          }),
          borderColor: color,
          backgroundColor: color + '33',
          borderWidth: 2,
          fill: false,
          tension: 0.1
        };
      });

      const config: ChartConfiguration<'line'> = {
        type: 'line',
        data: {
          labels: years,
          datasets: datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            title: {
              display: true,
              text: 'Regional Clean Energy Capacity Growth',
              font: { size: 18 }
            },
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const value = context.parsed.y ?? 0;
                  return `${context.dataset.label}: ${value.toLocaleString()} MW`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Capacity (Megawatts)'
              },
              ticks: {
                callback: function(value) {
                  return value.toLocaleString();
                }
              }
            },
            x: {
              title: {
                display: true,
                text: 'Year'
              }
            }
          }
        }
      };

      this.chart = new ChartJS(this.chartCanvas.nativeElement, config);
    }, 100);
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
