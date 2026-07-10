import { createContext, useContext, useState, ReactNode } from "react";

type CursorCtx = {
  label: string;
  setLabel: (l: string) => void;
};

const CursorContext = createContext<CursorCtx>({
  label: "",
  setLabel: () => {},
});

export function CursorProvider({ children }: { children: ReactNode }) {
  const [label, setLabel] = useState("");
  return (
    <CursorContext.Provider value={{ label, setLabel }}>
      {children}
    </CursorContext.Provider>
  );
}

export const useCursor = () => useContext(CursorContext);
