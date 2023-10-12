import React, { useState, useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import DropdownSelect from '../../components/dropdownSelect';
import { FormControl } from '@mui/material';

const CountUsersCreateForm = () => {
    const [selectedPlace, setSelectedPlace] = useState('');
    const { control, register, setValue, formState: { errors } } = useFormContext();
    const patrolPlaces = useSelector(state => state.patrolPlaces.places);


    const places = [...new Set(patrolPlaces.map(item => item.name))];


    // 選択された場所に対応するオブジェクトを取得
    const selectedObject = patrolPlaces.find(
        (item) =>
            item.name === selectedPlace
    );

    const handleChange = (e) => {
        setSelectedPlace(e.target.value);
    }

    const selectedId = selectedObject?.id;

    useEffect(() => {
        setValue('place', selectedId);
    }, [selectedId, setValue])


    return (
        <div>
            <FormControl fullWidth>
                <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <DropdownSelect
                            label="場所"
                            value={selectedPlace}
                            onChange={(e) => {
                                field.onChange(e);
                                handleChange(e);
                            }}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            options={places}
                        />
                    )}
                />
            </FormControl>


            {selectedId && (
                <input
                    type='hidden'
                    name='place'
                    value={selectedId}
                    {...register('place')}
                />
            )}
            
        </div>
    );
}

export default CountUsersCreateForm;