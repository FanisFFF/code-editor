import { FC } from "react";

interface ILanguageSelector {
  language: string;
  setLanguage: (language: string) => void;
}

const LanguageSelector: FC<ILanguageSelector> = ({ language, setLanguage }) => {
  return (
    <div
      className="header"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1 style={{ color: "white", fontFamily: "'Lato', sans-serif" }}>
        Code editor
      </h1>
      <div>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            fontFamily: "'Lato', sans-serif",
            padding: "5px",
            background: "#3e3e42",
            border: "none",
            color: "white",
          }}
        >
          <option value="python">Python</option>
          <option value="go">Go</option>
        </select>
      </div>
    </div>
  );
};

export default LanguageSelector;
