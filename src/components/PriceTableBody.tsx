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
              {["avgHighPrice", "avgLowPrice", "margin", "potential"].includes(
                key
              )
                ? (data[key as keyof PriceDataMapping] as number)
                    .toFixed(0)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                : data[key as keyof PriceDataMapping]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
