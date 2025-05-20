"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Make sure this import is at the top
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {

      console.log(formData); // Ajoute ça avant le fetch pour vérifier

      const response = await fetch('http://localhost:8081/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
         credentials: 'include',
         mode: 'cors' 
      });
      console.log("Réponse brute:", response);
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      const data = await response.json();
      console.log('Login successful', data);
  
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
  
      // Redirige selon le rôle
      if (data.user.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/products');
      }
  
    } catch (error) {
      console.error('Login error:', error.message);
      alert("Erreur d'identification");
    }
  };
  
  

  return (
    <div className={styles.backgroundContainer}>
      {/* Background Image - Fixed usage */}
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
              <label htmlFor="email" className={styles.inputLabel}
               style={{color:'#4f46e5'}}
              >Email</label>
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
              <label htmlFor="password" className={styles.inputLabel}
               style={{color:'#4f46e5'}}
              >Password</label>
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

          <div className={styles.forgotPassword}
           style={{color:'#4f46e5'}}
          >
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