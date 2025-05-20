"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './forgotpassword.module.css';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic here
    alert(`Password reset link sent to ${email}`);
    router.push('/login');
  };

  return (
    <div className={styles.backgroundContainer}>
      {/* Background Image - Fixed usage */}
      <Image
        src="/images/imageauth.jpg" // Removed /public prefix
        alt="Background"
        fill
        priority
        quality={80}
        className={styles.backgroundImage}
      />
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h1 className={styles.loginTitle}>Forgot Password</h1>
        <p className={styles.subtitle}>Enter your email to receive a reset link</p>
        
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.inputLabel}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.inputField}
              placeholder="your@email.com"
              required
            />
          </div>

          <button type="submit" className={styles.loginButton}>
            Send Reset Link
          </button>
        </form>

        <div className={styles.registerPrompt}>
          Remember your password?{' '}
          <button 
            onClick={() => router.push('/SignupRegister/signup')}
            className={styles.registerLink}
          >
            Login
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}