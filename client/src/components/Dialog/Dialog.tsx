import React from "react";
import { Dialog as HeadlessDialog, Transition } from "@headlessui/react";

import { Heading, Row, Button, ButtonProps } from "@/components";

import "./Dialog.scss"

export interface DialogProps {
  isOpen: boolean;
  title: string;
  data: any;
  close: () => void;
  actions?: ButtonProps[];
  children?: React.ReactNode
}

// See: https://headlessui.dev/react/dialog
export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  title,
  data,
  actions,
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

        <div className="dialog__content-container">
          <HeadlessDialog.Panel className="dialog__content">
            <Row align="space-between center" className="dialog__header p-15">
              <Heading tag="h2" className="m-0">{title}</Heading>

              <Button icon="multiply" simple onClick={close} />
            </Row>

            <main className="dialog__main p-25">
              {children}
            </main>

            {actions && (
              <Row align="end center" gap={10} className="dialog__footer p-10">
                {actions.map(({ key, ...buttonProps }, index) => (
                  <Button key={key || index} {...buttonProps} />
                ))}
              </Row>
            )}
          </HeadlessDialog.Panel>
        </div>
      </HeadlessDialog>
    </Transition>
  )
}