import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [summary, setSummary] = useState({
    totalDonations: 0,
    totalExpenses: 0,
    transactionCount: 0,
    recent: [],
  });
  const [history, setHistory] = useState([]); // For chart

  useEffect(() => {
    // const newSocket = io('http://localhost:5000');
    const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    newSocket.on('summary-update', (data) => {
      setSummary(data);
      
      // Update history for chart
      if (data.recent && data.recent.length > 0) {
        // Format for chart: reverse to show oldest to newest
        const chartData = [...data.recent]
          .reverse()
          .map(item => ({
            date: new Date(item.date).toLocaleDateString('en-BD', { 
              day: '2-digit', 
              month: 'short' 
            }),
            donations: item.incomingDonation || 0,
            expenses: item.dailyTotalExpense || 0,
          }));
        setHistory(chartData);
      }
    });

    return () => newSocket.close();
  }, []);

  return (
    <SocketContext.Provider value={{ socket, summary, history }}>
      {children}
    </SocketContext.Provider>
  );
};