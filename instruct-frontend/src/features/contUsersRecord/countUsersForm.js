import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { InputLabel, FormControl, MenuItem, Select, TextField } from '@mui/material';

const CountUsersForm = () => {
    const { control, register } = useFormContext();
    const countUsersPlaces = useSelector(state => state.countUsersProps.places);
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

    // 選択された場所と部屋タイプに対応するオブジェクトのIDを取得
    const selectedObject = countUsersPlaces.find(
        (item) => 
            item.place === selectedPlace && item.room_type === selectedRoomType
    )
    const selectedId = selectedObject?.id;
    const selectedSeatsNum = selectedObject?.seats_num;

    const handlePlaceChange = (e) => {
        setSelectedPlace(e.target.value);
        // 選択したとき、部屋タイプをリセット
        setSelectedRoomType('');
    };

    const handleRoomTypeChange = (e) => {
        setSelectedRoomType(e.target.value);
    };


    return (
        <div>
            <FormControl fullWidth>
                <Controller
                    name="place"
                    control={control}
                    defaultValue="" 
                    render={({ field }) => (
                        <TextField
                            select
                            required
                            label="場所"
                            value={selectedPlace}
                            margin='normal'
                            onChange={(e) => {
                                field.onChange(e); // 値を更新
                                handlePlaceChange(e); // 選択時の処理を呼び出す
                            }}
                        >
                            <MenuItem value="">選択してください</MenuItem>
                            {places.map((place, index) => (
                                <MenuItem key={index} value={place}>
                                    {place}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                />
            </FormControl>

            <FormControl fullWidth>
                <Controller
                    name="room_type"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            select
                            required
                            label="教室タイプ"
                            margin='normal'
                            value={selectedRoomType}
                            onChange={(e) => {
                                field.onChange(e); // 値を更新
                                handleRoomTypeChange(e); // 選択時の処理を呼び出す
                            }}
                        >
                            <MenuItem value="">選択してください</MenuItem>
                            {roomTypesForSelectedPlace.map((type, index) => (
                                <MenuItem key={index} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                />
            </FormControl>
            

            {selectedId && (
                <input
                    type="hidden"
                    name="selectedId"
                    value={selectedId}
                    {...register('props')}
                />
            )}

            
            {selectedSeatsNum && 
            <p>{selectedSeatsNum}</p>
            }
        </div>
    );
}

export default CountUsersForm;