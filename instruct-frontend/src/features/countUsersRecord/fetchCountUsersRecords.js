import React, { useState, useEffect } from 'react';
import { useCustomContext } from '../../components/customContexts';
import axios from '../../api/axios';
import urls from '../../api/urls';
import Loading from '../../components/loading';
import CountUsersRecords from './countUsersRecords';


const initialState = [{
    id: 0,
    place: "",
    room_type: "",
    location: "",
    published_date: "",
    published_time: "",
    school_period: 0,
    own_users_num: 0,
    own_users_num: 0,
    updated_at: ""
}]

const formatData = (data) => {
    return data.map(item => {
        const place = item.props.place || ""
        const room_type = item.props.room_type || ""
        const location = `${place} - ${room_type}`;
        return {
            id: item.id || 0,
            place: place,
            room_type: room_type,
            location: location,
            published_date: item.published_date || "",
            published_time: item.published_time || "",
            school_period: item.school_period || 0,
            univ_users_num: item.univ_users_num || 0,
            own_users_num: item.own_users_num || 0,
            updated_at: item.updated_at || ""
        };
    });
};

const FetchCountUsersRecords = () => {
    const [record, setRecord] = useState(initialState)
    const { postFlag } = useCustomContext();
    const [isLoading, setIsLoading] = useState(true);

    const fetchCountUsersRecords = async () => {
        return await axios.get(urls.CountUsersRecord)
    }

    

    useEffect(() => {
        fetchCountUsersRecords()
            .then(res => {
                setRecord([...formatData(res.data)]);
            })
            .catch(err => {
                console.log(err.response);
            })
            .then(() => {
                setIsLoading(false);
            })
    },[postFlag]);

    return (
        <div>
            {isLoading ?
                <Loading open={isLoading} />
            :
                <CountUsersRecords record={record}/>
            }
        </div>
    )
}

export default FetchCountUsersRecords;