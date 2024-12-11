"use client";

import { addDays, format } from "date-fns";

interface UpcomingAuctionProps {
  auction: any;
}
const UpcomingAuction: React.FC<UpcomingAuctionProps> = ({ auction }) => {
  const viewingDates = Array.from({ length: 7 }).map((_, i) =>
    format(addDays(new Date(auction.startViewing), i), "EEEE dd. MMMM"),
  );

  const auctionSchedule = [
    {
      date: auction.startDate,
      time: "16:00",
      category: "Jewelry & Silver",
    },
    { date: auction.startDate, time: "17:30", category: "Carpets" },
    { date: auction.startDate, time: "17:50", category: "Furniture" },
    {
      date: auction.startDate,
      time: "18:20",
      category: "Clocks & Watches",
    },
    { date: auction.startDate, time: "18:40", category: "Graphics" },
    { date: auction.endDate, time: "14:30", category: "Varia" },
    {
      date: auction.endDate,
      time: "16:45",
      category: "Glass, China, Porcelain & Ceramics",
    },
    { date: auction.endDate, time: "19:00", category: "Paintings" },
  ];
  return (
    <div>
      <p>Auction Number: {auction.auctionNumber}</p>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Inspection Dates</h3>

        {viewingDates.map((date, index) => (
          <p key={index}>{date}, 10:00 - 18:00</p>
        ))}
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Auction Dates</h3>
        <p>
          {format(new Date(auction.startDate), "EEEE, dd MMMM")} - from 16:00
        </p>
        <p>{format(new Date(auction.endDate), "EEEE, dd MMMM")} - from 14:30</p>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Auction Order</h3>
        {auctionSchedule.map((section, index) => (
          <p key={index}>
            {format(new Date(section.date), "EEEE, dd MMMM")} - {section.time}
            <span className="ml-2 font-medium">{section.category}</span>
          </p>
        ))}
      </div>
    </div>
  );
};

export default UpcomingAuction;
