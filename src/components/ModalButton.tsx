"use client";

import { ReactNode, MouseEvent, useCallback, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { createPortal } from "react-dom";

interface Messages {
  cancel: string;
  submit: string;
}

interface Props {
  title: string;
  label?: ReactNode;
  labelTitle?: string;
  children?: ReactNode;
  action?(formData: FormData): void;
  /// Not generic like most cancel/submit pairs in this library - kompassi's
  /// real usage extensively overrides these per action ("Generate", "Revoke",
  /// "Create quota", "Cancel order and request refund", ...), so this stays a
  /// `messages` prop rather than an inlined locale table.
  messages: Messages;
  disabled?: boolean;
  /// Shown as a tooltip over the button while it is disabled, so the user learns
  /// what to do before they can proceed. Ignored while the button is enabled.
  disabledReason?: ReactNode;
  className?: string;
  submitButtonVariant?: "primary" | "danger" | "success";
  /// When set (and no `action` is given), the modal gets a primary button with this
  /// label that just closes the modal, instead of the plain "cancel"-only close
  /// button. Use for modals whose content is a client-side widget that is already
  /// live-synced to state elsewhere (eg. an outer form via a `form` attribute) and so
  /// has no separate submit step of its own - the button just confirms "I'm done
  /// selecting", it does not discard anything on close either way.
  confirmLabel?: string;
}

/// Renders a button that opens a modal. Pass modal contents as children
export default function ModalButton({
  title,
  label,
  labelTitle,
  children,
  action,
  messages,
  disabled,
  disabledReason,
  className = "btn btn-link p-0 link-subtle",
  submitButtonVariant = "primary",
  confirmLabel,
}: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const close = useCallback(() => {
    setIsVisible(false);
  }, []);
  const open = useCallback((_event: MouseEvent<HTMLButtonElement>) => {
    setIsVisible(true);
  }, []);

  const showDisabledReason = Boolean(disabled && disabledReason);

  // A disabled button fires no mouse events, so the tooltip is triggered by a
  // wrapper span and the button itself must not swallow the pointer.
  const button = (
    <button
      type="button"
      className={showDisabledReason ? `${className} pe-none` : className}
      onClick={open}
      title={showDisabledReason ? undefined : (labelTitle ?? title)}
      disabled={disabled}
    >
      {label ?? `${title}…`}
    </button>
  );

  /// TODO Change manual button to React Bootstrap one.
  return (
    <>
      {showDisabledReason ? (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip>{disabledReason}</Tooltip>}
        >
          <span className="d-inline-block">{button}</span>
        </OverlayTrigger>
      ) : (
        button
      )}
      {!disabled &&
        typeof document !== "undefined" &&
        createPortal(
          <Modal show={isVisible} onHide={close} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            {action ? (
              <form action={action} onSubmit={close}>
                <Modal.Body>{children}</Modal.Body>

                <Modal.Footer>
                  <Button variant="outline-secondary" onClick={close}>
                    {messages.cancel}
                  </Button>
                  <Button variant={submitButtonVariant} type="submit">
                    {messages.submit}
                  </Button>
                </Modal.Footer>
              </form>
            ) : (
              <>
                <Modal.Body>{children}</Modal.Body>
                <Modal.Footer>
                  <Button
                    variant={confirmLabel ? "primary" : "outline-primary"}
                    onClick={close}
                  >
                    {confirmLabel ?? messages.cancel}
                  </Button>
                </Modal.Footer>
              </>
            )}
          </Modal>,
          document.body,
        )}
    </>
  );
}
