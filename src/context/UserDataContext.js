"use client";

import { createContext, useEffect, useState } from "react";
export const UserDataContext = createContext();

export default function UserDataContextProvider({ children }) {
  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  );
}
