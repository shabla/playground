import { useState } from "react"

export interface DialogState<T> {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  data: T | undefined,
  setData: (value: T) => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const useDialogState = <T = any>(): DialogState<T> => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<T | undefined>();

  const toggle = (): void => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  };

  const open = (data?: T): void => {
    setData(data);
    setIsOpen(true);
  };

  const close = (): void => {
    setIsOpen(false)
    setData(undefined);
  };

  return {
    isOpen,
    data,
    setData,
    setIsOpen,
    open,
    close,
    toggle,
  }
}