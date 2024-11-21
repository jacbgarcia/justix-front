import React, { useEffect, useState } from 'react';
import { Scale, Star, Gavel, BookOpen, FileText, Award, Users } from 'lucide-react';
import '../Home/Banner.css';

const DynamicBannerUser = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    setIsVisible(true);
    
    const storedUser = JSON.parse(localStorage.getItem('usuarios'));
    if (storedUser && storedUser.nome) {
      const firstNameOnly = storedUser.nome.split(' ')[0];
      setFirstName(firstNameOnly);
    }
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    { text: "Avalie", icon: Star, delay: 0 },
    { text: "Contribua", icon: FileText, delay: 0.2 },
    { text: "Ganhe Benefícios", icon: Award, delay: 0.4 }
  ];

  return (
    <div className="banner">
      <div className="banner-gradient" />

      <div className="banner-background-icons">
        {[Scale, Gavel, BookOpen, Users].map((Icon, index) => (
          <Icon
            key={index}
            className="background-icon"
            style={{
              top: `${15 + (index * 20)}%`,
              left: `${10 + (index * 25)}%`,
              animationDelay: `${index * 1.5}s`,
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) rotate(${index * 45}deg)`
            }}
          />
        ))}

        {[...Array(8)].map((_, i) => (
          <Star
            key={i}
            className="twinkle-star"
            style={{
              top: `${Math.random() * 80}%`,
              left: `${Math.random() * 80}%`,
              animationDelay: `${i * 0.7}s`,
              transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
            }}
          />
        ))}
      </div>

      <div 
        className="banner-content"
        style={{
          transform: `translate(${mousePosition.x * -0.2}px, ${mousePosition.y * -0.2}px)`
        }}
      >
        <h1 className={`banner-title ${isVisible ? 'visible' : ''}`}>
          Bem vindo ao Justix, {firstName}!
        </h1>
        
        <div className={`banner-subtitle ${isVisible ? 'visible' : ''}`}>
          <p>
            Aqui você não apenas compartilha sua opinião sobre ações jurídicas, você também é recompensado por isso!
            Avalie, contribua com suas análises e adquira benefícios ao alcançar metas de avaliações.
          </p>
        </div>

        <div className="banner-features">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${800 + feature.delay * 1000}ms` }}
            >
              <feature.icon className="feature-icon" style={{ animationDelay: `${feature.delay}s` }} />
              <span>{feature.text}</span>
            </div>
          ))}
        </div>

        <div className="animated-bars">
          <div className="bar">
            <div className="bar-inner animate-slide-right" />
          </div>
          <div className="bar">
            <div className="bar-inner animate-slide-left" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicBannerUser;