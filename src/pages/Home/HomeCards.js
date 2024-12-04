import React, { useState, useEffect } from 'react';
import CarouselCustom from '../../components/Carrosel/CarouselCustom';
import axios from 'axios';
import { Star } from 'lucide-react';

const API_BASE_URL = 'https://justix-back.vercel.app';

function HomeCards() {
    const [tribunais, setTribunais] = useState([]);
    const [foruns, setForuns] = useState([]);
    const [juiz, setJuizes] = useState([]);
    const [mediador, setMediadores] = useState([]);
    const [advocacia, setAdvocacia] = useState([]);
    const [portais, setPortais] = useState([]);

    const sections = [
        { name: 'Destaques em Tribunais', items: tribunais || [] },
        { name: 'Destaques em Fóruns', items: foruns || [] },
        { name: 'Destaques em Audiências', items: juiz || [] },
        { name: 'Destaques em Mediações', items: mediador || [] },
        { name: 'Destaques em Advocacia', items: advocacia || [] },
        { name: 'Destaques em Portais', items: portais || [] }
    ].filter(section => section.items && section.items.length > 0);

    const getImageUrl = (type, imagem) => {
        if (!imagem) return null;
        if (imagem.startsWith('/uploads/')) {
            return `${API_BASE_URL}${imagem}`;
        }
        return `${API_BASE_URL}/uploads/${type}/${imagem}`;
    };

    const fetchDataWithWeightedAverage = async (endpoint, setStateFunc, ratingEndpoint, idField) => {
        try {
            const res = await axios.get(`${API_BASE_URL}/${endpoint}`);
            const entidadesWithRatings = await Promise.all(
                res.data.map(async (entidade) => {
                    try {
                        const ratingRes = await axios.get(`${API_BASE_URL}/${ratingEndpoint}/${entidade[idField]}`);
                        const mediaPonderada = parseFloat(ratingRes.data.media_ponderada) || 0;

                        return {
                            title: (
                                <>
                                    <div>{entidade.nome}</div>
                                    <div>{entidade.profissao}</div>
                                </>
                            ),
                            subtitle: <>Média: {mediaPonderada.toFixed(1)} <Star size={14} color="#4169E1" fill="#4169E1" style={{ verticalAlign: 'middle' }} /></>,
                            image: getImageUrl(endpoint, entidade.imagem),
                            link: `/${endpoint}/${entidade[idField]}/feedback`,
                            id: entidade[idField],
                            media_ponderada: mediaPonderada
                        };
                    } catch (err) {
                        console.error(`Erro ao buscar média ponderada:`, err);
                        return {
                            title: entidade.nome,
                            subtitle: 'Sem avaliações',
                            image: getImageUrl(endpoint, entidade.imagem),
                            link: `/${endpoint}/${entidade[idField]}/feedback`,
                            id: entidade[idField],
                            media_ponderada: 0
                        };
                    }
                })
            );

            const topEntidades = entidadesWithRatings
                .sort((a, b) => b.media_ponderada - a.media_ponderada)
                .slice(0, 8);

            setStateFunc(topEntidades);
        } catch (err) {
            console.error(`Erro ao listar ${endpoint}:`, err);
        }
    };

    useEffect(() => {
        fetchDataWithWeightedAverage('tribunais', setTribunais, 'tribunais_avaliacao', 'id_tribunal');
        fetchDataWithWeightedAverage('foruns', setForuns, 'foruns_avaliacao', 'id_forum');
        fetchDataWithWeightedAverage('juiz', setJuizes, 'juiz_avaliacao', 'id_juiz');
        fetchDataWithWeightedAverage('mediador', setMediadores, 'mediador_avaliacao', 'id_mediador');
        fetchDataWithWeightedAverage('advocacia', setAdvocacia, 'advocacia_avaliacao', 'id_advocacia');
        fetchDataWithWeightedAverage('portais', setPortais, 'portal_avaliacao', 'id_portal');
    }, []);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    {sections.map((section, index) => (
                        <div key={index}>
                            <CarouselCustom 
                                name={section.name} 
                                carouselItems={section.items}
                                isActive={true}
                            />
                            {index < sections.length - 1 && <hr className="carousel-divider" />}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomeCards;