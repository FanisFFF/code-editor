import { useState } from "react";
import "./App.css";
import LanguageSelector from "./components/LanguageSelector";
import Output from "./components/Output";
import Editor from "./components/Editor";
import Button from "./components/Button";
interface Status {
  id: number;
  description: string;
}
export interface OutputDetails {
  stdout: string | null;
  time: string | null;
  memory: number | null;
  stderr: string | null;
  token: string;
  compile_output: string | null;
  message: string | null;
  status: Status;
}

function App() {
  const [language, setLanguage] = useState<string>("python");
  const [outputDetails, setOutputDetails] = useState<OutputDetails | undefined>(
    undefined
  );
  const allLanguages: { [key: string]: number } = { python: 70, go: 60 };
  const [input, setInput] = useState<string>("print('hello world')");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const checkStatus = async (token: string): Promise<void> => {
    const options = {
      method: "GET",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      },
    };
    try {
      const url = import.meta.env.VITE_RAPID_API_URL + "/" + token;
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      const statusId = result.status?.id;

      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setOutputDetails(result);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = async (): Promise<void> => {
    setIsLoading(true);
    const url =
      import.meta.env.VITE_RAPID_API_URL +
      "?base64_encoded=true&wait=false&fields=*";
    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
        "x-rapidapi-host": import.meta.env.VITE_RAPID_API_HOST,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language_id: allLanguages[language],
        source_code: btoa(input),
        stdin: btoa(input),
      }),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      const token = result.token;
      console.log(token);
      await checkStatus(token);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <LanguageSelector language={language} setLanguage={setLanguage} />
      <Editor language={language} input={input} setInput={setInput} />
      <Output result={outputDetails} isLoading={isLoading} />
      <Button handleClick={handleClick} isLoading={isLoading} />
    </>
  );
}

export default App;
