import ResourceLine from "./ResourceLine";
// import "../ResourcesView.sass";

interface ResourcesViewProps {
  resources: {
    lumber: number;
    grain: number;
    water: number;
    sheep: number;
    people: number;
  };
}

const ResourcesView = ({ resources }: ResourcesViewProps) => {
  return (
    <div className="resources">
      <h2>Resources</h2>
      {Object.entries(resources).map(([name, amount]) => (
        <ResourceLine key={name} name={name} amount={amount} />
      ))}
    </div>
  );
};

export default ResourcesView;

