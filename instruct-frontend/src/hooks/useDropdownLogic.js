import { useState } from 'react';

const useDropdownLogic = (countUsersPlaces) => {
    const [selectedPlace, setSelectedPlace] = useState('');
    const [selectedRoomType, setSelectedRoomType] = useState('');

    const places = [...new Set(countUsersPlaces.map(item => item.place))];

    // selectedPlaceに基づいて選択肢をフィルタリング
    const roomTypesForSelectedPlace = Array.from(
        new Set(
            countUsersPlaces
                .filter((item) => item.place === selectedPlace)
                .map((item) => item.room_type)
        )
    );

    const handlePlaceChange = (e) => {
        setSelectedPlace(e.target.value);
        // 選択したとき、部屋タイプをリセット
        setSelectedRoomType('');
    };

    const handleRoomTypeChange = (e) => {
        setSelectedRoomType(e.target.value);
    };

    return {
        selectedPlace,
        selectedRoomType,
        places,
        roomTypesForSelectedPlace,
        handlePlaceChange,
        handleRoomTypeChange,
    };
}

export default useDropdownLogic;