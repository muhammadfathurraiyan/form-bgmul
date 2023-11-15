
import Select from "react-select";


const options = [
  { label: "apple", value: 1 },
  { label: "orange", value: 2 },
  { label: "kiwi", value: 3 }
];

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <Select isMulti options={options} />
    </div>
  );
}
