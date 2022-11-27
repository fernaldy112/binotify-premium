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
  let dataMirror: ReactNode[][] | null = null;

  const headers = ["Creator ID", "Subscriber ID", ""];

  function update(creatorId: number, subscriberId: number, status: Status) {
    const index = dataMirror!.findIndex(
      (row) => row[0] == creatorId && row[1] == subscriberId
    );

    const buttons = dataMirror![index][2];

    setData((oldData) => {
      oldData![index][2] = (
        <svg
          aria-hidden="true"
          className="mx-auto w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      );

      return [...oldData!];
    });

    const xhr = new XMLHttpRequest();
    const API_URL = import.meta.env.VITE_API_URL;
    const endpoint = status == Status.ACCEPTED ? "accept" : "reject";
    xhr.open("POST", `${API_URL}/subscriptions/${endpoint}`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      setData((oldData) => {
        oldData![index][2] =
          status == Status.ACCEPTED ? "Accepted" : "Rejected";

        return [...oldData!];
      });
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
          const newData = subscriptions.map<ReactNode[]>((row) => [
            row.creatorId,
            row.subscriberId,
            <>
              <Button
                text="Accept"
                onClick={() => {
                  update(row.creatorId, row.subscriberId, Status.ACCEPTED);
                }}
                className="px-2 hover:text-primary transition-all ease-out duration-150"
              ></Button>
              <Button
                text="Reject"
                onClick={() => {
                  update(row.creatorId, row.subscriberId, Status.REJECTED);
                }}
                className="px-2 hover:text-red-500 transition-all ease-out duration-150"
              ></Button>
            </>,
          ]);
          dataMirror = newData;
          setData([...newData]);
        },
        (err) => {
          setError(err);
        }
      );
  }, []);

  useEffect(() => {
    dataMirror = data;
  }, [data]);

  if (error) {
    return <div>Error</div>;
  } else if (!data) {
    return <div>Loading...</div>;
  } else {
    return <Table headers={headers} data={data} />;
  }
}
