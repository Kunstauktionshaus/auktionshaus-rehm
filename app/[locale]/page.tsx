import Image from "next/image";
const Home = () => {
  const nr = 312;
  const auc = 1001;

  const imageUrl = `https://vigorous-satoshi.87-106-178-189.plesk.page/images/${nr}_${auc}.png`;

  return (
    <div>
      <Image
        src={imageUrl}
        alt="image of item"
        width={500}
        height={500}
        className="cursor-pointer object-cover"
        quality={100}
      />
    </div>
  );
};

export default Home;
