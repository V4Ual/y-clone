import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { useEffect, useRef } from "react";

export let socket;
export const urlDataGet = () => {
  const location = useLocation();
  return new URLSearchParams(location.search);
};


export const useWebSocket = (onMessage) => {
  const userDetails = useSelector((state) => state.user);
  const socketRef = useRef(null);

  useEffect(() => {
    if (userDetails?.id && !socketRef.current) {
      const ws = new WebSocket(`ws://192.168.33.86:3002?id=${userDetails.id}`);
      socketRef.current = ws;

      ws.onopen = () => {
        console.log(" WebSocket connected");
      };

      ws.onmessage = (event) => {
        if (onMessage) onMessage(event.data);
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected");
      };
    }

    return () => {
      socketRef.current?.close();
      socketRef.current = null;
    };
  }, [userDetails, onMessage]);

  console.log(socketRef);

  return socketRef.current;
};
