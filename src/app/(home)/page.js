
import fs from 'fs';
import path from 'path';

export const metadata = {
  title: "Apticore",
  description: "A great place to practise aptitide",
};

import Canvas from '@/components/canvas';

export default function Home() {

  const filePath = path.join(process.cwd(), 'src/data/data.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(fileContent);

  return (
    <div>
      <Canvas questions={data} />

    </div>
  );
}
