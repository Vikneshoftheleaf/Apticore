
export const metadata = {
  title: "Apticore",
  description: "A great place to practise aptitide",
};

import Canvas from '@/components/canvas';
import getData from '@/util/getData';

export default function Home() {

  const data = getData("age")

  return (
    <div>
      <Canvas questions={data} />

    </div>
  );
}
