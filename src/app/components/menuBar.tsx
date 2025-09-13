type MenuBarProps = {
    onSelectPage: (page: string) => void;
  };
  
  export default function MenuBar({ onSelectPage }: MenuBarProps) {
    return (
      <nav className="p-4 flex gap-4 bg-gray-100">
        <button onClick={() => onSelectPage("Inbox")}>Inbox</button>
        <button onClick={() => onSelectPage("Calendar")}>Calendar</button>
        <button onClick={() => onSelectPage("Financial")}>Financial</button>
        <button onClick={() => onSelectPage("Shopping")}>Shopping</button>
        <button onClick={() => onSelectPage("Developer")}>Developer</button>
      </nav>
    );
  }