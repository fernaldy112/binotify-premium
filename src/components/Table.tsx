import { ReactNode } from "react";

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
      {data.map((cell) => (
        <td>{cell}</td>
      ))}
    </tr>
  );
}

export default function Table(props: TableProps) {
  const { headers, data } = props;

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <TableRow data={row} />
        ))}
      </tbody>
    </table>
  );
}
