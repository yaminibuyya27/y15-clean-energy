import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  username = '';
  password = '';
  confirmPassword = '';
  error = '';
  loading = false;

  constructor(private authService: Auth, private router: Router) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit() {
    this.error = '';

    if (!this.username || !this.password || !this.confirmPassword) {
      this.error = 'Please fill in all fields';
      return;
    }

    if (this.username.length < 3 || this.username.length > 50) {
      this.error = 'Username must be between 3 and 50 characters';
      return;
    }

    if (this.password.length < 4) {
      this.error = 'Password must be at least 4 characters long';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    this.loading = true;

    this.authService.signup(this.username, this.password).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          alert('Account created successfully! Please login.');
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Signup failed. Please try again.';
        console.error('Signup error:', err);
      }
    });
  }
}
