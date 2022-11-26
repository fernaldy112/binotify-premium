import { ReactNode } from "react";

export type Displayable = string | number | ReactNode;

interface TableProps {
  headers: string[];
  data: Displayable[][];
}

interface TableRowProps {
  data: Displayable[];
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
