import Highlights from "@components/MainPageHighlights";
import MainPageSlider from "@components/MainPageSlider";

const Home = () => {
  return (
    <div className="w-full h-full flex flex-col gap-6 items-center justify-center">
      <div className="w-full ">
        <MainPageSlider />
      </div>
      <Highlights />
    </div>
  );
};

export default Home;
