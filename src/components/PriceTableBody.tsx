import { PriceDataMapping } from "../models/app.models";
import { tableHeaders } from "./constants/price-table.constants";
import styles from "./PriceTable.module.css";

interface PriceTableBodyProps {
  itemList: PriceDataMapping[];
  navigateHandler: (id: number) => void;
}

export const PriceTableBody = ({
  itemList,
  navigateHandler,
}: PriceTableBodyProps) => {
  // Helper function to format cell values
  const formatCellValue = (key: string, value: unknown) => {
    const numberKeys = ["avgHighPrice", "avgLowPrice", "margin", "potential"];

    if (numberKeys.includes(key) && typeof value === "number") {
      return value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return value;
  };

  return (
    <tbody>
      {itemList.map((data, index) => (
        <tr
          key={index}
          onClick={() => navigateHandler(data.id)}
          className={styles["price-table__row"]}
        >
          {Object.keys(tableHeaders).map((key) => (
            <td key={key}>
              {
                formatCellValue(
                  key,
                  data[key as keyof PriceDataMapping]
                ) as React.ReactNode
              }
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
