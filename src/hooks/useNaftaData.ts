import { useState, useEffect } from "react";
import type { NaftaData } from "@/types/data";

export function useNaftaData() {
  const [data, setData] = useState<NaftaData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data.json")
      .then((r) => r.json())
      .then((d: NaftaData) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { data, loading };
}
