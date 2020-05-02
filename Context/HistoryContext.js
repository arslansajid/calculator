import React from 'react';

const HistoryContext = React.createContext('');

export const HistoryProvider = HistoryContext.Provider;
export const HistoryConsumer = HistoryContext.Consumer;
export default HistoryContext;
