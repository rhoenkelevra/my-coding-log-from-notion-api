const dotenv = require('dotenv').config();
// FIX: can't change to import -> returns undefined here
import { Client } from '@notionhq/client';
import { RequestParameters } from '@notionhq/client/build/src/Client';

// Init Client

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

const database_id = process.env.NOTION_DATABASE_ID;

interface Request {
    path: string;
    method: any;
}

export const getTable = async () => {
    const payload: Request = {
        path: `databases/${database_id}/query`,
        method: `POST`,
    };
    const { results } = await notion.request(payload);

    const tableItems = results.map((page) => {
        // console.log(page); // will show the object than we extract the values below
        // console.log('select: ', page.properties.Techs.multi_select[0].name);
        return {
            id: page.id,
            title: page.properties.Name.title[0].text.content,
            date: page.properties.Date.date.start,
            description: page.properties.Description.rich_text[0].text.content,
            // FIX: not getting more than one of multi_select options
            techs: page.properties.Techs.multi_select[0].name,
            sources: page.properties.Sources.multi_select[0].name,
        };
    });
    return tableItems;
};

/**
 * List Databases without insomnia *
    const listDatabases = async () => {
    const res = await notion.databases.list();
    console.log(res);
};
 listDatabases();

**/
