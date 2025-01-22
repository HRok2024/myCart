import React, { useEffect, useState } from "react";
import apiClient from "../../utils/api-client";

const useData = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); //로딩중인지
  useEffect(() => {
    setIsLoading(true); //로딩 시작
    apiClient
      .get(url)
      .then((res) => {
        setData(res.data);
        setIsLoading(false); //로딩 끝
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false); //로딩 끝
      });
  }, []);
  return { data, error, isLoading };
};

export default useData;
