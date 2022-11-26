import { ReactNode, useEffect, useState } from "react";
import Button from "./Button";
import Table from "./Table";

interface RequestTableProps {
  params?: {
    [key: string]: string;
  };
}

interface SubscriptionResponse {
  firstPage: boolean;
  lastPage: boolean;
  subscriptions: any[];
}

enum Status {
  ACCEPTED,
  REJECTED,
}

export default function RequestTable({ params }: RequestTableProps) {
  const [data, setData] = useState<ReactNode[][] | null>(null);
  const [error, setError] = useState(null);
  const [isFirstPage, setIsFirstPage] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  const headers = ["Creator ID", "Subscriber ID", ""];

  function update(creatorId: number, subscriberId: number, status: Status) {
    const xhr = new XMLHttpRequest();
    const API_URL = import.meta.env.VITE_API_URL;
    const endpoint = status == Status.ACCEPTED ? "accept" : "reject";
    xhr.open("POST", `${API_URL}/subscriptions/${endpoint}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      // TODO: handle response
    };

    xhr.send(
      JSON.stringify({
        creatorId,
        subscriberId,
      })
    );
  }

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;
    fetch(`${API_URL}/subscriptions?page=${params?.page || 1}`)
      .then((res) => res.json())
      .then(
        (res: SubscriptionResponse) => {
          const { firstPage, lastPage, subscriptions } = res;
          setIsFirstPage(firstPage);
          setIsLastPage(lastPage);
          const data = subscriptions.map<ReactNode[]>((row) => [
            row.creatorId,
            row.subscriberId,
            <Button
              text="Accept"
              onClick={() => {
                update(row.creatorId, row.subscriberId, Status.ACCEPTED);
              }}
            ></Button>,
            <Button
              text="Reject"
              onClick={() => {
                update(row.creatorId, row.subscriberId, Status.REJECTED);
              }}
            ></Button>,
          ]);
          setData(data);
        },
        (err) => {
          setError(err);
        }
      );
  }, []);

  // TODO: Add pagination buttons

  if (error) {
    return <div>Error</div>;
  } else if (!data) {
    return <div>Loading...</div>;
  } else {
    return <Table headers={headers} data={data} />;
  }
}
