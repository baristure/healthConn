import { ExclamationIcon } from "@heroicons/react/outline";

export default function ErrorMessage({ error, field }) {
  if (!error || !error[field]) {
    return null;
  }
  return (
    <div className="inline-block text-error-text text-sm  mt-2">
      {Array.isArray(error[field]) && error[field].length === 1 && (
        <ExclamationIcon className="inline pr-2 h-6 w-6" />
      )}

      {Array.isArray(error[field]) && error[field].length > 1
        ? error[field].map((i, idx) => <div key={idx}>{i}</div>)
        : error[field]}
    </div>
  );
}
