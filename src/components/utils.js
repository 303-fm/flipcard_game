export function generateRandomArray(size) {
    if (size % 2 !== 0) {
        throw new Error('Size must be an even number.');
    }

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const array = [];
    const availableLetters = [];

    for (let i = 0; i < letters.length; i++) {
        availableLetters.push(letters[i]);
    }

    for (let i = 0; i < size / 2; i++) {
        const randomIndex = Math.floor(Math.random() * availableLetters.length);
        const letter = availableLetters[randomIndex];

        array.push(letter);
        array.push(letter);

        availableLetters.splice(randomIndex, 1);

        if (availableLetters.length === 0) {
            // If all letters are used, reset the available letters
            for (let j = 0; j < letters.length; j++) {
                availableLetters.push(letters[j]);
            }
        }
    }

    return array;
}

export function setLevelData(level) {
    const lvl_id = level;
    let level_data = JSON.parse(localStorage.getItem('level_data', '{}'));
    if (!level_data) {
        level_data = {};
    }

    if (
        !level_data[lvl_id]
    ) {
        level_data[lvl_id] = [];
    }
    localStorage.setItem('level_data', JSON.stringify(level_data))

    let winData = JSON.parse(localStorage.getItem('win'));
    if (!winData) {
        winData = [];
    }
    localStorage.setItem('win', JSON.stringify(winData));
}

export function setLevelMatchedParis(level, ids) {
    let level_data = JSON.parse(localStorage.getItem('level_data'));
    level_data[level] = level_data[level].concat(ids);

    localStorage.setItem(
        'level_data',
        JSON.stringify(level_data)
    );
}

export function getWinLevels() {
    return JSON.parse(localStorage.getItem('win')) || [];
}

export function setWinned(level_id) {
    let win_lvls = JSON.parse(localStorage.getItem('win'));

    if (!win_lvls.includes(level_id)) {
        win_lvls.push(level_id);
    }
    localStorage.setItem(
        'win',
        JSON.stringify(win_lvls)
    )
}