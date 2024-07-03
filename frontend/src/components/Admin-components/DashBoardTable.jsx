import TableHOC from "./TableHOC";
import { Column } from "react-table";

const columns = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status", 
    accessor: "status",
  },
];

const DashBoardTable = ({ data = [] }) => {
  return TableHOC(
    columns,
    data,
    "transaction-box",
    "Top Transaction"
  )();
};

export default DashBoardTable;
