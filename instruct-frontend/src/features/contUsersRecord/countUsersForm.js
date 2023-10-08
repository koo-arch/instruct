import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import NumberInput from '../../components/numberInput';
import DropdownSelect from '../../components/dropdownSelect';
import useDropdownLogic from '../../hooks/useDropdownLogic';
import { FormControl, MenuItem, TextField } from '@mui/material';

const CountUsersForm = () => {
    const { control, register } = useFormContext();
    const countUsersPlaces = useSelector(state => state.countUsersProps.places);

    const {
        selectedPlace,
        selectedRoomType,
        places,
        roomTypesForSelectedPlace,
        handlePlaceChange,
        handleRoomTypeChange,
    } = useDropdownLogic(countUsersPlaces);


    // 選択された場所と部屋タイプに対応するオブジェクトのIDを取得
    const selectedObject = countUsersPlaces.find(
        (item) => 
            item.place === selectedPlace && item.room_type === selectedRoomType
    )
    const selectedId = selectedObject?.id;
    const selectedSeatsNum = selectedObject?.seats_num ?? 0;


    return (
        <div>
            <FormControl fullWidth>
                <Controller
                    name="place"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <DropdownSelect
                            label="場所"
                            value={selectedPlace}
                            onChange={(e) => {
                                field.onChange(e);
                                handlePlaceChange(e);
                            }}
                            options={places}
                        />
                    )}
                />
            </FormControl>

            <FormControl fullWidth>
                <Controller
                    name="room_type"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <DropdownSelect
                            label="教室タイプ"
                            value={selectedRoomType}
                            onChange={(e) => {
                                field.onChange(e);
                                handleRoomTypeChange(e);
                            }}
                            options={roomTypesForSelectedPlace}
                        />
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

    
            <p>{selectedSeatsNum}</p>

            <Controller
                name="univ_users_num"
                control={control}
                defaultValue={0}
                render={({ field: { value, onChange } }) => (
                    <NumberInput
                        value={value}
                        onChange={onChange}
                        label="大学PC利用者数"
                        max={selectedSeatsNum}
                    />
                )}
            />
            <Controller
                name="own_users_num"
                control={control}
                defaultValue={0}
                render={({ field: { value, onChange } }) => (
                    <NumberInput
                        value={value}
                        onChange={onChange}
                        label="私物PC利用者数"
                        max={selectedSeatsNum}
                    />
                )}
            />
        </div>
    );
}

export default CountUsersForm;