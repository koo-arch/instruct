import React, { useState, useEffect } from 'react';
import { useCustomContext } from '../../components/customContexts';
import axios from '../../api/axios';
import urls from '../../api/urls';
import Loading from '../../components/loading';
import PatrolRecord from './patrolRecord';


const initialState = {
    id: 0,
    name: "",
    published_date: "",
    published_time: "",
    AM_or_PM: "",
    school_period: 0,
    updated_at: ""
};

const formatData = (data) => {
    return data.map(item => {
        return {
            id: item.id || 0,
            name: item.place.name || "",
            published_date: item.published_date || "",
            published_time: item.published_time || "",
            AM_or_PM: item.AM_or_PM || "",
            school_period: item.school_period || 0,
            updated_at: item.updated_at || ""
        };
    })
};

const FetchPatrolRecords = () => {
    const [record, setRecord] = useState(initialState)
    const { postFlag } = useCustomContext();
    const [isLoading, setIsLoading] = useState(true);

    const fetchPatrolRecords = async () => {
        return await axios.get(urls.PatrolRecord)
    }



    useEffect(() => {
        fetchPatrolRecords()
            .then(res => {
                setRecord([...formatData(res.data)]);
            })
            .catch(err => {
                console.log(err);
            })
            .then(() => {
                setIsLoading(false);
            })
    }, [postFlag]);

    return (
        <div>
            {isLoading ?
                <Loading open={isLoading} />
                :
                <PatrolRecord record={record} />
            }
        </div>
    )
}

export default FetchPatrolRecords;