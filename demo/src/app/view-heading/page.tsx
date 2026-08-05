import {
  ViewHeading,
  ViewHeadingActionsWrapper,
  ViewHeadingActions,
} from "@con2/components";
import { ReactNode } from "react";

function Demo({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-4">
      <h3 className="mb-2">{title}</h3>
      {children}
    </section>
  );
}

export default function ViewHeadingDemoPage() {
  return (
    <div>
      <h1>ViewHeading</h1>

      <Demo title="Plain heading">
        <ViewHeading>Order #1234</ViewHeading>
      </Demo>

      <Demo title="Heading with a Sub subtitle">
        <ViewHeading>
          Order #1234
          <ViewHeading.Sub>Placed on 2026-08-01</ViewHeading.Sub>
        </ViewHeading>
      </Demo>

      <Demo title="Heading with actions (ViewHeadingActionsWrapper + ViewHeadingActions)">
        <ViewHeadingActionsWrapper>
          <ViewHeading>
            Order #1234
            <ViewHeading.Sub>Placed on 2026-08-01</ViewHeading.Sub>
          </ViewHeading>
          <ViewHeadingActions>
            <button type="button" className="btn btn-outline-secondary me-2">
              Edit
            </button>
            <button type="button" className="btn btn-primary">
              Approve
            </button>
          </ViewHeadingActions>
        </ViewHeadingActionsWrapper>
      </Demo>
    </div>
  );
}
