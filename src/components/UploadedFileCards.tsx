import UploadedFileLink from "./UploadedFileLink";

/// This message is generic and not worth asking every caller to supply a
/// translation for - inlined here instead of a `messages` prop.
const noFileUploadedMessages: Record<string, string> = {
  en: "No file uploaded",
  fi: "Ei tiedostoa",
  sv: "Ingen fil uppladdad",
};

interface Props {
  urls?: string[];
  locale?: string;
}

export default function UploadedFileCards({ urls, locale = "en" }: Props) {
  if (!urls || urls.length === 0) {
    return (
      <div className="card mb-2">
        <div className="card-body p-2 ps-3 pe-3">
          <em className="text-muted">
            {noFileUploadedMessages[locale] ?? noFileUploadedMessages.en}
          </em>
        </div>
      </div>
    );
  }

  // value is a list of presigned S3 URLs
  return (
    <>
      {urls.map((url, idx) => (
        <div key={idx} className="card mb-2">
          <div className="card-body p-2 ps-3 pe-3">
            <UploadedFileLink url={url} />
          </div>
        </div>
      ))}
    </>
  );
}
