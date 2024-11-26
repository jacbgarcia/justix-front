import React, { useState, useEffect } from 'react';

const CarouselCustom = ({ name, carouselItems, isActive }) => {
    const [itemsPerRow, setItemsPerRow] = useState(4);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const mobileCheck = width < 992 || 
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            setIsMobile(mobileCheck);

            if (mobileCheck) {
                setItemsPerRow(2);
            } else if (width < 768) {
                setItemsPerRow(2);
            } else if (width < 992) {
                setItemsPerRow(3);
            } else {
                setItemsPerRow(4);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const createCarouselSlides = (items, itemsPerSlide) => {
        const slides = [];
        for (let i = 0; i < items.length; i += itemsPerSlide) {
            slides.push(items.slice(i, i + itemsPerSlide));
        }
        return slides;
    };

    const slides = createCarouselSlides(carouselItems, itemsPerRow);
    const carouselId = `carousel-${name.toLowerCase().replace(/\s/g, '-')}`;

    return (
        <div 
            style={{
                padding: isMobile ? '0 15px' : '0',
                height: isMobile ? '350px':'500px'
            }}
        >
            <div 
                className="container my-5"
                style={{ 
                    maxHeight: isMobile ? '60vh' : '80%', 
                    margin: '0 auto',
                    padding: isMobile ? '0' : undefined
                }}
            >
                <h2 
                    className="mb-4 text-center" 
                    style={{
                        fontSize: isMobile ? '1.2rem' : '1.5rem',
                        marginBottom: isMobile ? '0.5rem' : '1.5rem'
                    }}
                >
                    {name}
                </h2>
                <div className="position-relative">
                    <div 
                        id={carouselId} 
                        className="carousel slide" 
                        data-bs-ride="carousel"
                        style={{ display: isActive ? 'block' : 'none' }}
                    >
                        <div className="carousel-inner">
                            {slides.map((slide, index) => (
                                <div 
                                    key={index} 
                                    className={`carousel-item ${index === 0 ? 'active' : ''}`}
                                >
                                    <div 
                                        className="row g-4" 
                                        style={{ 
                                            margin: isMobile ? '0 -7.5px' : '0 -15px' 
                                        }}
                                    >
                                        {slide.map((item, idx) => (
                                            <div 
                                                key={idx} 
                                                className={`col-${12/itemsPerRow}`}
                                                style={{
                                                    padding: isMobile ? '0 7.5px' : '0 15px',
                                                    marginBottom: isMobile ? '10px' : '0'
                                                }}
                                            >
                                                <div 
                                                    className="card h-100 shadow-sm"
                                                    style={{
                                                        marginBottom: isMobile ? '10px' : '0',
                                                        height: isMobile ? 'auto' : '100%'
                                                    }}
                                                >
                                                    {item.image ? (
                                                        <img 
                                                            src={item.image} 
                                                            className="card-img-top"
                                                            alt={item.title}
                                                            style={{
                                                                height: isMobile ? '120px' : '200px',
                                                                objectFit: 'cover'
                                                            }}
                                                        />
                                                    ) : (
                                                        <div 
                                                            className="bg-secondary"
                                                            style={{
                                                                height: isMobile ? '120px' : '200px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center'
                                                            }}
                                                        >
                                                            <span 
                                                                className="text-white"
                                                                style={{
                                                                    fontSize: isMobile ? '0.7rem' : '1rem'
                                                                }}
                                                            >
                                                                Sem imagem
                                                            </span>
                                                        </div>
                                                    )}
                                                    <div 
                                                        className="card-body d-flex flex-column"
                                                        style={{
                                                            padding: isMobile ? '8px' : '16px',
                                                            height: isMobile ? 'auto' : undefined
                                                        }}
                                                    >
                                                        <h5 
                                                            className="card-title"
                                                            style={{
                                                                fontSize: isMobile ? '0.8rem' : '1rem',
                                                                marginBottom: isMobile ? '0.3rem' : '1rem'
                                                            }}
                                                        >
                                                            {item.title}
                                                        </h5>
                                                        <p 
                                                            className="card-text"
                                                            style={{
                                                                fontSize: isMobile ? '0.7rem' : '1rem',
                                                                marginBottom: isMobile ? '0.3rem' : '1rem'
                                                            }}
                                                        >
                                                            {item.subtitle}
                                                        </p>
                                                        <div className="mt-auto">
                                                            {item.link && (
                                                                <a 
                                                                    href={item.link} 
                                                                    className="btn btn-primary"
                                                                    style={{
                                                                        fontSize: isMobile ? '0.7rem' : '1rem',
                                                                        padding: isMobile ? '4px 8px' : '8px 16px'
                                                                    }}
                                                                >
                                                                    Ver Mais
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {slides.length > 1 && (
                            <>
                                <button
                                    className="carousel-control-prev"
                                    type="button"
                                    data-bs-target={`#${carouselId}`}
                                    data-bs-slide="prev"
                                    style={{
                                        position: 'absolute',
                                        left: isMobile ? '0' : '-45px',
                                        width: isMobile ? '30px' : '40px',
                                        height: isMobile ? '30px' : '40px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        borderRadius: '50%',
                                        border: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <span 
                                        className="carousel-control-prev-icon" 
                                        aria-hidden="true"
                                        style={{
                                            width: isMobile ? '15px' : '20px',
                                            height: isMobile ? '15px' : '20px'
                                        }}
                                    ></span>
                                    <span className="visually-hidden">Anterior</span>
                                </button>
                                <button
                                    className="carousel-control-next"
                                    type="button"
                                    data-bs-target={`#${carouselId}`}
                                    data-bs-slide="next"
                                    style={{
                                        position: 'absolute',
                                        right: isMobile ? '0' : '-45px',
                                        width: isMobile ? '30px' : '40px',
                                        height: isMobile ? '30px' : '40px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        borderRadius: '50%',
                                        border: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <span 
                                        className="carousel-control-next-icon" 
                                        aria-hidden="true"
                                        style={{
                                            width: isMobile ? '15px' : '20px',
                                            height: isMobile ? '15px' : '20px'
                                        }}
                                    ></span>
                                    <span className="visually-hidden">Próximo</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarouselCustom;