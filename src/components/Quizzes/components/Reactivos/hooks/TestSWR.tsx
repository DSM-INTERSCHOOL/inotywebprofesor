import React from "react";
import useSWR, { useSWRConfig } from "swr";

const useMisDatos = () => {
  const { data } = useSWR("test/1");
  return {
    misDatos: data,
  };
};

const CompOne = () => {
  const { misDatos } = useMisDatos();
  return (
    <>
      <h3>Comp one :</h3>
      <pre>{JSON.stringify(misDatos, null, 2)}</pre>
    </>
  );
};
const CompTwo = () => {
  const { misDatos } = useMisDatos();
  return (
    <>
      <h3>Comp dos :</h3>
      <pre>{JSON.stringify(misDatos, null, 2)}</pre>
    </>
  );
};

export const TestSWR = () => {
  // const { mutate } = useSWRConfig();

  const { misDatos } = useMisDatos();
  const { mutate, error } = useSWR("test/1");

  console.log("data", misDatos);

  const fetcherFaail = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // resolve([{ hola: "Alvaritooo" }]);
        reject("fail so badly");
      }, 3000);
    });
  };
  const fetcher = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([{ hola: "Alvaritooo wokring googd" }]);
      }, 3000);
    });
  };

  return (
    <>
      <CompOne />
      <CompTwo />
      here
      <pre>{JSON.stringify(misDatos, null, 2)}</pre>
      <pre>{JSON.stringify(error, null, 2)}</pre>
      <button
        onClick={async () => {
          mutate(
            async () => {
              const newData = (await fetcherFaail()) as any;
              return newData;
            },
            { optimisticData: "optimisitc" as any, rollbackOnError: true }
          );
        }}
      >
        mutate
      </button>
      <button
        onClick={async () => {
          mutate(() => {
            return [{ hola: "dossss" }];
          });
        }}
      >
        mutate restet
      </button>
    </>
  );
};
