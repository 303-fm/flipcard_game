import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Levels } from './Level_list';
import { getWinLevels, setLevelData, setLevelMatchedParis, setWinned } from './utils';

const Card = () => {
    let { level } = useParams();
    const level_id = parseInt(level);
    setLevelData(level_id);

    const level_data = JSON.parse(localStorage.getItem('level_data'));

    const matchedCards = level_data[level_id] || [];

    let cardsList = Levels[String(level_id)];

    cardsList = cardsList.map(
        (_, i) => {
            if (i in matchedCards) {
                // Remove Content of matched Cards id
                return { id: i, content: null, flipped: false }
            }
            else {
                return { id: i, content: _, flipped: false }
            }
        }
    )
    let won = false;
    const winLevels = getWinLevels();

    if (matchedCards.length === cardsList.length || level_id in winLevels) {
        won = true;
    }

    const navigator = useNavigate();
    if (won) {
        setTimeout(() => {
            setWinned(level_id);
            navigator('/');
        }, 1000);
    }

    const [cards, setCards] = useState(cardsList);

    const handleCardClick = (id) => {
        const flippedCards = cards.filter((card) => card.flipped);
        if (flippedCards.length === 2) {
            return;
        }

        const updatedCards = cards.map((card) => {
            if (card.id === id) {
                return { ...card, flipped: true };
            }
            return card;
        });

        if (flippedCards.length === 1) {

            const flippedCard = flippedCards[0];

            if (flippedCard.content === updatedCards.find((card) => card.id === id).content) {
                const cardsMatched = updatedCards.filter((card) => card.content === flippedCard.content)
                setLevelMatchedParis(level_id, cardsMatched.map((card) => card.id))

                const removedCards = updatedCards.map((card) => {
                    if (card.content === flippedCard.content) {
                        return { ...card, flipped: false, content: null };
                    }
                    return card;
                });

                setCards(removedCards);
            } else {

                setTimeout(() => {
                    const resetCards = updatedCards.map((card) => {
                        if (card.flipped) {
                            return { ...card, flipped: false };
                        }
                        return card;
                    });
                    setCards(resetCards);
                }, 100);
            }
        }
        else {
            setCards(updatedCards);
        }
    };

    console.log('!!! Cards Rendered !!!');

    return (
        <div>
            <h2>Flip Card Game</h2>
            {
                won ?
                    <div>
                        <h1>
                            {`You win level ${level_id}.`}
                        </h1>
                    </div>
                    :
                    <div className='level-cards'>
                        {cards.map((card) => (
                            card.content ?
                                <div
                                    key={card.id}
                                    onClick={() => handleCardClick(card.id)}
                                    className='level-card'
                                    style={{
                                        backgroundColor: card.flipped ? 'green' : 'aqua',
                                    }}
                                >
                                    <span>{card.content}</span>
                                </div>
                                : <div className='level-card' style={{
                                    backgroundColor: 'inherit',
                                }}></div>

                        ))}
                    </div>

            }
        </div>
    );
};

export default Card;