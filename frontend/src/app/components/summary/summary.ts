import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from '../../services/chart';
import { SourceReference } from '../source-reference/source-reference';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend, ChartConfiguration } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend);

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, SourceReference],
  templateUrl: './summary.html',
  styleUrl: './summary.css',
})
export class Summary implements OnInit {
  @ViewChild('investmentChart', { static: false }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  chart: ChartJS | null = null;
  loading = true;
  error = '';

  constructor(private chartService: Chart) {}

  ngOnInit() {
    this.loadChartData();
  }

  loadChartData() {
    this.loading = true;
    this.chartService.getInvestmentData().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.createChart(response.data);
          this.loading = false;
        }
      },
      error: (err) => {
        console.error('Error loading investment data:', err);
        this.error = 'Failed to load chart data. Please try again.';
        this.loading = false;
      }
    });
  }

  createChart(data: any[]) {
    setTimeout(() => {
      if (!this.chartCanvas) return;

      const technologies = [...new Set(data.map(d => d.technology))];
      const years = [...new Set(data.map(d => d.year))];

      const datasets = technologies.map((tech) => {
        const techData = data.find(d => d.technology === tech);
        const color = techData?.color || '#cccccc';

        return {
          label: tech,
          data: years.map(year => {
            const item = data.find(d => d.technology === tech && d.year === year);
            return item ? item.investment_billions : 0;
          }),
          backgroundColor: color,
          borderColor: color,
          borderWidth: 1
        };
      });

      const config: ChartConfiguration<'bar'> = {
        type: 'bar',
        data: {
          labels: years,
          datasets: datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Global Clean Energy Investment by Technology',
              font: { size: 18 }
            },
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const value = context.parsed.y ?? 0;
                  return `${context.dataset.label}: $${value}B`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Investment (Billions USD)'
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
