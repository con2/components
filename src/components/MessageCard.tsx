"use client";

import { ReactNode } from "react";
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Container,
} from "react-bootstrap";

interface Action {
  label: string;
  onAction?: () => void;
  href?: string;
}

interface Props {
  title: string;
  message: ReactNode;
  /// Optional call-to-action button. The caller supplies what happens on click
  /// (eg. `signIn("kompassi")`) via `onAction`, and/or a link via `href` -
  /// this component has no knowledge of auth providers or routing.
  action?: Action;
  /// Wrap the card in a Bootstrap `Container`. Useful for a full-page gate.
  container?: boolean;
  className?: string;
}

/// A generic "message card" for gating content behind a condition, eg.
/// "you don't have sufficient privileges" or "please sign in to continue".
export default function MessageCard({
  title,
  message,
  action,
  container = false,
  className = "mb-4",
}: Props) {
  const card = (
    <Card className={className}>
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <CardText className={action ? "mb-4" : undefined}>{message}</CardText>
        {action && (
          <Button
            variant="primary"
            onClick={action.onAction}
            href={action.href}
          >
            {action.label}
          </Button>
        )}
      </CardBody>
    </Card>
  );

  return container ? <Container>{card}</Container> : card;
}
