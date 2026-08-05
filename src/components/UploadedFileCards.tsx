import UploadedFileLink from "./UploadedFileLink";

interface Messages {
  noFileUploaded: string;
}

interface Props {
  urls?: string[];
  messages: Messages;
}

export default function UploadedFileCards({ urls, messages }: Props) {
  if (!urls || urls.length === 0) {
    return (
      <div className="card mb-2">
        <div className="card-body p-2 ps-3 pe-3">
          <em className="text-muted">{messages.noFileUploaded}</em>
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
