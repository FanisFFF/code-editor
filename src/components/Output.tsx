import { OutputDetails } from "../App";

interface OutputProps {
  result: OutputDetails | undefined;
  isLoading: boolean;
}

const Output: React.FC<OutputProps> = ({ result, isLoading }) => {
  return (
    <div
      style={{
        marginTop: "1rem",
        padding: "10px",
        backgroundColor: "#3e3e42",
        height: "90px",
        overflowY: "scroll",
        color: "white",
      }}
    >
      {isLoading ? (
        <p>Loading...</p>
      ) : result ? (
        result.status.id === 3 ? (
          <pre>{result.stdout}</pre>
        ) : (
          <pre style={{ color: "red" }}>
            {result.status.description} {result.compile_output}
          </pre>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default Output;
