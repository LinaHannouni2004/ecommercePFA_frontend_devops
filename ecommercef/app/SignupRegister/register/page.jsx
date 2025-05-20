"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './register.module.css';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'user'
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleUserTypeChange = (type) => {
    setFormData(prev => ({ ...prev, userType: type }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
  
    if (!formData.userType) {  // Vérification du rôle avant d'envoyer la requête
      setError('Please select an account type');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8081/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.userType.toUpperCase(),  // Assurez-vous d'envoyer la valeur du rôle
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed');
        return;
      }
  
      const data = await response.json();
      console.log('Registration success:', data);
  
      // Après l'inscription, vous pouvez rediriger l'utilisateur en fonction du rôle
      if (formData.userType === 'admin') {
        router.push('/admin');
      } else {
        router.push('/products');
      }
  
    } catch (err) {
      console.error(err);
      setError('Failed to connect to server');
    }
  };
  
  
  

  return (
    <div className={styles.backgroundContainer}>
      <Image
        src="/images/imageauth.jpg"
        alt="Background"
        fill
        priority
        quality={80}
        className={styles.backgroundImage}
      />
      
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <h1 className={styles.loginTitle}
          style={{color:'#4f46e5'}}
          >Register</h1>
          
          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.formGroup} style={{ color: '#FFFFFF' }}>
              <label htmlFor="name" className={styles.inputLabel}
              style={{color:'#4f46e5'}}
              >Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={styles.inputField}
                required
              />
            </div>

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
                minLength={8}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword" className={styles.inputLabel}
              style={{color:'#4f46e5'}}
              >Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={styles.inputField}
                required
                minLength={8}
              />
            </div>
  <div className={styles.formGroup}>
              <label className={styles.inputLabel}
              style={{color:'#4f46e5'}}
              >Account Type</label>
              <div className={styles.fullWidthRadioGroup}>
                <label className={`${styles.fullWidthRadioButton} ${formData.userType === 'customer' ? styles.radioButtonActive : ''}`}>
                  <input
                    type="radio"
                    name="userType"
                    value="user"


                    checked={formData.userType === 'customer'}
                    onChange={() => handleUserTypeChange('customer')}
                    className={styles.roInput}
                  />
                  <span className={styles.radioButtonText}>Customer</span>
                </label>
                <label className={`${styles.fullWidthRadioButton} ${formData.userType === 'admin' ? styles.radioButtonActive : ''}`}>
                  <input
                    type="radio"
                    name="userType"
                    value="admin"
                    checked={formData.userType === 'admin'}
                    onChange={() => handleUserTypeChange('admin')}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioButtonText}>Admin</span>
                </label>
              </div>
            </div>

            <button type="submit" className={styles.loginButton}>
              Register
            </button>
          </form>

          <div className={styles.registerPrompt}
          style={{color:'black'}}
          >
            Already have an account?{' '}
            <button 
              type="button"
              onClick={() => router.push('/SignupRegister/signup')}
              className={styles.registerLink}
              style={{color:'#6366f1'}}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}