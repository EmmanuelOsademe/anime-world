"use client";

import { fetchAmine } from "@/app/action";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import AnimeCard from "./AnimeCard";

export type AnimeCard = JSX.Element;

let page = 2;

const LoadMore: React.FC = () => {
  const { ref, inView } = useInView();
  const [data, setData] = useState<Array<AnimeCard>>([]);

  useEffect(() => {
    const fetchMoreAnime = async () => {
      const newData: Array<AnimeCard> = await fetchAmine(page);
      setData([...data, ...newData]);
      page++;
      console.log(page);
    };

    if (inView) {
      fetchMoreAnime();
    }
  }, [data, inView]);

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data}
      </section>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
};

export default LoadMore;
