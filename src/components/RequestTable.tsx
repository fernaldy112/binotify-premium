import { ReactNode, useEffect, useState } from "react";
import Table from "./Table";

interface RequestTableProps {
  params?: {
    [key: string]: string;
  };
}

export default function RequestTable({ params }: RequestTableProps) {
  const [data, setData] = useState<ReactNode[][] | null>(null);
  const [error, setError] = useState(null);

  const headers = ["Creator ID", "Subscriber ID", ""];

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;
    fetch(`${API_URL}/subscriptions`)
      .then((res) => res.json())
      .then(
        (res: any[]) => {
          const data = res.map<ReactNode[]>((row) => [
            row.creatorId,
            row.subscriberId,
            // TODO: add accept/reject buttons
          ]);
          setData(data);
        },
        (err) => {
          setError(err);
        }
      );
  }, []);

  if (error) {
    return <div>Error</div>;
  } else if (!data) {
    return <div>Loading...</div>;
  } else {
    return <Table headers={headers} data={data} />;
  }
}
