import React from 'react'
import { useNavigate } from 'react-router-dom';
import { getWinLevels } from './utils';

export default function LevelList({ limit = 10 }) {
    if (!localStorage.getItem('level_data', {})) {
        localStorage.setItem('level_data', JSON.stringify({}));
    }

    const win_levels = getWinLevels();
    const numbers = []
    for (let i = 1; i <= limit; i++) {
        if (i === 1 || i - 2 in win_levels) {
            numbers.push(i);
        }
        else {
            break;
        }
    }

    return (
        <div className='level_list'>
            {
                numbers.map(
                    (e) => <Level key={e} level={e} />)
            }
        </div>
    )
}

function Level({ level }) {
    const navigate = useNavigate();

    const handleClick = () => {
        console.log('Click Level', level)
        const level_data = JSON.parse(localStorage.getItem('level_data'));
        if (!level_data.hasOwnProperty(level)) {
            level_data[level] = []
            localStorage.setItem('level_data', JSON.stringify(level_data));
        }
        navigate(`/level/${level}`);
    }

    return (
        <div onClick={handleClick} className='level'>
            {level}
        </div>
    )
}



export const Levels = {
    '1': ['H', 'J', 'K', 'J', 'K', 'H'],
    '2': ['H', 'J', 'K', 'J', 'K', 'H'],
    '3': ['H', 'J', 'K', 'J', 'K', 'H'],
    '4': ['H', 'J', 'K', 'J', 'K', 'H'],
    '5': ['H', 'J', 'K', 'J', 'K', 'H'],
    '6': ['H', 'J', 'K', 'J', 'K', 'H'],
    '7': ['H', 'J', 'K', 'J', 'K', 'H'],
    '8': ['H', 'J', 'K', 'J', 'K', 'H'],
    '9': ['H', 'J', 'K', 'J', 'K', 'H'],
    '10': ['H', 'J', 'K', 'J', 'K', 'H']
};