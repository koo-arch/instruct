import React, { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import NumberInput from './numberInput';

const CountUsersUpdateForm = (props) => {
    const {
        place,
        room_type,
        univ_users_num,
        own_users_num,
    } = props;
    const { control, register, setValue } = useFormContext();
    const countUsersPlaces = useSelector(state => state.countUsersProps.places);


    // 選択された場所と部屋タイプに対応するオブジェクトを取得
    const selectedObject = countUsersPlaces.find(
        (item) =>
            item.place === place && item.room_type === room_type
    )

    const selectedId = selectedObject?.id;
    const selectedSeatsNum = selectedObject?.seats_num ?? 0;
    const isCountOwnPC = selectedObject?.is_count_own_pc ?? false;

    useEffect(() => {
        setValue('props', selectedId);
    }, [selectedId, setValue])


    return (
        <div>


            <p>{selectedSeatsNum}</p>

            <Controller
                name="univ_users_num"
                control={control}
                defaultValue={univ_users_num}
                render={({ field: { value, onChange } }) => (
                    <NumberInput
                        value={value}
                        onChange={onChange}
                        label="大学PC利用者数"
                        max={selectedSeatsNum}
                    />
                )}
            />
            {isCountOwnPC &&
                <Controller
                    name="own_users_num"
                    control={control}
                    defaultValue={own_users_num}
                    render={({ field: { value, onChange } }) => (
                        <NumberInput
                            value={value}
                            onChange={onChange}
                            label="私物PC利用者数"
                            max={selectedSeatsNum}
                        />
                    )}
                />
            }
        </div>
    );
}

export default CountUsersUpdateForm;