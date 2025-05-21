"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './signin.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données du formulaire:", formData); // Juste pour le débogage
    
    // Stockage simple dans localStorage (optionnel)
    localStorage.setItem('user', JSON.stringify({
      email: formData.email,
      role: 'USER' // Rôle par défaut
    }));
    
    // Redirection vers la page produits
    router.push('/products');
  };

  return (
    <div className={styles.backgroundContainer}>
      <Image
        src="/images/imageauth.jpg"
        alt="Background"
        fill
        priority
        quality={100} 
        className={styles.backgroundImage}
        style={{
          objectFit: 'cover',
          opacity: 0.5
        }}
      />
      
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <h1 className={styles.loginTitle}>Login</h1>
          
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.inputLabel} style={{color:'#4f46e5'}}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={styles.inputField}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.inputLabel} style={{color:'#4f46e5'}}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={styles.inputField}
                required
              />
            </div>

            <button type="submit" className={styles.loginButton}>
              Login
            </button>
          </form>

          <div className={styles.forgotPassword} style={{color:'#4f46e5'}}>
            <button 
              onClick={() => router.push('/SignupRegister/forgotpassword')}
              className={styles.forgotPasswordLink}
              style={{color:'#4f46e5'}}
            >
              Forgot Password?
            </button>
          </div>

          <div className={styles.registerPrompt}>
            Don't have an account?{' '}
            <button 
              onClick={() => router.push('/SignupRegister/register')}
              className={styles.registerLink}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}