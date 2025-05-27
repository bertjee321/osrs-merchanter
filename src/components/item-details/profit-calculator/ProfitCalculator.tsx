import { useState } from "react";
import {
  Card,
  Col,
  Form,
  Row,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";

interface ProfitCalculatorProps {
  prices: {
    snapshot: {
      buy: number;
      sell: number;
    };
    average: {
      buy: number;
      sell: number;
    };
  };
}

export const ProfitCalculator = ({ prices }: ProfitCalculatorProps) => {
  const [quantity, setQuantity] = useState(1);
  const [mode, setMode] = useState<"snapshot" | "average">("average");

  const buy = prices[mode].buy;
  const sell = prices[mode].sell;
  const taxes =
    Math.floor(sell * 0.01) > 5_000_000 ? 5_000_000 : Math.floor(sell * 0.01); // GE tax is 1% of the sell price
  const profitPerItem = sell - taxes - buy;
  const totalProfit = profitPerItem * quantity;

  const formatGp = (value: number) => `${value.toLocaleString()} gp`;

  return (
    // <Card className="mb-4 shadow-sm">
    <Card.Body>
      <Card.Title>📈 Profit Calculator</Card.Title>

      <Row className="mb-3 align-items-end">
        <Col xs={6} md={4}>
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
          />
        </Col>

        <Col xs={6} md={4}>
          <Form.Label>Price Mode</Form.Label>
          <ToggleButtonGroup
            type="radio"
            name="priceMode"
            value={mode}
            onChange={(val) => setMode(val)}
          >
            <ToggleButton
              id="tbg-radio-1"
              value="average"
              size="sm"
              variant="outline-primary"
            >
              1h Avg
            </ToggleButton>
            <ToggleButton
              id="tbg-radio-2"
              value="snapshot"
              size="sm"
              variant="outline-secondary"
            >
              Latest
            </ToggleButton>
          </ToggleButtonGroup>
        </Col>
      </Row>

      <hr />

      <Row>
        <Col md={6}>
          <div>
            🛒 Buy: <strong>{formatGp(buy)}</strong>
          </div>
          <div>
            💰 Sell: <strong>{formatGp(sell)}</strong>
          </div>
        </Col>
        <Col md={6}>
          <div>
            📦 {`${profitPerItem > 0 ? "Profit" : "Loss"}`} per item:{" "}
            <strong className={`text-${profitPerItem > 0 ? "success" : "danger"}`}>{formatGp(profitPerItem)}</strong>
          </div>
          <div>
            💵 Total {`${totalProfit > 0 ? "Profit" : "Loss"}`}:{" "}
            <strong className={`text-${totalProfit > 0 ? "success" : "danger"}`}>{formatGp(totalProfit)}</strong>
          </div>
        </Col>
      </Row>
    </Card.Body>
    // </Card>
  );
};
