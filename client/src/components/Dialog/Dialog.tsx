import React from "react";
import { Dialog as HeadlessDialog, Transition } from "@headlessui/react";

import { Heading, Row, Button } from "@/components";

import "./Dialog.scss"

export interface DialogProps {
  isOpen: boolean;
  title: string;
  close: () => void;
  children?: React.ReactNode
}

// See: https://headlessui.dev/react/dialog
export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  title,
  close,
  children,
}) => {
  return (
    <Transition
      show={isOpen}
      enter="dialog-enter"
      enterFrom="dialog-enter-from"
      enterTo="dialog-enter-to"
      leave="leave"
      leaveFrom="leave-from"
      leaveTo="leave-to"
    >
      <HeadlessDialog onClose={close} className="dialog">
        <div className="dialog__backdrop" aria-hidden="true" />

        <HeadlessDialog.Panel className="dialog__content">
          HELLO WORLD
          <Button>asd</Button>
        </HeadlessDialog.Panel>
      </HeadlessDialog>
      {/* <HeadlessDialog onClose={close} className="dialog">
        <div className="dialog__backdrop" aria-hidden="true" />

        <div className="dialog__content-container">
          <HeadlessDialog.Panel className="dialog__content">
            <Row align="space-between center" className="dialog__header p-10">
              <Heading tag="h2" className="m-0">{title}</Heading>

              <Button icon="multiply" simple onClick={close} />
            </Row>

            <main className="dialog__main px-10">
              {children}
            </main>

            <Row align="end center" gap={10} className="dialog__footer p-10">
              <Button>Action 1</Button>
              <Button>Action 2</Button>
            </Row>
          </HeadlessDialog.Panel>
        </div>
      </HeadlessDialog> */}
    </Transition>
  )
}