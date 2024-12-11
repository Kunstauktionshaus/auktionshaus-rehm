import LotPage from "@components/lot/LotPage";
import { ObjectSchemaValues } from "@schemas/item";

const Lot = async ({ params }: { params: { lot: string } }) => {
  const lotId = Number(params.lot);

  const data = await fetch(`http://localhost:3000/api/lot?lotId=${lotId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const item: ObjectSchemaValues = await data.json();

  return <LotPage item={item} />;
};

export default Lot;