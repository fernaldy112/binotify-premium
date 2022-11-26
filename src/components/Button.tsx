interface ButtonProps {
  text: string;
  onClick?: () => void;
}

export default function Button({ text, onClick }: ButtonProps) {
  function handleClick() {
    if (onClick) onClick();
  }

  return <button onClick={handleClick}>{text}</button>;
}
