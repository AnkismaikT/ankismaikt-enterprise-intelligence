"use client";

type Props = {
  label: string;
};

export default function ComingSoonButton({ label }: Props) {
  const handleClick = () => {
    alert("This feature will be enabled during onboarding.");
  };

  return (
    <button
      onClick={handleClick}
      className="rounded bg-black px-4 py-2 text-white text-sm hover:bg-gray-800"
    >
      {label}
    </button>
  );
}

