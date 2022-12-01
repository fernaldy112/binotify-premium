import { ReactNode } from "react";
import "./table.css";

interface TableProps {
  headers: string[];
  data: ReactNode[][];
}

interface TableRowProps {
  data: ReactNode[];
}

function TableRow({ data }: TableRowProps) {
  return (
    <tr>
      {data.map((cell, index) => (
        <td key={index}>{cell}</td>
      ))}
    </tr>
  );
}

export default function Table(props: TableProps) {
  const { headers, data } = props;

  return (
    <table className="request-table">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <TableRow key={index} data={row} />
        ))}
      </tbody>
    </table>
  );
}
