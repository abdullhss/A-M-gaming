import GridContainer from '@/app/components/defaults/GridContainer';
import Filters from '@/app/components/Filters';
import { APIURL, KEY } from '@/app/constants'
import React from 'react'

const page = async () => {
    
    const data = await fetch(`${APIURL}genres?key=${KEY}`).then((res) => {
        return res.json();
    });
    console.log(data.results);
    
    const genres = data.results.slice(0 , 15) ;
    console.log(genres);
    
    return (
        <div>
            <h1 className='text-3xl font-bold '>Games</h1>
            <Filters genres={genres}/>
        </div>
    );
};

export default page;
