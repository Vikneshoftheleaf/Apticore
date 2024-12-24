import fs from 'fs';
import path from 'path';

export default function getData(topic)
{
    const filePath = path.join(process.cwd(), `src/data/${topic}.json`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    return data
}