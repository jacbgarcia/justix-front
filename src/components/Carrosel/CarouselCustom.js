import React, { useState, useEffect } from 'react';

const CarouselCustom = ({ name, carouselItems, isActive }) => {
    const [itemsPerRow, setItemsPerRow] = useState(4);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 576) {
                setItemsPerRow(1);
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
        <div className="container my-5">
            <h2 className="mb-4 text-center">{name}</h2>
            <div className="position-relative">
                <div 
                    id={carouselId} 
                    className="carousel slide" 
                    data-bs-ride="carousel"
                    style={{ display: isActive ? 'block' : 'none' }}
                >
                    <div className="carousel-inner">
                        {slides.map((slide, index) => (
                            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                <div className="row g-4">
                                    {slide.map((item, idx) => (
                                        <div key={idx} className={`col-${12/itemsPerRow}`}>
                                            <div className="card h-100 shadow-sm">
                                                {item.image ? (
                                                    <img 
                                                        src={item.image} 
                                                        className="card-img-top"
                                                        alt={item.title}
                                                        style={{
                                                            height: '200px',
                                                            objectFit: 'cover'
                                                        }}
                                                    />
                                                ) : (
                                                    <div 
                                                        className="bg-secondary"
                                                        style={{
                                                            height: '200px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}
                                                    >
                                                        <span className="text-white">Sem imagem</span>
                                                    </div>
                                                )}
                                                <div className="card-body d-flex flex-column">
                                                    <h5 className="card-title">{item.title}</h5>
                                                    <p className="card-text">{item.subtitle}</p>
                                                    <div className="mt-auto">
                                                        {item.link && (
                                                            <a 
                                                                href={item.link} 
                                                                className="btn btn-primary"
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
                                    left: '-50px',
                                    width: '40px',
                                    height: '40px',
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
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Anterior</span>
                            </button>
                            <button
                                className="carousel-control-next"
                                type="button"
                                data-bs-target={`#${carouselId}`}
                                data-bs-slide="next"
                                style={{
                                    position: 'absolute',
                                    right: '-50px',
                                    width: '40px',
                                    height: '40px',
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
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Próximo</span>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CarouselCustom;