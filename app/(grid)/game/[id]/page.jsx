import { getGame } from "@/app/api/api";
import GamesSlider from "@/app/components/GamesSlider";
import SwiperCards from "@/app/components/SwiperCards";
import Image from "next/image";
import React from "react";

const page = async ({ params }) => {
  const { id } = params;
  const game = await getGame(id);
  console.log(game);
  const { screenshots, data, similar }= game;
  console.log(data.ratings);
  return (
    <div className=" mt-10">
      <div>
        <div className=" col-span-4 flex flex-col gap-2">
          <h1 className=" text-2xl text-white">{data.name}</h1>
          <div>Rating count : {data.ratings_count}</div>
          <SwiperCards
            slidesPerView={1}
            className=" h-full"
            items={[...screenshots.results, data.background_image, data.background_image_additional].map(
              (screenshot) => {
                return {
                  card: (
                    <div className=" rounded-xl overflow-hidden h-[36rem] w-full relative">
                      <Image src={screenshot.image || screenshot} alt={data.name} fill className=" object-cover" />
                    </div>
                  ),
                  src: screenshot.image || screenshot,
                };
              }
            )}
            paginationImages
          />
          <p className=" mt-10 col-span-2">{data.description_raw}</p>
        </div>
      </div>{" "}
      <GamesSlider title="Similar Games" games={similar.results} />
      
    </div>
  );
};

export default page;
