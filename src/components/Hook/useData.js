import React, { useEffect, useState } from "react";
import apiClient from "../../utils/api-client";

const useData = (url, customConfig, deps) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); //로딩중인지
  useEffect(
    () => {
      setIsLoading(true); //로딩 시작
      apiClient
        .get(url, customConfig)
        .then((res) => {
          setData(res.data);
          setIsLoading(false); //로딩 끝
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false); //로딩 끝
        });
    },
    deps ? deps : []
  );
  return { data, error, isLoading };
};

export default useData;
