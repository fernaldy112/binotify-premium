interface ButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
}

export default function Button({ text, onClick, className }: ButtonProps) {
  function handleClick() {
    if (onClick) onClick();
  }

  return (
    <button className={className} onClick={handleClick}>
      {text}
    </button>
  );
}
