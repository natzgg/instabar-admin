"use client";

import { useStoreModal } from "@/hooks/use-store-modal";

import { useEffect } from "react";

const SetupPage = () => {
  const isOpen = useStoreModal((state) => state.isOpen);
  const onOpen = useStoreModal((state) => state.onOpen);

  useEffect(() => {
    onOpen();
  }, [isOpen, onOpen]);

  return <div className="p-4">RootPage</div>;
};

export default SetupPage;
