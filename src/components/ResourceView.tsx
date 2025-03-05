import ResourceLine from "./ResourceLine";

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
      <h2 className="resources-header">Resources Remaining:</h2>
      {Object.entries(resources).map(([name, amount]) => (
        <ResourceLine key={name} name={name} amount={amount} />
      ))}
    </div>
  );
};

export default ResourcesView;

