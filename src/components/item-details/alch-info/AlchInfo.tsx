import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { PriceDataMapping } from "../../../models/app.models";
import { useFullItemsById } from "../../../contexts/FullItemDetailsContext";

interface AlchInfoProps {
  itemDetails: PriceDataMapping;
}

export const AlchInfo = ({ itemDetails }: AlchInfoProps) => {
  const natureRuneInfo = useFullItemsById("561");

  const avgNatureRunePrice = (() => {
    if (!natureRuneInfo) return NaN;

    return Math.floor(
      (natureRuneInfo?.avgLowPrice + natureRuneInfo?.avgHighPrice) / 2
    );
  })();

  // Dummy data
  const avgMarketPrice = Math.floor(
    (itemDetails?.avgLowPrice + itemDetails?.avgHighPrice) / 2
  );
  const cost = avgMarketPrice + avgNatureRunePrice;
  const profit = itemDetails?.highalch - cost;

  const formatGp = (value: number) => `${value?.toLocaleString()} gp`;

  return (
    <Card.Body>
      <Card.Title>🧪 Alch Info - {itemDetails?.name}</Card.Title>

      <div className="mb-2">
        <strong>📈 High Alch:</strong> {formatGp(itemDetails?.highalch)}
      </div>

      <div className="mb-2">
        <strong>🛒 Item avg. price (1h):</strong> {formatGp(avgMarketPrice)}
      </div>

      <div className="mb-2">
        <strong>
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>
                Average price of nature runes based on the last hour (high + low
                / 2).
              </Tooltip>
            }
          >
            <span style={{ cursor: "help" }}>🔋 Nature Rune Cost:</span>
          </OverlayTrigger>
        </strong>{" "}
        {formatGp(avgNatureRunePrice)}
      </div>

      <hr />

      <div
        className={`fw-bold ${profit >= 0 ? "text-success" : "text-danger"}`}
      >
        💰 Verwachte winst per alch: {formatGp(profit)}
      </div>
    </Card.Body>
  );
};
